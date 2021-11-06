import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { AutoFocus, CameraType, FlashMode, WhiteBalance } from "expo-camera/build/Camera.types";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const wbOrder = {
    auto: "sunny",
    sunny: "cloudy",
    cloudy: "shadow",
    shadow: "fluorescent",
    fluorescent: "incandescent",
    incandescent: "auto",
};

const wbIcons = {
    auto: "wb-auto",
    sunny: "wb-sunny",
    cloudy: "wb-cloudy",
    shadow: "beach-access",
    fluorescent: "wb-iridescent",
    incandescent: "wb-incandescent",
};

export default function CameraScreen({ navigation }) {
    let camera;
    const [cameraProps, setCameraProps] = useState({
        zoom: 0,
        autoFocus: "on",
        type: CameraType.back,
        depth: 0,
        whiteBalance: "auto",
        faceDetecting: false,
        faces: [],
        permissionsGranted: false,
        pictureSizes: [],
        pictureSizeId: 0,
        showMoreOptions: false,
    });
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [newPhoto, setNewPhoto] = useState(false);

    // Request Camera Permission
    useEffect(() => {
        Camera.requestCameraPermissionsAsync().then(({ status }) => {
            setCameraProps({ ...cameraProps, permission: status, permissionsGranted: status === "granted" });
        });
    }, []);

    const toggleMoreOptions = () =>
        setCameraProps((prevState) => ({ ...prevState, showMoreOptions: !prevState.showMoreOptions }));

    const toggleFacing = () =>
        setCameraProps((prevState) => ({
            ...prevState,
            type: prevState.type === CameraType.back ? CameraType.front : CameraType.back,
        }));

    const toggleFlash = () => {
        if (flashMode === Camera.Constants.FlashMode.torch) {
            setFlashMode(Camera.Constants.FlashMode.off);
        } else if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.torch);
        } else {
            setFlashMode(Camera.Constants.FlashMode.auto);
        }
    };

    const toggleWB = () =>
        setCameraProps((prevState) => ({ ...prevState, whiteBalance: wbOrder[prevState.whiteBalance] }));

    const toggleFocus = () =>
        setCameraProps((prevState) => ({ ...prevState, autoFocus: prevState.autoFocus === "on" ? "off" : "on" }));

    const zoomOut = () =>
        setCameraProps((prevState) => ({ ...prevState, zoom: prevState.zoom - 0.1 < 0 ? 0 : prevState.zoom - 0.1 }));

    const zoomIn = () =>
        setCameraProps((prevState) => ({ ...prevState, zoom: prevState.zoom + 0.1 > 1 ? 1 : prevState.zoom + 0.1 }));

    const setFocusDepth = (depth) => setCameraProps({ ...prevState, depth });

    const toggleFaceDetection = () =>
        setCameraProps((prevState) => ({ ...prevState, faceDetecting: !prevState.faceDetecting }));

    function useMediaLibraryPermissions() {
        const [permissions, setPermissions] = React.useState();

        React.useEffect(() => {
            async function askAsync() {
                const response = await MediaLibrary.requestPermissionsAsync();
                setPermissions(response);
            }

            askAsync();
        }, []);

        return [permissions];
    }

    const ALBUM_NAME = "My Album";
    const [permission] = useMediaLibraryPermissions();
    const takePicture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            //add to album
            if (!permission) return null;

            const asset = await MediaLibrary.createAssetAsync(photo.uri);
            const myAlbum = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
            if (myAlbum) {
                await MediaLibrary.addAssetsToAlbumAsync(asset, myAlbum);
            } else {
                await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
            }
            setNewPhoto(true);
        }
    };

    const handleMountError = ({ message }) => console.error(message);

    const onFacesDetected = ({ faces }) => setCameraProps({ ...cameraProps, faces });

    const renderFaces = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {cameraProps.faces.map(face)}
        </View>
    );

    const renderLandmarks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {cameraProps.faces.map(landmarks)}
        </View>
    );

    const renderNoPermissions = () => (
        <View style={styles.noPermissions}>
            {cameraProps.permissionsGranted && (
                <View>
                    <Text style={{ color: "#4630ec", fontWeight: "bold", textAlign: "center", fontSize: 24 }}>
                        Permission {cameraProps.permissionsGranted.toLowerCase()}!
                    </Text>
                    <Text style={{ color: "#595959", textAlign: "center", fontSize: 20 }}>
                        You'll need to enable the camera permission to continue.
                    </Text>
                </View>
            )}
        </View>
    );

    const renderTopBar = () => (
        <View style={styles.topBar}>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleFacing}>
                <Icon name="camera-reverse-outline" color="#fff" size={32} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleFlash}>
                <Icon
                    name={flashMode === Camera.Constants.FlashMode.off ? "flash-outline" : "flash-off-outline"}
                    color="#fff"
                    size={32}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleWB}>
                <MaterialIcons name={wbIcons[cameraProps.whiteBalance]} size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleFocus}>
                <Text style={[styles.autoFocusLabel, { color: cameraProps.autoFocus === "on" ? "white" : "#6b6b6b" }]}>
                    AF
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderBottomBar = () => (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.bottomButton} onPress={toggleMoreOptions}>
                <Icon name="options-outline" color="#fff" size={30} />
            </TouchableOpacity>
            <View style={{ flex: 0.4 }}>
                <TouchableOpacity onPress={takePicture} style={{ alignSelf: "center" }}>
                    <Icon name="ellipse-outline" color="#fff" size={70} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate("Gallery")}>
                <View>
                    <Icon name="apps-outline" color="#fff" size={30} />
                    {newPhoto && <View style={styles.newPhotosDot} />}
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderMoreOptions = () => (
        <View style={styles.options}>
            <View style={styles.detectors}>
                <TouchableOpacity onPress={toggleFaceDetection}>
                    <MaterialIcons
                        name="tag-faces"
                        color={cameraProps.faceDetecting ? "white" : "#858585"}
                        type="material"
                        size={32}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Icon name="color-filter-outline" color={cameraProps.colorFilter ? "white" : "#858585"} size={32} />
                </TouchableOpacity>
            </View>

            <View style={styles.pictureSizeContainer}>
                <Text style={styles.pictureQualityLabel}>Picture quality</Text>
                <View style={styles.pictureSizeChooser}>
                    <TouchableOpacity onPress={() => {}} style={{ padding: 6 }}>
                        <Icon name="arrow-back-outline" size={14} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.pictureSizeLabel}>
                        <Text style={{ color: "white" }}>{cameraProps.pictureSize}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {}} style={{ padding: 6 }}>
                        <Icon name="arrow-forward-outline" size={14} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderCamera = () => (
        <View style={{ flex: 1 }}>
            <Camera
                ref={(ref) => (camera = ref)}
                style={styles.camera}
                type={cameraProps.type}
                flashMode={flashMode}
                autoFocus={cameraProps.autoFocus}
                zoom={cameraProps.zoom}
                whiteBalance={cameraProps.whiteBalance}
                pictureSize={cameraProps.pictureSize}
                onMountError={handleMountError}
                // onFacesDetected={cameraProps.faceDetecting ? onFacesDetected : undefined}
                // faceDetectorSettings={{
                //     tracking: true,
                // }}
            >
                {renderTopBar()}
                {renderBottomBar()}
            </Camera>
            {cameraProps.faceDetecting && renderFaces()}
            {cameraProps.faceDetecting && renderLandmarks()}
            {cameraProps.showMoreOptions && renderMoreOptions()}
        </View>
    );

    const cameraScreenContent = cameraProps.permissionsGranted ? renderCamera() : renderNoPermissions();
    return <View style={styles.container}>{cameraScreenContent}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    camera: {
        flex: 1,
        justifyContent: "space-between",
    },
    topBar: {
        flex: 0.2,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-around",
        // paddingTop: Constants.statusBarHeight,
    },
    bottomBar: {
        paddingBottom: 5,
        backgroundColor: "transparent",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    noPermissions: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#f8fdff",
    },
    gallery: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    toggleButton: {
        flex: 0.25,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    autoFocusLabel: {
        fontSize: 20,
        fontWeight: "bold",
    },
    bottomButton: {
        flex: 0.3,
        height: 58,
        justifyContent: "center",
        alignItems: "center",
    },
    newPhotosDot: {
        position: "absolute",
        top: 0,
        right: -5,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#4630EB",
    },
    options: {
        position: "absolute",
        bottom: 80,
        left: 30,
        width: 200,
        height: 160,
        backgroundColor: "#000000BA",
        borderRadius: 4,
        padding: 10,
    },
    detectors: {
        flex: 0.5,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    },
    pictureQualityLabel: {
        fontSize: 10,
        marginVertical: 3,
        color: "white",
    },
    pictureSizeContainer: {
        flex: 0.5,
        alignItems: "center",
        paddingTop: 10,
    },
    pictureSizeChooser: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    pictureSizeLabel: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    facesContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    row: {
        flexDirection: "row",
    },
});
