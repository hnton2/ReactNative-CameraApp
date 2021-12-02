import React from "react";
import { Shaders, Node, GLSL } from "gl-react";

const shaders = Shaders.create({
    flyeye: {
        frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D t;
      uniform float factor;
      void main () {
        gl_FragColor = texture2D(
          t,
          uv + vec2(
            0.01 * sin(uv.x * factor * 200.0),
            0.01 * sin(uv.y * factor * 200.0)
          )
        );
      }
    `,
    },
});

export const Flyeye = ({ children, factor }) => <Node shader={shaders.flyeye} uniforms={{ factor, t: children }} />;
