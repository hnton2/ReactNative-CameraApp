import { Surface } from "gl-react-expo";
import React from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import "webgltexture-loader-expo-camera";

import Temperature from "../filters/Temperature";
import Hue from "../filters/Hue";
import ContrastSaturationBrightness from "../filters/ContrastSaturationBrightness";
import Negative from "../filters/Negative";
// import Sepia from "../filters/Sepia";
import Sharpen from "../filters/Sharpen";
import Saturate from "../filters/Saturate";
import ColorMatrix from "../filters/ColorMatrix";

function FilterList({ texture, changePhoto }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
                <Surface style={{ width: 50, height: 50 }}>
                    <Temperature factor={6300}>
                        {{
                            uri: texture.uri,
                        }}
                    </Temperature>
                </Surface>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 50, height: 50 }}>
                    <Hue factor={2}>
                        {{
                            uri: texture.uri,
                        }}
                    </Hue>
                </Surface>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 50, height: 50 }}>
                    <Negative factor={0.75}>
                        {{
                            uri: texture.uri,
                        }}
                    </Negative>
                </Surface>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 50, height: 50 }}>
                    <ContrastSaturationBrightness brightness={1.2} contrast={1.5} saturation={1}>
                        {{
                            uri: texture.uri,
                        }}
                    </ContrastSaturationBrightness>
                </Surface>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 50, height: 50 }}>
                    <Sharpen factor={1} width={texture.width} height={texture.height}>
                        {{
                            uri: texture.uri,
                        }}
                    </Sharpen>
                </Surface>
            </TouchableOpacity>
            <TouchableOpacity>
                <Surface style={{ width: 50, height: 50 }}>
                    <Saturate factor={2}>
                        {{
                            uri: texture.uri,
                        }}
                    </Saturate>
                </Surface>
            </TouchableOpacity>
            {/* <TouchableOpacity>
                <Surface style={{ width: 50, height: 50 }}>
                    <ColorMatrix matrix={smoothFilter}>
                        {{
                            uri: texture.uri,
                        }}
                    </ColorMatrix>
                </Surface>
            </TouchableOpacity> */}
        </ScrollView>
    );
}

export default FilterList;
