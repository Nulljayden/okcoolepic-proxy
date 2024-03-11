/**
 * A horizontal blur filter for Phaser.
 * 
 * To use this filter, create a new instance of it and add it to a Phaser.Game object:
 * 
 *     var blurFilter = new Phaser.Filter.BlurX(game);
 *     game.filterManager.add(blurFilter);
 * 
 * Then, apply the filter to a game object's render texture:
 * 
 *     gameObject.filters = [blurFilter];
 * 
 * The blur amount can be adjusted using the `blur` property:
 * 
 *     blurFilter.blur = 10;
 * 
 * Or by calling the `setBlur` method:
 * 
 *     blurFilter.setBlur(10);
 */
Phaser.Filter.BlurX = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.blur = { type: '1f', value: 1 / 512 };

    this.fragmentSrc = [

        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        "uniform float blur;",
        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 sum = vec4(0.0);",

            "sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;",
            "sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;",
            "sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;",
            "sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;",
            "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
            "sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;",
            "sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*bl
