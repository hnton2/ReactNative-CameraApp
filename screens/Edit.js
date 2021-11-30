import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { Surface } from "gl-react-expo";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import "webgltexture-loader-expo-camera";
import CropList from "../components/CropList";
import EffectList from "../components/EffectList";
import FilterComponent from "../components/Filter";
import FilterList from "../components/FilterList";
import defaultEffect from "../constants/defaultEffect";
import filterType from "../constants/filterType";
import Amaro from "../filters/Amaro";
import Brannan from "../filters/Brannan";
import Earlybird from "../filters/Earlybird";
import F1977 from "../filters/F1977";
import Hefe from "../filters/Hefe";
import Hudson from "../filters/Hudson";
import Hue from "../filters/Hue";
import Inkwell from "../filters/Inkwell";
import Instagram from "../filters/Instargram";
import Lokofi from "../filters/Lokofi";
import LordKelvin from "../filters/LordKelvin";
import Nashville from "../filters/Nashville";
import Negative from "../filters/Negative";
import Normal from "../filters/Normal";
import Rise from "../filters/Rise";
import Saturate from "../filters/Saturate";
import Sepia from "../filters/Sepia";
import Sharpen from "../filters/Sharpen";
import Sierra from "../filters/Sierra";
import Sutro from "../filters/Sutro";
import Temperature from "../filters/Temperature";
import Toaster from "../filters/Toaster";
import Valencia from "../filters/Valencia";
import Walden from "../filters/Walden";
import XproII from "../filters/XproII";
import Colorify from "../filters/ColorScale";

import { saveImageToAlbum } from "../helpers/Library";
import Blur from "../filters/Blur";

const { width, height } = Dimensions.get("window");
const FILTER = "FILTER",
    EFFECT = "EFFECT",
    CROP = "CROP";

const renderTopBar = ({ navigation, savePhoto }) => (
    <View style={styles.topBar}>
        <TouchableOpacity style={styles.toggleButton} onPress={() => navigation.goBack()}>
            <Text style={styles.whiteText}>
                <MaterialIcons name="arrow-back" color="white" type="material" size={24} />
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={savePhoto}>
            <Text style={styles.whiteText}>Save</Text>
        </TouchableOpacity>
    </View>
);

const renderBottomBar = ({ photo, changeFilter, effectState, changeEffect, onResetEffect }) => {
    const [type, setType] = useState("");

    return (
        <View style={styles.bottomBar}>
            <View style={styles.tabView}>
                {type === FILTER && <FilterList photo={photo} changeFilter={changeFilter} />}
                {type === EFFECT && (
                    <EffectList
                        changeFilter={changeFilter}
                        effectState={effectState}
                        changeEffect={changeEffect}
                        onResetEffect={onResetEffect}
                    />
                )}
                {type === CROP && <CropList photo={photo} />}
            </View>

            <View style={styles.tab}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setType(FILTER)}>
                    <Icon name="color-filter-outline" color={type === FILTER ? "white" : "#858585"} size={25} />
                    <Text style={type === FILTER ? styles.tabTitleActive : styles.tabTitle}>{FILTER}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setType(EFFECT)}>
                    <MaterialIcons
                        name="auto-fix-high"
                        color={type === EFFECT ? "white" : "#858585"}
                        type="material"
                        size={25}
                    />
                    <Text style={type === EFFECT ? styles.tabTitleActive : styles.tabTitle}>{EFFECT}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setType(CROP)}>
                    <MaterialIcons name="crop" color={type === CROP ? "white" : "#858585"} type="material" size={25} />
                    <Text style={type === CROP ? styles.tabTitleActive : styles.tabTitle}>{CROP}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

function EditScreen({ route, navigation }) {
    let capturePhoto;

    const { originalPhoto } = route.params;
    console.log(originalPhoto);
    const [photo, setPhoto] = useState(null);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    // format image for filter
    useEffect(() => {
        const loadAsync = async () => {
            await FileSystem.copyAsync({
                from: `${originalPhoto.uri}/${originalPhoto.filename}`,
                to: FileSystem.documentDirectory + originalPhoto.filename,
            });

            const imageResult = await ImageManipulator.manipulateAsync(
                FileSystem.documentDirectory + originalPhoto.filename,
                [{ resize: { width: 345 } }],
                { compress: 1, format: "png" }
            );
            setPhoto(imageResult);
            setCurrentPhoto(imageResult);
        };
        loadAsync();
    }, []);
    console.log(photo);

    // Type of edit
    const [type, setType] = useState("");
    const toggleModal = () => setType("");

    const [filter, setFilter] = useState(filterType.Normal);
    const changeFilter = (filterStr) => {
        setFilter(filterStr);
    };
    const [effect, setEffect] = useState({
        saturation: defaultEffect.saturation,
        brightness: defaultEffect.brightness,
        contrast: defaultEffect.contrast,
        hue: defaultEffect.hue,
        sepia: defaultEffect.sepia,
        gray: defaultEffect.gray,
        temperature: defaultEffect.temperature,
        sharpen: defaultEffect.sharpen,
        blur: defaultEffect.blur,
        mixFactor: defaultEffect.mixFactor,
    });

    const changeEffect = (name, value) => {
        setEffect((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const savePhoto = async () => {
        if (!capturePhoto) return;

        const result = await capturePhoto.glView.capture();
        await saveImageToAlbum(result);
        navigation.goBack();
    };

    // get template image when edit
    useEffect(() => {
        const getCurrentPhoto = async () => {
            if (!capturePhoto) return;
            const result = await capturePhoto.glView.capture();
            setCurrentPhoto(result);
        };
        getCurrentPhoto();
    }, [filter]);
    const changeCurrentPhoto = (p) => {
        setCurrentPhoto(p);
    };

    return (
        <View style={styles.container}>
            {renderTopBar({ navigation, savePhoto })}
            <View style={styles.main}>
                {photo ? (
                    <Surface style={{ width: photo.width, height: photo.height }} ref={(ref) => (capturePhoto = ref)}>
                        {filter === filterType.Amaro && <FilterComponent component={Amaro} photoUri={photo.uri} />}
                        {filter === filterType.Brannan && <FilterComponent component={Brannan} photoUri={photo.uri} />}
                        {filter === filterType.Earlybird && (
                            <FilterComponent component={Earlybird} photoUri={photo.uri} />
                        )}
                        {filter === filterType.F1977 && <FilterComponent component={F1977} photoUri={photo.uri} />}
                        {filter === filterType.Hefe && <FilterComponent component={Hefe} photoUri={photo.uri} />}
                        {filter === filterType.Hudson && <FilterComponent component={Hudson} photoUri={photo.uri} />}
                        {filter === filterType.Inkwell && <FilterComponent component={Inkwell} photoUri={photo.uri} />}
                        {filter === filterType.Lokofi && <FilterComponent component={Lokofi} photoUri={photo.uri} />}
                        {filter === filterType.LordKelvin && (
                            <FilterComponent component={LordKelvin} photoUri={photo.uri} />
                        )}
                        {filter === filterType.Nashville && (
                            <FilterComponent component={Nashville} photoUri={photo.uri} />
                        )}
                        {filter === filterType.Normal && <FilterComponent component={Normal} photoUri={photo.uri} />}
                        {filter === filterType.Rise && <FilterComponent component={Rise} photoUri={photo.uri} />}
                        {filter === filterType.Sierra && <FilterComponent component={Sierra} photoUri={photo.uri} />}
                        {filter === filterType.Sutro && <FilterComponent component={Sutro} photoUri={photo.uri} />}
                        {filter === filterType.Toaster && <FilterComponent component={Toaster} photoUri={photo.uri} />}
                        {filter === filterType.Valencia && (
                            <FilterComponent component={Valencia} photoUri={photo.uri} />
                        )}
                        {filter === filterType.Walden && <FilterComponent component={Walden} photoUri={photo.uri} />}
                        {filter === filterType.XproII && <FilterComponent component={XproII} photoUri={photo.uri} />}
                        {filter === filterType.Temperature && (
                            <FilterComponent component={Temperature} factor={6300} photoUri={photo.uri} />
                        )}
                        {filter === filterType.Hue && (
                            <FilterComponent component={Hue} factor={2} photoUri={photo.uri} />
                        )}
                        {filter === filterType.Negative && (
                            <FilterComponent component={Negative} factor={0.25} photoUri={photo.uri} />
                        )}
                        {filter === filterType.Sharpen && (
                            <FilterComponent component={Sharpen} factor={0.25} photoUri={photo.uri} />
                        )}
                        {filter === filterType.Saturate && (
                            <FilterComponent component={Saturate} factor={2} photoUri={photo.uri} />
                        )}
                        {filter === filterType.Sepia && (
                            <FilterComponent component={Sepia} factor={1.5} photoUri={photo.uri} />
                        )}
                        {filter === "effectMode" && (
                            <Instagram {...effect}>
                                <Blur factor={effect.blur}>
                                    <Sharpen factor={effect.sharpen} width={photo.width} height={photo.height}>
                                        <Temperature factor={effect.temperature}>
                                            {{ uri: currentPhoto.uri }}
                                        </Temperature>
                                    </Sharpen>
                                </Blur>
                            </Instagram>
                        )}
                        {/* cropMode image when choose filter or effect */}
                        {/* {filter === "cropMode" && <FilterComponent component={Normal} photoUri={currentImg.uri} />} */}
                    </Surface>
                ) : (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}
            </View>

            {/* Bottom bar */}
            <View style={styles.bottomBar}>
                <View style={styles.tabView}>
                    {type === FILTER && <FilterList photo={photo} changeFilter={changeFilter} />}
                    {type === EFFECT && (
                        <EffectList changeFilter={changeFilter} effectState={effect} changeEffect={changeEffect} />
                    )}
                    {type === CROP && (
                        <CropList photo={currentPhoto} toggleModal={toggleModal} changePhoto={changeCurrentPhoto} />
                    )}
                </View>

                <View style={styles.tab}>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => setType(FILTER)}>
                        <Icon name="color-filter-outline" color={type === FILTER ? "white" : "#858585"} size={25} />
                        <Text style={type === FILTER ? styles.tabTitleActive : styles.tabTitle}>{FILTER}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => setType(EFFECT)}>
                        <MaterialIcons
                            name="auto-fix-high"
                            color={type === EFFECT ? "white" : "#858585"}
                            type="material"
                            size={25}
                        />
                        <Text style={type === EFFECT ? styles.tabTitleActive : styles.tabTitle}>{EFFECT}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => setType(CROP)}>
                        <MaterialIcons
                            name="crop"
                            color={type === CROP ? "white" : "#858585"}
                            type="material"
                            size={25}
                        />
                        <Text style={type === CROP ? styles.tabTitleActive : styles.tabTitle}>{CROP}</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        fontSize: 11,
    },
    tabTitleActive: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "bold",
    },
    tabView: {
        flex: 3,
    },
});
