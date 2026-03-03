uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

varying vec2 vUv;

// Classic 2D Random & Noise functions
mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractal Brownian Motion for the "neural" organic look
float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
        f += amp * noise(p);
        p = p * 2.0 * rot(u_time * 0.1);
        amp *= 0.5;
    }
    return f;
}

void main() {
    // Normalize coordinates
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Adjust aspect ratio to prevent stretching
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    // Smooth mouse parallax/distortion
    vec2 mouseOffset = (u_mouse * 2.0 - 1.0) * 0.15;
    p += mouseOffset;

    // Domain Warping (Liquid effect)
    vec2 q = vec2(0.0);
    q.x = fbm(p + vec2(0.0, u_time * 0.1));
    q.y = fbm(p + vec2(1.0, u_time * 0.15));

    vec2 r = vec2(0.0);
    r.x = fbm(p + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
    r.y = fbm(p + 1.0 * q + vec2(8.3, 2.8) + 0.12 * u_time);

    float f = fbm(p + r);

    // Color Palette: Electric Blue, Violet, Deep Space Black
    vec3 color1 = vec3(0.05, 0.1, 0.2); // Dark base
    vec3 color2 = vec3(0.1, 0.3, 0.8); // Electric Blue
    vec3 color3 = vec3(0.4, 0.1, 0.7); // Violet
    vec3 color4 = vec3(0.0, 0.8, 1.0); // Neon Cyan highlights

    vec3 finalColor = mix(color1, color2, clamp((f*f)*4.0, 0.0, 1.0));
    finalColor = mix(finalColor, color3, clamp(length(q), 0.0, 1.0));
    finalColor = mix(finalColor, color4, clamp(length(r.x), 0.0, 1.0) * 0.5);

    // Vignette for depth
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
    finalColor *= vignette;

    // Subtle Grain for premium texture
    float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += grain * 0.03;

    gl_FragColor = vec4(finalColor, 1.0);
}