import { GLSL, Node, Shaders } from "gl-react";
import React from "react";

const shaders = Shaders.create({
    Saturate: {
        frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform sampler2D t;
        uniform float factor;

        void main () {
        vec4 c = texture2D(t, uv);
        const vec3 W = vec3(0.2125, 0.7154, 0.0721);
        gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, factor), c.a);
        }`,
    },
});

export default function Saturate({ factor, children: t }) {
    return <Node shader={shaders.Saturate} uniforms={{ factor, t }} />;
}
