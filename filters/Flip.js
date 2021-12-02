import { Node, Shaders, GLSL } from "gl-react";
import React from "react";

const shaders = Shaders.create({
    Flip: {
        frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform sampler2D t;
        void main(){
            gl_FragColor=texture2D(t, vec2(1.0 - uv.x, uv.y));
        }`,
    },
});

export const Flip = ({ children }) => <Node shader={shaders.Flip} uniforms={{ t: children }} />;
