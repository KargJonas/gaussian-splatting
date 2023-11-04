precision mediump float;

#define PI 3.14159265
#define E  2.71828182

// Uniforms
uniform vec2  u_size;   // BUILTIN
uniform float u_time;   // BUILTIN
uniform float brightness;
uniform float gaussians[n_gaussians];
uniform ivec3 scene_shape;

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

void addGauss( inout vec4 fragColor, vec3 pos, vec2 uv, float sigma, vec3 color )
{
    float b = gauss2d(pos.xy / pos.z, uv, sigma * pos.z) / pos.z;
    vec4 c = vec4(color * b, 1.);
    fragColor += c;
}

vec3 unflatten3D( int i )
{
    // Number of items in one of the z-planes
    // (the planes that are perpendicular to the z-axis)
    int n_z_plane_items = scene_shape.x * scene_shape.y;

    int z = i / n_z_plane_items;
    i -= n_z_plane_items * z; // mod not supported todo: validate
    int y = i / scene_shape.x;
    int x = i - y * scene_shape.x;

    float max_dim = max3(f_scene_shape.x, f_scene_shape.y, f_scene_shape.z);

    // todo: figure out why 2.666 is the perfect number here...
    //   (just firgured it out with brute force
    vec3 pos = (vec3(x, y, z) - f_scene_shape / 2.666) / max_dim;


    return pos;
}

void main() {
    vec2 uv = gl_FragCoord.xy;
    vec4 fragColor = vec4(0.0);

    vec3 pos0 = vec3(cos(u_time), 0., sin(u_time) + 2.);
    vec3 pos1 = vec3(0., sin(u_time * 2.), cos(u_time * 2.) + 2.);
    vec3 pos2 = vec3(cos(u_time * 2.), sin(u_time * 2.), sin(u_time) + 2.);

//    addGauss(fragColor, pos0, uv, .03, RED);
//    addGauss(fragColor, pos1, uv, .03, GREEN);
//    addGauss(fragColor, pos2, uv, .02, BLUE);
//    addGauss(fragColor, vec3(scene_shape.x * 1., 0., 2.), uv, .02, BLUE);

    for (int i = 0; i < n_gaussians; i++) {
        addGauss(fragColor, unflatten3D(i) + pos_offset, uv, .1, RED);
    }

    gl_FragColor = vec4(vec3(fragColor) * brightness, 1.0);

//    if (scene_shape.y == 2) gl_FragColor = vec4(vec3(1.), 1.);
//    else gl_FragColor = vec4(vec3(0.), 1.);
}


























