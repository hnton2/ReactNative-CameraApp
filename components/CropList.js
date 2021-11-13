import Ionicons from "@expo/vector-icons/build/Ionicons";
import * as ImageManipulator from "expo-image-manipulator";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

export default function CropList({ changeFilter, currentImage, changeManipulator }) {
    const _rotate = async (deg) => {
        await _manipulate([{ rotate: deg }], {
            format: ImageManipulator.SaveFormat.PNG,
        });
    };

    const _resize = async (size) => {
        await _manipulate([{ resize: size }]);
    };

    const _flip = async (flip) => {
        await _manipulate([{ flip }]);
    };

    const _compress = async (compress) => {
        await _manipulate([], { compress });
    };

    const _crop = async () => {
        await _manipulate([
            {
                crop: {
                    originX: 0,
                    originY: 0,
                    width: currentImage.width / 2,
                    height: currentImage.height,
                },
            },
        ]);
    };

    const _combo = async () => {
        await _manipulate([
            { rotate: 180 },
            { flip: ImageManipulator.FlipType.Vertical },
            {
                crop: {
                    originX: currentImage.width / 4,
                    originY: currentImage.height / 4,
                    width: currentImage.width / 2,
                    height: currentImage.width / 2,
                },
            },
        ]);
    };

    const _reset = () => {
        setState((state) => ({ image: state.original }));
    };

    const _manipulate = async (actions, saveOptions) => {
        changeFilter("cropMode");
        const image = currentImage;
        const manipResult = await ImageManipulator.manipulateAsync(image.localUri || image.uri, actions, saveOptions);
        changeManipulator(manipResult);
    };

    return (
        <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ padding: 10 }}>
                <View style={styles.actionsButtons}>
                    <Button style={styles.button} onPress={() => _rotate(90)}>
                        {/* <Ionicons name="ios-refresh" size={16} color="#ffffff" /> */}
                        90
                    </Button>
                    <Button style={styles.button} onPress={() => _rotate(-90)}>
                        -90
                    </Button>
                    <Button style={styles.button} onPress={() => _flip(ImageManipulator.FlipType.Horizontal)}>
                        Flip horizontal
                    </Button>
                    <Button style={styles.button} onPress={() => _flip(ImageManipulator.FlipType.Vertical)}>
                        Flip vertical
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

const Button = ({ onPress, style, children }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        resizeMode: "contain",
    },
    button: {
        padding: 8,
        borderRadius: 3,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        marginRight: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    actionsButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    footerButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    buttonText: {
        color: "#fff",
        fontSize: 12,
    },
});
