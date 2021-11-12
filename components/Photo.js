import React, { useEffect, useState } from "react";
import { Image, View, Platform, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import EditScreen from "../screens/Edit";
import Icon from "react-native-vector-icons/Ionicons";

export default function PhotoScreen({ photo, editPhoto }) {
    const [selected, setSelected] = useState(false);

    toggleSelection = () => {
        // setSelected(!selected);
        return <EditScreen photo />;
    };

    return (
        <TouchableOpacity
            style={styles.pictureWrapper}
            // onLongPress={this.detectFace}
            onPress={() => editPhoto(photo)}
            // activeOpacity={1}
        >
            <Image style={styles.picture} source={{ uri: `${photo.uri}/${photo.filename}` }} />
            {/* {selected && <Icon name="checkmark-circle-outline" size={30} color="#4630EB" />} */}
            {/* <View style={styles.facesContainer}>{this.renderFaces()}</View> */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    picture: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        // resizeMode: "contain",
    },
    pictureWrapper: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        margin: 1,
    },
    facesContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        borderWidth: 2,
        borderRadius: 2,
        position: "absolute",
        borderColor: "#FFD700",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    faceText: {
        color: "#FFD700",
        fontWeight: "bold",
        textAlign: "center",
        margin: 2,
        fontSize: 10,
        backgroundColor: "transparent",
    },
});
