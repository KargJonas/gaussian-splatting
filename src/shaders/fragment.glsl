precision mediump float;

#define PI 3.14159265
#define E  2.71828182

// Uniforms
varying vec2  v_texCoord;
uniform vec2  u_size;
uniform float u_time;
uniform float u_brightness;

// Constanst (perf reasons)
const float GAUSS_FACTOR = sqrt(2. * PI);

// Commonly used colors
const vec3 RED = vec3(1., 0., 0.);
const vec3 GREEN = vec3(0., 1., 0.);
const vec3 BLUE = vec3(0., 0., 1.);

// Variables
//vec2 res;

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

void main() {
    vec2 uv = gl_FragCoord.xy;
    vec4 fragColor = vec4(0.0);

    vec3 pos0 = vec3(cos(u_time), 0., sin(u_time) + 2.);
    vec3 pos1 = vec3(0., sin(u_time * 2.), cos(u_time * 2.) + 2.);
    vec3 pos2 = vec3(cos(u_time * 2.), sin(u_time * 2.), sin(u_time) + 2.);

    addGauss(fragColor, pos0, uv, .03, RED);
    addGauss(fragColor, pos1, uv, .03, GREEN);
    addGauss(fragColor, pos2, uv, .02, BLUE);

    gl_FragColor = vec4(vec3(fragColor), 1.0);
}


























