precision mediump float;

#define PI 3.14159265
#define E  2.71828182

// Uniforms
uniform vec2  u_size;   // BUILTIN
uniform float u_time;   // BUILTIN
uniform float brightness;
uniform ivec3 scene_shape;
uniform float gauss_data[n_gaussians * n_gauss_comps];

// Constanst (perf reasons)
const float GAUSS_FACTOR = sqrt(2. * PI);

// Configuration constanst
const vec3 RED = vec3(1., 0., 0.);
const vec3 GREEN = vec3(0., 1., 0.);
const vec3 BLUE = vec3(0., 0., 1.);
const vec3 pos_offset = vec3(0., 0., z_dist);
const float dim_offset = 1. / 3.;
vec3 f_scene_shape = vec3(scene_shape.x, scene_shape.y, scene_shape.z); // todo make scene_shape const

float max3( float x, float y, float z )
{
    return x > y
            ? x > z ? x : z
            : y > z ? y : z;
}

float gauss( float x, float m, float sigma )
{
    return pow(E, -pow(x - m, 2.) / 2. * sigma * sigma) / (sigma * GAUSS_FACTOR);
}

float gauss2d( vec2 pos, vec2 uv, float sigma )
{
    float d = distance((pos / 2. + .5) * u_size, uv);
    return gauss(d, 0., sigma) * sigma;
}

void addGauss( inout vec4 fragColor, vec3 pos, vec2 uv, vec3 color, float opacity, float sigma )
{
    float b = gauss2d(pos.xy / pos.z, uv, sigma * pos.z) / pos.z * opacity;
    vec4 c = vec4(color * b, 1.);
    fragColor += c;
}

vec3 unflatten3D( int i )
{
    // Number of items in one of the z-planes
    // (the planes that are perpendicular to the z-axis)
    int n_z_plane_items = scene_shape.x * scene_shape.y;

    int z = i / n_z_plane_items;
    i -= n_z_plane_items * z;
    int y = i / scene_shape.x;
    int x = i - y * scene_shape.x;

    float max_dim = max3(f_scene_shape.x, f_scene_shape.y, f_scene_shape.z);

    // todo: figure out why 2.666 is the perfect number here...
    //   (just firgured it out with brute force
    vec3 pos = (vec3(x, y, z) - f_scene_shape / 2.666) / max_dim;

    return pos;
}

vec3 rotateVector(vec3 vector, vec2 angle) {
    // First, apply the yaw rotation around the Y-axis.
    float s_yaw = sin(angle.y);
    float c_yaw = cos(angle.y);

    mat3 yawRotationMatrix = mat3(
        c_yaw, 0.0, s_yaw,
        0.0, 1.0, 0.0,
        -s_yaw, 0.0, c_yaw
    );

    vector = yawRotationMatrix * vector;
    vector = yawRotationMatrix * vector;

    // Then, apply the pitch rotation around the X-axis.
    float s_pitch = sin(angle.x);
    float c_pitch = cos(angle.x);

    mat3 pitchRotationMatrix = mat3(
        1.0, 0.0, 0.0,
        0.0, c_pitch, -s_pitch,
        0.0, s_pitch, c_pitch
    );

    vector = pitchRotationMatrix * vector;

    return vector;
}

void main() {
    vec2 uv = gl_FragCoord.xy;
    vec4 fragColor = vec4(0.0);

    for (int i = 0; i < n_gaussians; i++) {

        vec3 pos = unflatten3D(i);
        vec2 angle = vec2(
            (sin(u_time) + 1.) * .3,
            u_time * .75
        );

        vec3 adjusted_pos = rotateVector(pos, angle) + pos_offset;

        vec3 color = vec3(
            gauss_data[i * n_gauss_comps],
            gauss_data[i * n_gauss_comps + 1],
            gauss_data[i * n_gauss_comps + 2]
        );

        float opacity = gauss_data[i * n_gauss_comps + 3];
        float sigma =   gauss_data[i * n_gauss_comps + 4];
        float d_sigma = 1. + (sin(u_time * .60 + 2.) + 1.) / 2. * 2.;
        // float d_sigma = mod(u_time, 6.) < 2. ? 3. : 1.;  // no interploation

        addGauss(fragColor, adjusted_pos, uv, color, opacity, sigma * d_sigma);
    }

    gl_FragColor = vec4(vec3(fragColor) * brightness, 1.0);
}
