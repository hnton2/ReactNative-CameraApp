import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "webgltexture-loader-expo-camera";
import defaultEffect from "../constants/defaultEffect";
import FSlider from "./FSlider";

function EffectList({ changeFilter, effectState, changeEffect }) {
    const [effect, setEffect] = useState(null);
    const handleEffect = (str) => (str === effect ? setEffect(null) : setEffect(str));

    // Value slider change
    const _onChange = (value) => {
        changeEffect(effect, value);
        changeFilter && changeFilter("effectMode");
    };

    const _onHidden = () => {
        setEffect(null);
    };

    const _onReset = () => {
        changeEffect(effect, defaultEffect[effect]);
    };

    return (
        <View style={{ flex: 1 }}>
            {effect === "saturation" && (
                <FSlider
                    name="saturation"
                    value={effectState.saturation}
                    min={0}
                    max={3}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {effect === "brightness" && (
                <FSlider
                    name="brightness"
                    value={effectState.brightness}
                    min={0}
                    max={5}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {effect === "contrast" && (
                <FSlider
                    name="contrast"
                    value={effectState.contrast}
                    min={-10}
                    max={10}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {effect === "hue" && (
                <FSlider
                    name="hue"
                    value={effectState.hue}
                    min={0}
                    max={6}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {effect === "sepia" && (
                <FSlider
                    name="sepia"
                    value={effectState.sepia}
                    min={-5}
                    max={5}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {effect === "gray" && (
                <FSlider
                    name="gray"
                    value={effectState.gray}
                    min={0}
                    max={1}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {effect === "temperature" && (
                <FSlider
                    name="temperature"
                    value={effectState.temperature}
                    min={0}
                    max={3000}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {effect === "sharpen" && (
                <FSlider
                    name="sharpen"
                    value={effectState.sharpen}
                    min={0}
                    max={3}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {effect === "blur" && (
                <FSlider
                    name="blur"
                    value={effectState.blur}
                    min={0}
                    max={5}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )}
            {/* {effect === "mixFactor" && (
                <FSlider
                    name="mixFactor"
                    value={effectState.mixFactor}
                    min={0}
                    max={2}
                    onChange={_onChange}
                    onReset={_onReset}
                    onHidden={_onHidden}
                />
            )} */}
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
                        <TouchableOpacity onPress={() => handleEffect("temperature")}>
                            <Text style={styles.textBox}>Temperature</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("sharpen")}>
                            <Text style={styles.textBox}>Sharpen</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("blur")}>
                            <Text style={styles.textBox}>Blur</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.box}>
                        <TouchableOpacity onPress={() => handleEffect("mixFactor")}>
                            <Text style={styles.textBox}>MixFactor</Text>
                        </TouchableOpacity>
                    </View> */}
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
