attribute vec2 a_position;
varying vec2 v_texCoord;

void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_texCoord = vec2(a_position.x, -a_position.y) * 0.5 + 0.5;
}
