precision highp float;

uniform sampler2D tWater; 
uniform sampler2D tFlow;  
uniform vec4 res;         
uniform float uTime;

varying vec2 vUv;


void main() {
    // 1. Get the DRASIC mouse distortion from the flowmap. This part is correct.
    vec3 flow = texture2D(tFlow, vUv).rgb;

    // We control the strength of the mouse "brush stroke" here.
    float mouseStrength = 0.022;
    vec2 mouseDistortion = flow.xy * mouseStrength;
    
    // 2. Create the LANGUID background distortion using smooth waves.
    // NO high-frequency noise is used here.
    
    // Tweak these values to change the character of the languid effect
    float languidFrequency = 6.0;   // How many waves are on screen. Try values from 3.0 to 10.0
    float languidSpeed = 0.03;      // How fast the waves move.
    float languidStrength = 0.01;   // How strong the background waves are. Increase for a more wobbly feel.

    // Create two separate, overlapping sine waves that move at different speeds and angles.
    // This creates a much more natural, non-repeating watery effect.
    vec2 wave1 = vec2(
        sin(vUv.y * languidFrequency + uTime * languidSpeed),
        cos(vUv.x * languidFrequency + uTime * languidSpeed)
    );
    
    vec2 wave2 = vec2(
        sin(vUv.x * languidFrequency * 0.7 + uTime * languidSpeed * 0.6),
        cos(vUv.y * languidFrequency * 0.7 + uTime * languidSpeed * 0.6)
    );

    // Combine the waves and apply the strength
    vec2 languidDistortion = (wave1 + wave2) * languidStrength;
    
    // 3. Combine both distortions and displace the texture coordinates
    vec2 uv = vUv;
    uv += mouseDistortion;
    uv += languidDistortion;
    
    // 4. Sample the final texture from the distorted coordinates
    vec3 tex = texture2D(tWater, uv).rgb;
    
    gl_FragColor = vec4(tex, 1.0);
}