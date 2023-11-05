
vec3 rotateVector(vec3 vector, float pitch, float yaw) {
    // First, apply the yaw rotation around the Y-axis.
    float s_yaw = sin(yaw);
    float c_yaw = cos(yaw);

    mat3 yawRotationMatrix = mat3(
        c_yaw, 0.0, s_yaw,
        0.0, 1.0, 0.0,
        -s_yaw, 0.0, c_yaw
    );

    vector = yawRotationMatrix * vector;
    vector = yawRotationMatrix * vector;

    // Then, apply the pitch rotation around the X-axis.
    float s_pitch = sin(pitch);
    float c_pitch = cos(pitch);

    mat3 pitchRotationMatrix = mat3(
        1.0, 0.0, 0.0,
        0.0, c_pitch, -s_pitch,
        0.0, s_pitch, c_pitch
    );

    vector = pitchRotationMatrix * vector;

    return vector;
}

vec3 rotateVectorY(vec3 vector, float angle) {
    float s = sin(angle);
    float c = cos(angle);

    mat3 rotationMatrix = mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
    );

    return rotationMatrix * vector;
}