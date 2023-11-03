#define PI 3.14159265
#define E  2.71828182

const float GAUSS_FACTOR = sqrt(2. * PI);

const vec3 RED = vec3(1., 0., 0.);
const vec3 GREEN = vec3(0., 1., 0.);
const vec3 BLUE = vec3(0., 0., 1.);

vec2 res;

float gauss( float x, float m, float sigma )
{
    return pow(E, -pow(x - m, 2.) / 2. * sigma * sigma) / (sigma * GAUSS_FACTOR);
}


float gauss2d( vec2 pos, vec2 uv, float sigma )
{
    float d = distance((pos / 2. + .5) * res, uv);
    return gauss(d, 0., sigma) * sigma;
}


void addGauss( inout vec4 fragColor, vec3 pos, vec2 uv, float sigma, vec3 color )
{
    float b = gauss2d(pos.xy / pos.z, uv, sigma * pos.z) / pos.z;
    vec4 c = vec4(color * b, 1.);
    fragColor += c;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy;
    res = iResolution.xy;

    vec3 pos0 = vec3(cos(iTime), 0., sin(iTime) + 2.);
    vec3 pos1 = vec3(0., sin(iTime * 2.), cos(iTime * 2.) + 2.);
    vec3 pos2 = vec3(cos(iTime * 2.), sin(iTime * 2.), sin(iTime) + 2.);

    addGauss(fragColor, pos0, uv, .03, RED);
    addGauss(fragColor, pos1, uv, .03, GREEN);
    addGauss(fragColor, pos2, uv, .02, BLUE);
}
