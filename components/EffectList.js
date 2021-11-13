import { Surface } from "gl-react-expo";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "webgltexture-loader-expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

function EffectList({ changeFilter, effectState, changeEffect }) {
    const [effect, setEffect] = useState(null);
    const handleEffect = (str) => {
        if (str === effect) setEffect(null);
        else setEffect(str);
    };

    // Value slider change
    const handlePreview = (value) => {
        changeEffect(effect, value);
        changeFilter("effectMode");
    };

    return (
        <View style={{ flex: 1 }}>
            {effect === "saturation" && (
                <View style={{ width: 400 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={3}
                            value={effectState.saturation}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#ccc"
                            onValueChange={handlePreview}
                            style={styles.slider}
                        />
                    </View>
                    <View style={styles.sliderBar}>
                        {/* Button apply effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="check" color="white" size={32} />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ color: "#fff" }}>Saturation</Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>
                                {Math.round(effectState.saturation * 100) / 100}
                            </Text>
                        </View>

                        {/* Button default effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="close" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {effect === "brightness" && (
                <View style={{ width: 400 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={3}
                            value={effectState.brightness}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#ccc"
                            onValueChange={handlePreview}
                            style={styles.slider}
                        />
                    </View>
                    <View style={styles.sliderBar}>
                        {/* Button apply effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="check" color="white" size={32} />
                        </TouchableOpacity>

                        <View>
                            <Text style={{ color: "#fff" }}>Brightness</Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>
                                {Math.round(effectState.brightness * 100) / 100}
                            </Text>
                        </View>
                        {/* Button default effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="close" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {effect === "contrast" && (
                <View style={{ width: 400 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={3}
                            value={effectState.contrast}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#ccc"
                            onValueChange={handlePreview}
                            style={styles.slider}
                        />
                    </View>
                    <View style={styles.sliderBar}>
                        {/* Button apply effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="check" color="white" size={32} />
                        </TouchableOpacity>

                        <Text style={{ color: "#fff" }}>Contrast</Text>
                        <View>
                            <Text style={{ color: "#fff" }}>Contrast</Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>
                                {Math.round(effectState.contrast * 100) / 100}
                            </Text>
                        </View>
                        {/* Button default effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="close" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {effect === "hue" && (
                <View style={{ width: 400 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={10}
                            value={effectState.hue}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#ccc"
                            onValueChange={handlePreview}
                            style={styles.slider}
                        />
                    </View>
                    <View style={styles.sliderBar}>
                        {/* Button apply effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="check" color="white" size={32} />
                        </TouchableOpacity>

                        <View>
                            <Text style={{ color: "#fff" }}>Hue</Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>
                                {Math.round(effectState.hue * 100) / 100}
                            </Text>
                        </View>
                        {/* Button default effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="close" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {effect === "sepia" && (
                <View style={{ width: 400 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={1}
                            value={effectState.sepia}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#ccc"
                            onValueChange={handlePreview}
                            style={styles.slider}
                        />
                    </View>
                    <View style={styles.sliderBar}>
                        {/* Button apply effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="check" color="white" size={32} />
                        </TouchableOpacity>

                        <View>
                            <Text style={{ color: "#fff" }}>Sepia</Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>
                                {Math.round(effectState.sepia * 100) / 100}
                            </Text>
                        </View>
                        {/* Button default effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="close" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {effect === "gray" && (
                <View style={{ width: 400 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={1}
                            value={effectState.gray}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#ccc"
                            onValueChange={handlePreview}
                            style={styles.slider}
                        />
                    </View>
                    <View style={styles.sliderBar}>
                        {/* Button apply effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="check" color="white" size={32} />
                        </TouchableOpacity>

                        <View>
                            <Text style={{ color: "#fff" }}>Gray</Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>
                                {Math.round(effectState.gray * 100) / 100}
                            </Text>
                        </View>
                        {/* Button default effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="close" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {effect === "mixFactor" && (
                <View style={{ width: 400 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={2}
                            value={effectState.mixFactor}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#ccc"
                            onValueChange={handlePreview}
                            style={styles.slider}
                        />
                    </View>
                    <View style={styles.sliderBar}>
                        {/* Button apply effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="check" color="white" size={32} />
                        </TouchableOpacity>

                        <View>
                            <Text style={{ color: "#fff" }}>MixFactor</Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>
                                {Math.round(effectState.mixFactor * 100) / 100}
                            </Text>
                        </View>
                        {/* Button default effect */}
                        <TouchableOpacity onPress={() => setEffect(null)}>
                            <MaterialIcons name="close" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {!effect && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("saturation")}>
                            <Text style={styles.textBox}>Saturation</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("brightness")}>
                            <Text style={styles.textBox}>Brightness</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("contrast")}>
                            <Text style={styles.textBox}>Contrast</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("hue")}>
                            <Text style={styles.textBox}>Hue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("sepia")}>
                            <Text style={styles.textBox}>Sepia</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("gray")}>
                            <Text style={styles.textBox}>Gray</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("mixFactor")}>
                            <Text style={styles.textBox}>MixFactor</Text>
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
