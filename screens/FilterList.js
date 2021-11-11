import { Surface } from "gl-react-expo";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import GLImage from "gl-react-image";
import "webgltexture-loader-expo-camera";

import Temperature from "../filters/Temperature";
import Hue from "../filters/Hue";
import ContrastSaturationBrightness from "../filters/ContrastSaturationBrightness";
import Negative from "../filters/Negative";
import Sepia from "../filters/Sepia";
import Sharpen from "../filters/Sharpen";
import Saturate from "../filters/Saturate";

import Amaro from "../filters/Amaro";
import Brannan from "../filters/Brannan";
import Earlybird from "../filters/Earlybird";
import F1977 from "../filters/F1977";
import Hefe from "../filters/Hefe";
import Hudson from "../filters/Hudson";
import Inkwell from "../filters/Inkwell";
import Lokofi from "../filters/Lokofi";
import LordKelvin from "../filters/LordKelvin";
import Nashville from "../filters/Nashville";
import Normal from "../filters/Normal";
import Rise from "../filters/Rise";
import Sierra from "../filters/Sierra";
import Sutro from "../filters/Sutro";
import Toaster from "../filters/Toaster";
import Valencia from "../filters/Valencia";
import Walden from "../filters/Walden";
import XproII from "../filters/XproII";

import Colorify from "../filters/ColorScale";

import colorScale from "../constants/colorScale";

function FilterList({ texture, changePhoto }) {
    return (
        <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Amaro>
                        {{
                            uri: texture.uri,
                        }}
                    </Amaro>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Amaro</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Brannan>
                        {{
                            uri: texture.uri,
                        }}
                    </Brannan>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Brannan</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Earlybird>
                        {{
                            uri: texture.uri,
                        }}
                    </Earlybird>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Earlybird</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <F1977>
                        {{
                            uri: texture.uri,
                        }}
                    </F1977>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>F1977</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Hefe>
                        {{
                            uri: texture.uri,
                        }}
                    </Hefe>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Hefe</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Hudson>
                        {{
                            uri: texture.uri,
                        }}
                    </Hudson>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Hudson</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Inkwell>
                        {{
                            uri: texture.uri,
                        }}
                    </Inkwell>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Inkwell</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Lokofi>
                        {{
                            uri: texture.uri,
                        }}
                    </Lokofi>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Lokofi</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <LordKelvin>
                        {{
                            uri: texture.uri,
                        }}
                    </LordKelvin>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>LordKelvin</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Nashville>
                        {{
                            uri: texture.uri,
                        }}
                    </Nashville>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Nashville</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Normal>
                        {{
                            uri: texture.uri,
                        }}
                    </Normal>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Rise>
                        {{
                            uri: texture.uri,
                        }}
                    </Rise>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Rise</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Sierra>
                        {{
                            uri: texture.uri,
                        }}
                    </Sierra>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Sierra</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Sutro>
                        {{
                            uri: texture.uri,
                        }}
                    </Sutro>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Sutro</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Toaster>
                        {{
                            uri: texture.uri,
                        }}
                    </Toaster>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Toaster</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Valencia>
                        {{
                            uri: texture.uri,
                        }}
                    </Valencia>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Valencia</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Walden>
                        {{
                            uri: texture.uri,
                        }}
                    </Walden>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Walden</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <XproII>
                        {{
                            uri: texture.uri,
                        }}
                    </XproII>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>XproII</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Temperature factor={6300}>
                        {{
                            uri: texture.uri,
                        }}
                    </Temperature>
                </Surface>
                <Text style={{ color: "white" }}>Temperature</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Hue factor={2}>
                        {{
                            uri: texture.uri,
                        }}
                    </Hue>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Hue</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Negative factor={0.25}>
                        {{
                            uri: texture.uri,
                        }}
                    </Negative>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Negative</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <ContrastSaturationBrightness brightness={1.2} contrast={1.5} saturation={1}>
                        {{
                            uri: texture.uri,
                        }}
                    </ContrastSaturationBrightness>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>CSB</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Sharpen factor={1} width={texture.width} height={texture.height}>
                        {{
                            uri: texture.uri,
                        }}
                    </Sharpen>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Sharpen</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Saturate factor={2}>
                        {{
                            uri: texture.uri,
                        }}
                    </Saturate>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Saturate</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Sepia factor={1.5}>
                        {{
                            uri: texture.uri,
                        }}
                    </Sepia>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Sepia</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 80, height: 80 }}>
                    <Colorify colorScale={colorScale["heatmap"]}>
                        {{
                            uri: texture.uri,
                        }}
                    </Colorify>
                </Surface>
                <Text style={{ color: "white", textAlign: "center" }}>Colorify</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default FilterList;
