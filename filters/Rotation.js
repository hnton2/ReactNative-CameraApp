import React from "react";
import { Shaders, Node, GLSL, GL } from "gl-react";

const shaders = Shaders.create({
    rotate: {
        frag: `
        precision highp float;
        varying vec2 uv;
        uniform float angle;
        uniform sampler2D t;
    
        void main () {
        mat2 rotation = mat2(
            cos(angle), -sin(angle),
            sin(angle),  cos(angle)
        );
        vec2 p = (uv - vec2(0.5)) * rotation + vec2(0.5);
        if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0)
            gl_FragColor = vec4(0.0);
        else
            gl_FragColor = texture2D(t, p);
        }`,
    },
});

export const Rotation = GL.createComponent(
    ({ children: t, angle }) => (
        <Node
            shader={shaders.rotate}
            uniforms={{
                t,
                angle,
            }}
        />
    ),
    {
        displayName: "Rotation",
        propTypes: {
            children: React.PropTypes.any.isRequired,
            angle: React.PropTypes.string.isRequired,
        },
    }
);
