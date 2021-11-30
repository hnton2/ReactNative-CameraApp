import { useIsFocused } from "@react-navigation/core";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ALBUM_NAME = "My Album";

const fetchAlbums = async () => {
    try {
        const myAlbum = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
        if (myAlbum.assetCount < 1) return;
        return await MediaLibrary.getAssetsAsync({ album: myAlbum, first: myAlbum.assetCount });
    } catch (e) {
        if (e.code === "ERR_NO_ENOUGH_PERMISSIONS") {
            return [];
        } else {
            throw e;
        }
    }
};

export default function GalleryScreen({ navigation }) {
    const [photos, setPhotos] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchAlbums().then((albums) => setPhotos(albums.assets));
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-outline" color="#fff" size={25} />
                </TouchableOpacity>
                <Text style={styles.whiteText}>Gallery</Text>
                <TouchableOpacity style={styles.button}>
                    <Icon name="close-circle-outline" color="#fff" size={25} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.pictures}>
                    {photos.map((photo, index) => (
                        <TouchableOpacity
                            style={styles.pictureWrapper}
                            key={index}
                            onPress={() => navigation.navigate("Edit", { originalPhoto: photo })}
                        >
                            <Image style={styles.picture} source={{ uri: `${photo.uri}/${photo.filename}` }} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#4630EB",
    },
    pictureWrapper: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        margin: 1,
    },
    pictures: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 8,
    },
    picture: {
        position: "absolute",
        width: 80,
        height: 80,
    },
    button: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    whiteText: {
        marginTop: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    bottomBar: {
        paddingBottom: 5,
        backgroundColor: "#4630EB",
        justifyContent: "center",
        flexDirection: "row",
    },
    bottomButton: {
        flex: 0.3,
        height: 58,
        justifyContent: "center",
        alignItems: "center",
    },
});
