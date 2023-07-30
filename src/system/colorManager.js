import { log } from "playcanvas";
import { Game } from "../game";
import { Utils } from "../utils/utils";
export function ColorManager() {
  var colorManager = new pc.createScript("colorManager");

  colorManager.prototype.initialize = function () {
    Game.skyboxColorList = [
      Utils.getColor(161, 204, 209), // gray
      Utils.getColor(250, 216, 156), // orange
      Utils.getColor(161, 204, 209), // blue
      Utils.getColor(160, 216, 179), // green
      Utils.getColor(229, 220, 195), // white
    ];

    Game.groundColorList = [
      Utils.getColor(128, 128, 128), // gray
      Utils.getColor(241, 194, 123),
      Utils.getColor(253, 184, 144),
      Utils.getColor(162, 163, 120),
      Utils.getColor(199, 190, 162),
    ];

    Game.objectColorList = [
      Utils.getColor(128, 128, 128), // gray
      Utils.getColor(133, 163, 137),
      Utils.getColor(124, 157, 150),
      Utils.getColor(131, 118, 79),
      Utils.getColor(154, 148, 131),
    ];
    this._alpha = 0;
    Game.currentGroundColor = new pc.Color();
    Game.currentObjectColor = new pc.Color();
    Game.currentGroundColor = Game.groundColorList[0];
    Game.currentObjectColor = Game.objectColorList[0];
    Game.currentGroundMaterial = new pc.StandardMaterial();
    Game.currentObjectMaterial = new pc.StandardMaterial();
    Game.GEM_MATERIAL = new pc.StandardMaterial();
 
    Game.GEM_MATERIAL.chunks.transformVS = Game.currentObjectMaterial.chunks.transformVS = Game.currentGroundMaterial.chunks.transformVS = `
    uniform vec3 cameraPos;
    #ifdef PIXELSNAP
    uniform vec4 uScreenSize;
    #endif
    
    #ifdef SCREENSPACE
    uniform float projectionFlipY;
    #endif
    
    #ifdef MORPHING
    uniform vec4 morph_weights_a;
    uniform vec4 morph_weights_b;
    #endif
    
    #ifdef MORPHING_TEXTURE_BASED
        uniform vec4 morph_tex_params;
    
        #ifdef WEBGPU
            ivec2 getTextureMorphCoords() {
    
                // turn morph_vertex_id into int grid coordinates
                ivec2 textureSize = ivec2(morph_tex_params.xy);
                int morphGridV = int(morph_vertex_id / textureSize.x);
                int morphGridU = int(morph_vertex_id - (morphGridV * textureSize.x));
                morphGridV = textureSize.y - morphGridV - 1;
                return ivec2(morphGridU, morphGridV);
            }
        #else
            vec2 getTextureMorphCoords() {
                vec2 textureSize = morph_tex_params.xy;
                vec2 invTextureSize = morph_tex_params.zw;
    
                // turn morph_vertex_id into int grid coordinates
                float morphGridV = floor(morph_vertex_id * invTextureSize.x);
                float morphGridU = morph_vertex_id - (morphGridV * textureSize.x);
    
                // convert grid coordinates to uv coordinates with half pixel offset
                return vec2(morphGridU, morphGridV) * invTextureSize + (0.5 * invTextureSize);
            }
        #endif
    
    #endif
    
    #ifdef MORPHING_TEXTURE_BASED_POSITION
    uniform highp sampler2D morphPositionTex;
    #endif
    
    mat4 getModelMatrix() {
        #ifdef DYNAMICBATCH
        return getBoneMatrix(vertex_boneIndices);
        #elif defined(SKIN)
        return matrix_model * getSkinMatrix(vertex_boneIndices, vertex_boneWeights);
        #elif defined(INSTANCING)
        return mat4(instance_line1, instance_line2, instance_line3, instance_line4);
        #else
        return matrix_model;
        #endif
    }
    
    vec4 getPosition() {
        dModelMatrix = getModelMatrix();
        vec3 localPos = vertex_position;
    
        #ifdef NINESLICED
        // outer and inner vertices are at the same position, scale both
        localPos.xz *= outerScale;
    
        // offset inner vertices inside
        // (original vertices must be in [-1;1] range)
        vec2 positiveUnitOffset = clamp(vertex_position.xz, vec2(0.0), vec2(1.0));
        vec2 negativeUnitOffset = clamp(-vertex_position.xz, vec2(0.0), vec2(1.0));
        localPos.xz += (-positiveUnitOffset * innerOffset.xy + negativeUnitOffset * innerOffset.zw) * vertex_texCoord0.xy;
    
        vTiledUv = (localPos.xz - outerScale + innerOffset.xy) * -0.5 + 1.0; // uv = local pos - inner corner
    
        localPos.xz *= -0.5; // move from -1;1 to -0.5;0.5
        localPos = localPos.xzy;
        #endif
    
        #ifdef MORPHING
        #ifdef MORPHING_POS03
        localPos.xyz += morph_weights_a[0] * morph_pos0;
        localPos.xyz += morph_weights_a[1] * morph_pos1;
        localPos.xyz += morph_weights_a[2] * morph_pos2;
        localPos.xyz += morph_weights_a[3] * morph_pos3;
        #endif // MORPHING_POS03
        #ifdef MORPHING_POS47
        localPos.xyz += morph_weights_b[0] * morph_pos4;
        localPos.xyz += morph_weights_b[1] * morph_pos5;
        localPos.xyz += morph_weights_b[2] * morph_pos6;
        localPos.xyz += morph_weights_b[3] * morph_pos7;
        #endif // MORPHING_POS47
        #endif // MORPHING
    
        #ifdef MORPHING_TEXTURE_BASED_POSITION
    
            #ifdef WEBGPU
                ivec2 morphUV = getTextureMorphCoords();
                vec3 morphPos = texelFetch(morphPositionTex, ivec2(morphUV), 0).xyz;
            #else
                vec2 morphUV = getTextureMorphCoords();
                vec3 morphPos = texture2D(morphPositionTex, morphUV).xyz;
            #endif
    
            localPos += morphPos;
    
        #endif
    
        vec4 posW = dModelMatrix * vec4(localPos, 1.0);
        #ifdef SCREENSPACE
        posW.zw = vec2(0.0, 1.0);
        #endif
        float depth = posW.z;
        float noCurveDistance= 20.0;
        if(depth - cameraPos.z > noCurveDistance) {
          float amountY = pow(depth - cameraPos.z - noCurveDistance, 2.0) * 0.0007;
          posW = posW + vec4(0.0, -amountY, 0.0, 0.0);
        }
        dPositionW = posW.xyz;
    
        vec4 screenPos;
        #ifdef UV1LAYOUT
        screenPos = vec4(vertex_texCoord1.xy * 2.0 - 1.0, 0.5, 1);
        #else
        #ifdef SCREENSPACE
        screenPos = posW;
        screenPos.y *= projectionFlipY;
        #else
        screenPos = matrix_viewProjection * posW;
        #endif
    
        #ifdef PIXELSNAP
        // snap vertex to a pixel boundary
        screenPos.xy = (screenPos.xy * 0.5) + 0.5;
        screenPos.xy *= uScreenSize.xy;
        screenPos.xy = floor(screenPos.xy);
        screenPos.xy *= uScreenSize.zw;
        screenPos.xy = (screenPos.xy * 2.0) - 1.0;
        #endif
        #endif
    
        return screenPos;
    }
    
    vec3 getWorldPosition() {
        return dPositionW;
    }
    `;
    Game.currentGroundMaterial.diffuse = Game.currentGroundColor;
    Game.currentObjectMaterial.diffuse = Game.currentObjectColor;
    Game.GEM_MATERIAL.diffuse = Utils.getColor(242, 238, 157);
    Game.GEM_MATERIAL.update();
    Game.currentGroundMaterial.update();
    Game.currentObjectMaterial.update();
    this.app.on("colorManager:reset", this._resetColor, this);

    
  };

  colorManager.prototype.initCurveWorld = function () {};

  colorManager.prototype.update = function (dt) {
    let currentPoint = Math.floor(Game.player.getPosition().z / 10);
    // if player fly 100m, change skybox color
    if (currentPoint != 0 && currentPoint % 100 === 0 && this._alpha == 0) {
      this._alpha += dt;

      // make target color is squential color
      let targetColorIndex = Math.floor(currentPoint / 100);
      if (targetColorIndex > 4) targetColorIndex = 4;
      this.targetGroundColor = Game.groundColorList[targetColorIndex];
      this.targetObjectColor = Game.objectColorList[targetColorIndex];
      this.currentGroundColor = Game.currentGroundColor;
      this.currentObjectColor = Game.currentObjectColor;
    }

    if (this._alpha > 0) {
      this._alpha += dt;
      this._changeObjectColor(
        this.currentObjectColor,
        this.targetObjectColor,
        this._alpha
      );
      this._changeGroundColor(
        this.currentGroundColor,
        this.targetGroundColor,
        this._alpha
      );
      if (this._alpha > 0.99) {
        this._alpha = 0;
      }
    }
  };

  colorManager.prototype._changeGroundColor = function (
    currentColor,
    targetColor,
    alpha
  ) {
    // caculate next color by lerp current color to target color
    let nextColor = new pc.Color();
    nextColor.lerp(currentColor, targetColor, alpha);
    Game.currentGroundColor = nextColor;
    Game.currentGroundMaterial.diffuse = Game.currentGroundColor;
    Game.currentGroundMaterial.update();
  };

  colorManager.prototype._changeObjectColor = function (
    currentColor,
    targetColor,
    alpha
  ) {
    // caculate next color by lerp current color to target color
    let nextColor = new pc.Color();
    nextColor.lerp(currentColor, targetColor, alpha);
    Game.currentObjectColor = nextColor;
    Game.currentObjectMaterial.diffuse = Game.currentObjectColor;
    Game.currentObjectMaterial.update();
  };

  colorManager.prototype._resetColor = function () {
    this._alpha = 0;
    Game.currentGroundColor = Game.groundColorList[0];
    Game.currentObjectColor = Game.objectColorList[0];
    Game.currentGroundMaterial.diffuse = Game.currentGroundColor;
    Game.currentObjectMaterial.diffuse = Game.currentObjectColor;
    Game.currentGroundMaterial.update();
    Game.currentObjectMaterial.update();
  };
}
