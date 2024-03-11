/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The ColorMatrixFilter class lets you apply a 4x4 matrix transformation on the RGBA
 * color and alpha values of every pixel on your displayObject to produce a result
 * with a new set of RGBA color and alpha values. It's pretty powerful!
 * 
 * @class ColorMatrixFilter
 * @extends AbstractFilter
 * @constructor
 */
class ColorMatrixFilter extends PIXI.AbstractFilter {
    constructor() {
        super();

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            m: {
                type: '1fv', value: [
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ]
            }
        };

        this.fragmentSrc = `
            precision mediump float;
            varying vec2 vTextureCoord;
            uniform float m[25];
            uniform sampler2D uSampler;

            void main(void) {
                vec4 c = texture2D(uSampler, vTextureCoord);
                gl_FragColor.r = (m[0] * c.r) + (m[1] * c.g) + (m[2] * c.b) + (m[3] * c.a) + m[4];
                gl_FragColor.g = (m[5] * c.r) + (m[6] * c.g) + (m[7] * c.b) + (m[8] * c.a) + m[9];
                gl_FragColor.b = (m[10] * c.r) + (m[11] * c.g) + (m[12] * c.b) + (m[13] * c.a) + m[14];
                gl_FragColor.a = (m[15] * c.r) + (m[16] * c.g) + (m[17] * c.b) + (m[18] * c.a) + m[19];
            }
        `;
    }

    // ... rest of the code ...
}

// ... rest of the code ...
