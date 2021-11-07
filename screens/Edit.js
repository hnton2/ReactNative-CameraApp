import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import FilterList from "./FilterList";
import EffectList from "./EffectList";

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

const renderBottomBar = ({ texture, changePhoto }) => {
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
                {showFilter && <FilterList texture={texture} changePhoto={changePhoto} />}
                {showEffect && <EffectList texture={texture} changePhoto={changePhoto} />}
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

    const changePhoto = (photo) => {
        setTexture(photo);
    };

    return (
        <View style={styles.container}>
            {renderTopBar(navigation)}
            <View style={styles.main}>
                {texture ? (
                    <Image source={{ uri: texture.uri }} style={{ width: texture.width, height: texture.height }} />
                ) : (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}
            </View>
            {renderBottomBar({ texture: texture, changePhoto: changePhoto })}
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
