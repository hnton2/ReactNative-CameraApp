import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";
import { Surface } from "gl-react-expo";
import Temperature from "../filters/Temperature";
import Hue from "../filters/Hue";
import Saturate from "../filters/Saturation";
import "webgltexture-loader-expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";

const renderTopBar = (navigation) => (
    <View style={styles.topBar}>
        <TouchableOpacity style={styles.toggleButton} onPress={() => navigation.goBack()}>
            <Text style={styles.whiteText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={() => {}}>
            <Text style={styles.whiteText}>Save</Text>
        </TouchableOpacity>
    </View>
);

const renderBottomBar = () => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleTab = (val) => {
        setSelectedIndex(val);
    };
    return (
        <View style={styles.bottomBar}>
            {/* <View style={styles.tabView}>
                {selectedIndex === 1 ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Image
                            source={{
                                uri: "https://github.com/iyegoroff/react-native-color-matrix-image-filters/raw/master/img/parrot.png",
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                        <Image
                            source={{
                                uri: "https://github.com/iyegoroff/react-native-color-matrix-image-filters/raw/master/img/gray.png",
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                        <Image
                            source={{
                                uri: "https://github.com/iyegoroff/react-native-color-matrix-image-filters/raw/master/img/parrot.png",
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                        <Image
                            source={{
                                uri: "https://github.com/iyegoroff/react-native-color-matrix-image-filters/raw/master/img/gray.png",
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                        <Image
                            source={{
                                uri: "https://github.com/iyegoroff/react-native-color-matrix-image-filters/raw/master/img/parrot.png",
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                        <Image
                            source={{
                                uri: "https://github.com/iyegoroff/react-native-color-matrix-image-filters/raw/master/img/parrot.png",
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                    </ScrollView>
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Image
                            source={{
                                uri: "https://github.com/iyegoroff/react-native-color-matrix-image-filters/raw/master/img/parrot.png",
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                    </ScrollView>
                )}
            </View> */}

            <View style={styles.tab}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => handleTab(1)}>
                    <Icon name="color-filter-outline" color={selectedIndex === 1 ? "white" : "#858585"} size={25} />
                    <Text style={selectedIndex === 1 ? styles.tabTitleActive : styles.tabTitle}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => handleTab(2)}>
                    <MaterialIcons
                        name="auto-fix-high"
                        color={selectedIndex === 2 ? "white" : "#858585"}
                        type="material"
                        size={25}
                    />
                    <Text style={selectedIndex === 2 ? styles.tabTitleActive : styles.tabTitle}>Effect</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => handleTab(3)}>
                    <MaterialIcons
                        name="crop"
                        color={selectedIndex === 3 ? "white" : "#858585"}
                        type="material"
                        size={25}
                    />
                    <Text style={selectedIndex === 3 ? styles.tabTitleActive : styles.tabTitle}>Crop</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

function EditScreen({ route, navigation }) {
    const { photo } = route.params;
    const [texture, setTexture] = useState(null);

    useEffect(() => {
        const loadAsync = async () => {
            await FileSystem.copyAsync({
                from: `${photo.uri}/${photo.filename}`,
                to: FileSystem.documentDirectory + photo.filename,
            });

            const imageResult = await ImageManipulator.manipulateAsync(
                FileSystem.documentDirectory + photo.filename,
                [{ resize: { width: 300 } }],
                { compress: 1, format: "png" }
            );
            setTexture(imageResult);
        };
        loadAsync();
    }, []);

    return (
        <View style={styles.container}>
            {renderTopBar(navigation)}
            <View style={styles.main}>
                {texture ? (
                    <Surface style={{ width: texture.width, height: texture.height }}>
                        <Saturate contrast={1} saturation={1} brightness={1}>
                            {{
                                uri: texture.uri,
                            }}
                        </Saturate>
                    </Surface>
                ) : (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}
            </View>
            {renderBottomBar()}
        </View>
    );
}

export default EditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    main: {
        flex: 1,
        alignItems: "center",
        marginTop: 35,
        paddingTop: 25,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        paddingVertical: 5,
    },
    topBar: {
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flex: 0.1,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomBar: {
        zIndex: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flex: 0.2,
        backgroundColor: "black",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomButton: {
        flex: 0.4,
        height: 50,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    whiteText: {
        marginTop: 5,
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    tab: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 5,
    },
    tabTitle: {
        color: "#858585",
        fontSize: 13,
    },
    tabTitleActive: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
    },
    tabView: {
        flex: 3,
    },
});
