import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function FSlider({ name, value, min, max, onChange, onReset, onHidden }) {
    const handleOnChange = (value) => {
        onChange(value);
    };

    const handleOnReset = () => {
        onReset();
    };

    const handleOnHidden = () => {
        onHidden();
    };

    return (
        <View style={{ width: 400 }}>
            <View style={styles.sliderContainer}>
                <Slider
                    minimumValue={min}
                    maximumValue={max}
                    value={value}
                    step={0.01}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#ccc"
                    onValueChange={handleOnChange}
                    style={styles.slider}
                />
            </View>
            <View style={styles.sliderBar}>
                {/* Button apply effect */}
                <TouchableOpacity onPress={handleOnHidden}>
                    <MaterialIcons name="check" color="white" size={32} />
                </TouchableOpacity>

                <View>
                    <Text style={styles.text1}>{name}</Text>
                    <Text style={styles.text1}>{Math.round(value * 100) / 100}</Text>
                </View>
                {/* Button default effect */}
                <TouchableOpacity onPress={handleOnReset}>
                    <MaterialIcons name="refresh" color="white" size={32} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FSlider;

const styles = StyleSheet.create({
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
    sliderContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },
    sliderBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    text1: {
        color: "#fff",
        textAlign: "center",
        textTransform: "capitalize",
    },
});
