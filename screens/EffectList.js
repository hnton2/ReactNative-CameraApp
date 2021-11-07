import { Surface } from "gl-react-expo";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "webgltexture-loader-expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

import Temperature from "../filters/Temperature";
import Hue from "../filters/Hue";
import ContrastSaturationBrightness from "../filters/ContrastSaturationBrightness";
import Negative from "../filters/Negative";
// import Sepia from "../filters/Sepia";
import Sharpen from "../filters/Sharpen";
import Saturate from "../filters/Saturate";

function EffectList({ texture, changePhoto }) {
    const [effect, setEffect] = useState(null);

    const handleChange = (value) => {
        console.log(value);
    };

    const handleEffect = (str) => {
        if (str === effect) setEffect(null);
        else setEffect(str);
    };

    return (
        <View style={{ flex: 1 }}>
            {effect ? (
                <View style={{ width: 400 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={2}
                            value={1}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#ccc"
                            onValueChange={handleChange}
                            style={styles.slider}
                        />
                    </View>
                    <View style={styles.sliderBar}>
                        <TouchableOpacity>
                            <MaterialIcons name="check" color="white" size={32} />
                        </TouchableOpacity>

                        <Text style={{ color: "#fff" }}>{effect}</Text>

                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="close" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("Brightness")}>
                            <Text style={styles.textBox}>Brightness</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("Contrast")}>
                            <Text style={styles.textBox}>Contrast</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("Saturation")}>
                            <Text style={styles.textBox}>Saturation</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("Blur")}>
                            <Text style={styles.textBox}>Blur</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("Sharpen")}>
                            <Text style={styles.textBox}>Sharpen</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

export default EffectList;

const styles = StyleSheet.create({
    box: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        padding: 20,
        margin: 5,
    },
    textBox: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    slider: {
        width: 250,
        height: 50,
        marginTop: 5,
    },
    sliderBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
});
