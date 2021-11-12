import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import FilterList from "../components/FilterList";
import EffectList from "../components/EffectList";
import { Surface } from "gl-react-expo";
import "webgltexture-loader-expo-camera";
import filterType from "../constants/filterType";

import Temperature from "../filters/Temperature";
import Hue from "../filters/Hue";
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
import FilterComponent from "../components/Filter";
import { saveImageToAlbum } from "../helpers/Library";

const renderTopBar = ({ navigation, saveImage }) => (
    <View style={styles.topBar}>
        <TouchableOpacity style={styles.toggleButton} onPress={() => navigation.goBack()}>
            <Text style={styles.whiteText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={saveImage}>
            <Text style={styles.whiteText}>Save</Text>
        </TouchableOpacity>
    </View>
);

const renderBottomBar = ({ texture, changeFilter }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [showEffect, setShowEffect] = useState(false);
    const [showCrop, setShowCrop] = useState(false);

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
        setShowCrop(false);
        setShowEffect(false);
    };
    const handleShowEffect = () => {
        setShowEffect(!showEffect);
        setShowFilter(false);
        setShowCrop(false);
    };
    const handleShowCrop = () => {
        setShowCrop(!showCrop);
        setShowFilter(false);
        setShowEffect(false);
    };

    return (
        <View style={styles.bottomBar}>
            <View style={styles.tabView}>
                {showFilter && <FilterList texture={texture} changeFilter={changeFilter} />}
                {showEffect && <EffectList texture={texture} changeFilter={changeFilter} />}
            </View>

            <View style={styles.tab}>
                <TouchableOpacity style={styles.bottomButton} onPress={handleShowFilter}>
                    <Icon name="color-filter-outline" color={showFilter ? "white" : "#858585"} size={25} />
                    <Text style={showFilter ? styles.tabTitleActive : styles.tabTitle}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={handleShowEffect}>
                    <MaterialIcons
                        name="auto-fix-high"
                        color={showEffect ? "white" : "#858585"}
                        type="material"
                        size={25}
                    />
                    <Text style={showEffect ? styles.tabTitleActive : styles.tabTitle}>Effect</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={handleShowCrop}>
                    <MaterialIcons name="crop" color={showCrop ? "white" : "#858585"} type="material" size={25} />
                    <Text style={showCrop ? styles.tabTitleActive : styles.tabTitle}>Crop</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

function EditScreen({ route, navigation }) {
    const { photo } = route.params;
    const [texture, setTexture] = useState(null);
    const [filter, setFilter] = useState(filterType.Normal);

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

    const changeFilter = (filterStr) => {
        setFilter(filterStr);
    };

    let captureImage;

    const saveImage = async () => {
        if (!captureImage) return;

        const result = await captureImage.glView.capture();
        await saveImageToAlbum(result);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {renderTopBar({ navigation, saveImage })}
            <View style={styles.main}>
                {texture ? (
                    <Surface
                        style={{ width: texture.width, height: texture.height }}
                        ref={(ref) => (captureImage = ref)}
                    >
                        {filter === filterType.Amaro && <FilterComponent component={Amaro} photoUri={texture.uri} />}
                        {filter === filterType.Brannan && (
                            <FilterComponent component={Brannan} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Earlybird && (
                            <FilterComponent component={Earlybird} photoUri={texture.uri} />
                        )}
                        {filter === filterType.F1977 && <FilterComponent component={F1977} photoUri={texture.uri} />}
                        {filter === filterType.Hefe && <FilterComponent component={Hefe} photoUri={texture.uri} />}
                        {filter === filterType.Hudson && <FilterComponent component={Hudson} photoUri={texture.uri} />}
                        {filter === filterType.Inkwell && (
                            <FilterComponent component={Inkwell} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Lokofi && <FilterComponent component={Lokofi} photoUri={texture.uri} />}
                        {filter === filterType.LordKelvin && (
                            <FilterComponent component={LordKelvin} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Nashville && (
                            <FilterComponent component={Nashville} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Normal && <FilterComponent component={Normal} photoUri={texture.uri} />}
                        {filter === filterType.Rise && <FilterComponent component={Rise} photoUri={texture.uri} />}
                        {filter === filterType.Sierra && <FilterComponent component={Sierra} photoUri={texture.uri} />}
                        {filter === filterType.Sutro && <FilterComponent component={Sutro} photoUri={texture.uri} />}
                        {filter === filterType.Toaster && (
                            <FilterComponent component={Toaster} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Valencia && (
                            <FilterComponent component={Valencia} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Walden && <FilterComponent component={Walden} photoUri={texture.uri} />}
                        {filter === filterType.XproII && <FilterComponent component={XproII} photoUri={texture.uri} />}
                        {filter === filterType.Temperature && (
                            <FilterComponent component={Temperature} factor={6300} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Hue && (
                            <FilterComponent component={Hue} factor={2} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Negative && (
                            <FilterComponent component={Negative} factor={0.25} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Sharpen && (
                            <FilterComponent component={Sharpen} factor={0.25} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Saturate && (
                            <FilterComponent component={Saturate} factor={2} photoUri={texture.uri} />
                        )}
                        {filter === filterType.Sepia && (
                            <FilterComponent component={Sepia} factor={1.5} photoUri={texture.uri} />
                        )}
                    </Surface>
                ) : (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}
            </View>
            {renderBottomBar({ texture: texture, changeFilter: changeFilter })}
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
