precision highp float;

// The result of the previous render pass (our water scene)
uniform sampler2D tDiffuse;

// The two colors that define your gradient
uniform vec3 uColorA;
uniform vec3 uColorB;

// Controls the intensity of the effect
uniform float uMixAmount;

varying vec2 vUv;

float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {
    // 1. Sample the color from our rendered water scene
    vec3 originalColor = texture2D(tDiffuse, vUv).rgb;

    // 2. Calculate its luminance
    float luminance = getLuminance(originalColor);

    // 3. Map the luminance to the gradient
    vec3 gradientColor = mix(uColorA, uColorB, luminance);

    // 4. Blend the gradient effect with the original scene color
    vec3 finalColor = mix(originalColor, gradientColor, uMixAmount);

    gl_FragColor = vec4(finalColor, 1.0);
}