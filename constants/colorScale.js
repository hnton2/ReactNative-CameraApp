import ndarray from "ndarray";

const colorScale = {
    heatmap: ndarray(new Float64Array([1, 0, 0, 1, 0.6, 0, 0.4, 1, 0.4, 0.1, 0.7, 1, 0, 0, 1]), [5, 1, 3]).step(
        -1,
        1,
        1
    ),

    monochrome: ndarray(new Float64Array([1, 1, 1, 0.1, 0.2, 0.3]), [2, 1, 3]).step(-1, 1, 1),

    opacity: ndarray(new Float64Array([0, 1]), [2, 1, 1]).step(-1, 1, 1), // see gl-texture2d rule: https://github.com/stackgl/gl-texture2d#var-tex--createtexturegl-array

    OrRd: ndarray(
        new Float64Array([
            1.0, 0.97, 0.93, 1.0, 0.91, 0.78, 0.99, 0.83, 0.62, 0.99, 0.73, 0.52, 0.99, 0.55, 0.35, 0.94, 0.4, 0.28,
            0.84, 0.19, 0.12, 0.7, 0.0, 0.0, 0.5, 0.0, 0.0,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    PuBu: ndarray(
        new Float64Array([
            1.0, 0.97, 0.98, 0.93, 0.91, 0.95, 0.82, 0.82, 0.9, 0.65, 0.74, 0.86, 0.45, 0.66, 0.81, 0.21, 0.56, 0.75,
            0.02, 0.44, 0.69, 0.02, 0.35, 0.55, 0.01, 0.22, 0.35,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    BuPu: ndarray(
        new Float64Array([
            0.97, 0.99, 0.99, 0.88, 0.93, 0.96, 0.75, 0.83, 0.9, 0.62, 0.74, 0.85, 0.55, 0.59, 0.78, 0.55, 0.42, 0.69,
            0.53, 0.25, 0.62, 0.51, 0.06, 0.49, 0.3, 0.0, 0.29,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    Oranges: ndarray(
        new Float64Array([
            1.0, 0.96, 0.92, 1.0, 0.9, 0.81, 0.99, 0.82, 0.64, 0.99, 0.68, 0.42, 0.99, 0.55, 0.24, 0.95, 0.41, 0.07,
            0.85, 0.28, 0.0, 0.65, 0.21, 0.01, 0.5, 0.15, 0.02,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    BuGn: ndarray(
        new Float64Array([
            0.97, 0.99, 0.99, 0.9, 0.96, 0.98, 0.8, 0.93, 0.9, 0.6, 0.85, 0.79, 0.4, 0.76, 0.64, 0.25, 0.68, 0.46, 0.14,
            0.55, 0.27, 0.0, 0.43, 0.17, 0.0, 0.27, 0.11,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    YlOrBr: ndarray(
        new Float64Array([
            1.0, 1.0, 0.9, 1.0, 0.97, 0.74, 1.0, 0.89, 0.57, 1.0, 0.77, 0.31, 1.0, 0.6, 0.16, 0.93, 0.44, 0.08, 0.8,
            0.3, 0.01, 0.6, 0.2, 0.02, 0.4, 0.15, 0.02,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    YlGn: ndarray(
        new Float64Array([
            1.0, 1.0, 0.9, 0.97, 0.99, 0.73, 0.85, 0.94, 0.64, 0.68, 0.87, 0.56, 0.47, 0.78, 0.47, 0.25, 0.67, 0.36,
            0.14, 0.52, 0.26, 0.0, 0.41, 0.22, 0.0, 0.27, 0.16,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    Reds: ndarray(
        new Float64Array([
            1.0, 0.96, 0.94, 1.0, 0.88, 0.82, 0.99, 0.73, 0.63, 0.99, 0.57, 0.45, 0.98, 0.42, 0.29, 0.94, 0.23, 0.17,
            0.8, 0.09, 0.11, 0.65, 0.06, 0.08, 0.4, 0.0, 0.05,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    RdPu: ndarray(
        new Float64Array([
            1.0, 0.97, 0.95, 0.99, 0.88, 0.87, 0.99, 0.77, 0.75, 0.98, 0.62, 0.71, 0.97, 0.41, 0.63, 0.87, 0.2, 0.59,
            0.68, 0.0, 0.49, 0.48, 0.0, 0.47, 0.29, 0.0, 0.42,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    Greens: ndarray(
        new Float64Array([
            0.97, 0.99, 0.96, 0.9, 0.96, 0.88, 0.78, 0.91, 0.75, 0.63, 0.85, 0.61, 0.45, 0.77, 0.46, 0.25, 0.67, 0.36,
            0.14, 0.55, 0.27, 0.0, 0.43, 0.17, 0.0, 0.27, 0.11,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    YlGnBu: ndarray(
        new Float64Array([
            1.0, 1.0, 0.85, 0.93, 0.97, 0.69, 0.78, 0.91, 0.71, 0.5, 0.8, 0.73, 0.25, 0.71, 0.77, 0.11, 0.57, 0.75,
            0.13, 0.37, 0.66, 0.15, 0.2, 0.58, 0.03, 0.11, 0.35,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    Purples: ndarray(
        new Float64Array([
            0.99, 0.98, 0.99, 0.94, 0.93, 0.96, 0.85, 0.85, 0.92, 0.74, 0.74, 0.86, 0.62, 0.6, 0.78, 0.5, 0.49, 0.73,
            0.42, 0.32, 0.64, 0.33, 0.15, 0.56, 0.25, 0.0, 0.49,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    GnBu: ndarray(
        new Float64Array([
            0.97, 0.99, 0.94, 0.88, 0.95, 0.86, 0.8, 0.92, 0.77, 0.66, 0.87, 0.71, 0.48, 0.8, 0.77, 0.31, 0.7, 0.83,
            0.17, 0.55, 0.75, 0.03, 0.41, 0.67, 0.03, 0.25, 0.51,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    Greys: ndarray(
        new Float64Array([
            1.0, 1.0, 1.0, 0.94, 0.94, 0.94, 0.85, 0.85, 0.85, 0.74, 0.74, 0.74, 0.59, 0.59, 0.59, 0.45, 0.45, 0.45,
            0.32, 0.32, 0.32, 0.15, 0.15, 0.15, 0.0, 0.0, 0.0,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    YlOrRd: ndarray(
        new Float64Array([
            1.0, 1.0, 0.8, 1.0, 0.93, 0.63, 1.0, 0.85, 0.46, 1.0, 0.7, 0.3, 0.99, 0.55, 0.24, 0.99, 0.31, 0.16, 0.89,
            0.1, 0.11, 0.74, 0.0, 0.15, 0.5, 0.0, 0.15,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    PuRd: ndarray(
        new Float64Array([
            0.97, 0.96, 0.98, 0.91, 0.88, 0.94, 0.83, 0.73, 0.85, 0.79, 0.58, 0.78, 0.87, 0.4, 0.69, 0.91, 0.16, 0.54,
            0.81, 0.07, 0.34, 0.6, 0.0, 0.26, 0.4, 0.0, 0.12,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    Blues: ndarray(
        new Float64Array([
            0.97, 0.98, 1.0, 0.87, 0.92, 0.97, 0.78, 0.86, 0.94, 0.62, 0.79, 0.88, 0.42, 0.68, 0.84, 0.26, 0.57, 0.78,
            0.13, 0.44, 0.71, 0.03, 0.32, 0.61, 0.03, 0.19, 0.42,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    PuBuGn: ndarray(
        new Float64Array([
            1.0, 0.97, 0.98, 0.93, 0.89, 0.94, 0.82, 0.82, 0.9, 0.65, 0.74, 0.86, 0.4, 0.66, 0.81, 0.21, 0.56, 0.75,
            0.01, 0.51, 0.54, 0.0, 0.42, 0.35, 0.0, 0.27, 0.21,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    Spectral: ndarray(
        new Float64Array([
            0.62, 0.0, 0.26, 0.84, 0.24, 0.31, 0.96, 0.43, 0.26, 0.99, 0.68, 0.38, 1.0, 0.88, 0.55, 1.0, 1.0, 0.75, 0.9,
            0.96, 0.6, 0.67, 0.87, 0.64, 0.4, 0.76, 0.65, 0.2, 0.53, 0.74, 0.37, 0.31, 0.64,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    RdYlGn: ndarray(
        new Float64Array([
            0.65, 0.0, 0.15, 0.84, 0.19, 0.15, 0.96, 0.43, 0.26, 0.99, 0.68, 0.38, 1.0, 0.88, 0.55, 1.0, 1.0, 0.75,
            0.85, 0.94, 0.55, 0.65, 0.85, 0.42, 0.4, 0.74, 0.39, 0.1, 0.6, 0.31, 0.0, 0.41, 0.22,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    RdBu: ndarray(
        new Float64Array([
            0.4, 0.0, 0.12, 0.7, 0.09, 0.17, 0.84, 0.38, 0.3, 0.96, 0.65, 0.51, 0.99, 0.86, 0.78, 0.97, 0.97, 0.97,
            0.82, 0.9, 0.94, 0.57, 0.77, 0.87, 0.26, 0.58, 0.76, 0.13, 0.4, 0.67, 0.02, 0.19, 0.38,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    PiYG: ndarray(
        new Float64Array([
            0.56, 0.0, 0.32, 0.77, 0.11, 0.49, 0.87, 0.47, 0.68, 0.95, 0.71, 0.85, 0.99, 0.88, 0.94, 0.97, 0.97, 0.97,
            0.9, 0.96, 0.82, 0.72, 0.88, 0.53, 0.5, 0.74, 0.25, 0.3, 0.57, 0.13, 0.15, 0.39, 0.1,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    PRGn: ndarray(
        new Float64Array([
            0.25, 0.0, 0.29, 0.46, 0.16, 0.51, 0.6, 0.44, 0.67, 0.76, 0.65, 0.81, 0.91, 0.83, 0.91, 0.97, 0.97, 0.97,
            0.85, 0.94, 0.83, 0.65, 0.86, 0.63, 0.35, 0.68, 0.38, 0.11, 0.47, 0.22, 0.0, 0.27, 0.11,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    RdYlBu: ndarray(
        new Float64Array([
            0.65, 0.0, 0.15, 0.84, 0.19, 0.15, 0.96, 0.43, 0.26, 0.99, 0.68, 0.38, 1.0, 0.88, 0.56, 1.0, 1.0, 0.75,
            0.88, 0.95, 0.97, 0.67, 0.85, 0.91, 0.45, 0.68, 0.82, 0.27, 0.46, 0.71, 0.19, 0.21, 0.58,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    BrBG: ndarray(
        new Float64Array([
            0.33, 0.19, 0.02, 0.55, 0.32, 0.04, 0.75, 0.51, 0.18, 0.87, 0.76, 0.49, 0.96, 0.91, 0.76, 0.96, 0.96, 0.96,
            0.78, 0.92, 0.9, 0.5, 0.8, 0.76, 0.21, 0.59, 0.56, 0.0, 0.4, 0.37, 0.0, 0.24, 0.19,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    RdGy: ndarray(
        new Float64Array([
            0.4, 0.0, 0.12, 0.7, 0.09, 0.17, 0.84, 0.38, 0.3, 0.96, 0.65, 0.51, 0.99, 0.86, 0.78, 1.0, 1.0, 1.0, 0.88,
            0.88, 0.88, 0.73, 0.73, 0.73, 0.53, 0.53, 0.53, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    PuOr: ndarray(
        new Float64Array([
            0.5, 0.23, 0.03, 0.7, 0.35, 0.02, 0.88, 0.51, 0.08, 0.99, 0.72, 0.39, 1.0, 0.88, 0.71, 0.97, 0.97, 0.97,
            0.85, 0.85, 0.92, 0.7, 0.67, 0.82, 0.5, 0.45, 0.67, 0.33, 0.15, 0.53, 0.18, 0.0, 0.29,
        ]),
        [11, 1, 3]
    ).step(-1, 1, 1),
    Set2: ndarray(
        new Float64Array([
            0.4, 0.76, 0.65, 0.99, 0.55, 0.38, 0.55, 0.63, 0.8, 0.91, 0.54, 0.76, 0.65, 0.85, 0.33, 1.0, 0.85, 0.18,
            0.9, 0.77, 0.58, 0.7, 0.7, 0.7,
        ]),
        [8, 1, 3]
    ).step(-1, 1, 1),
    Accent: ndarray(
        new Float64Array([
            0.5, 0.79, 0.5, 0.75, 0.68, 0.83, 0.99, 0.75, 0.53, 1.0, 1.0, 0.6, 0.22, 0.42, 0.69, 0.94, 0.01, 0.5, 0.75,
            0.36, 0.09, 0.4, 0.4, 0.4,
        ]),
        [8, 1, 3]
    ).step(-1, 1, 1),
    Set1: ndarray(
        new Float64Array([
            0.89, 0.1, 0.11, 0.22, 0.49, 0.72, 0.3, 0.69, 0.29, 0.6, 0.31, 0.64, 1.0, 0.5, 0.0, 1.0, 1.0, 0.2, 0.65,
            0.34, 0.16, 0.97, 0.51, 0.75, 0.6, 0.6, 0.6,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
    Set3: ndarray(
        new Float64Array([
            0.55, 0.83, 0.78, 1.0, 1.0, 0.7, 0.75, 0.73, 0.85, 0.98, 0.5, 0.45, 0.5, 0.69, 0.83, 0.99, 0.71, 0.38, 0.7,
            0.87, 0.41, 0.99, 0.8, 0.9, 0.85, 0.85, 0.85, 0.74, 0.5, 0.74, 0.8, 0.92, 0.77, 1.0, 0.93, 0.44,
        ]),
        [12, 1, 3]
    ).step(-1, 1, 1),
    Dark2: ndarray(
        new Float64Array([
            0.11, 0.62, 0.47, 0.85, 0.37, 0.01, 0.46, 0.44, 0.7, 0.91, 0.16, 0.54, 0.4, 0.65, 0.12, 0.9, 0.67, 0.01,
            0.65, 0.46, 0.11, 0.4, 0.4, 0.4,
        ]),
        [8, 1, 3]
    ).step(-1, 1, 1),
    Paired: ndarray(
        new Float64Array([
            0.65, 0.81, 0.89, 0.12, 0.47, 0.71, 0.7, 0.87, 0.54, 0.2, 0.63, 0.17, 0.98, 0.6, 0.6, 0.89, 0.1, 0.11, 0.99,
            0.75, 0.44, 1.0, 0.5, 0.0, 0.79, 0.7, 0.84, 0.42, 0.24, 0.6, 1.0, 1.0, 0.6, 0.69, 0.35, 0.16,
        ]),
        [12, 1, 3]
    ).step(-1, 1, 1),
    Pastel2: ndarray(
        new Float64Array([
            0.7, 0.89, 0.8, 0.99, 0.8, 0.67, 0.8, 0.84, 0.91, 0.96, 0.79, 0.89, 0.9, 0.96, 0.79, 1.0, 0.95, 0.68, 0.95,
            0.89, 0.8, 0.8, 0.8, 0.8,
        ]),
        [8, 1, 3]
    ).step(-1, 1, 1),
    Pastel1: ndarray(
        new Float64Array([
            0.98, 0.71, 0.68, 0.7, 0.8, 0.89, 0.8, 0.92, 0.77, 0.87, 0.8, 0.89, 1.0, 0.85, 0.65, 1.0, 1.0, 0.8, 0.9,
            0.85, 0.74, 0.99, 0.85, 0.93, 0.95, 0.95, 0.95,
        ]),
        [9, 1, 3]
    ).step(-1, 1, 1),
};

export default colorScale;
