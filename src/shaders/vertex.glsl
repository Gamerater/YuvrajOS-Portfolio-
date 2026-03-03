varying vec2 vUv;

void main() {
    vUv = uv;
    // Bypass projection and model-view matrices for pure 2D full-screen performance
    gl_Position = vec4(position, 1.0);
}