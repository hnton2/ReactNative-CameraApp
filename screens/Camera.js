import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { AutoFocus, CameraType, FlashMode, WhiteBalance } from "expo-camera/build/Camera.types";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as FaceDetector from "expo-face-detector";
import { GLSL, Node, Shaders } from "gl-react";
import defaultEffect from "../constants/defaultEffect";
import { Surface } from "gl-react-expo";
import Instagram from "../filters/Instargram";
import EffectList from "../components/EffectList";
import { saveImageToAlbum } from "../helpers/Library";

const shaders = Shaders.create({
    YFlip: {
        // NB we need to YFlip the stream
        frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform sampler2D t;
        void main(){
        gl_FragColor=texture2D(t, vec2(1.0-uv.x, 1.0 - uv.y));
        }`,
    },
});

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
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [autoFocus, setAutoFocus] = useState("on");
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [whiteBalance, setWhiteBalance] = useState("auto");
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [newPhoto, setNewPhoto] = useState(false);
    const [faceDetecting, setFaceDetecting] = useState(false);
    const [faces, setFaces] = useState([]);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [showEffect, setShowEffect] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [effect, setEffect] = useState({
        saturation: defaultEffect.saturation,
        brightness: defaultEffect.brightness,
        contrast: defaultEffect.contrast,
        hue: defaultEffect.hue,
        sepia: defaultEffect.sepia,
        gray: defaultEffect.gray,
        mixFactor: defaultEffect.mixFactor,
    });
    const [raf, setRaf] = useState(null);

    // handle camera error
    const handleMountError = ({ message }) => console.error(message);

    // init GL camera
    const onCameraRef = (camera) => {
        setCamera(camera);
    };
    useEffect(() => {
        const loop = () => {
            setRaf(requestAnimationFrame(loop));
        };
        setRaf(requestAnimationFrame(loop));
        return () => {
            cancelAnimationFrame(raf);
        };
    }, []);

    const onResetEffect = (effectName) => {
        setEffect((prevState) => ({ ...prevState, [effectName]: defaultEffect[effectName] }));
    };
    const changeEffect = (name, value) => {
        setEffect((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Request Camera Permission
    useEffect(() => {
        Camera.requestCameraPermissionsAsync().then(({ status }) => {
            setPermissionGranted("granted");
        });
    }, []);

    // save image in library
    function useMediaLibraryPermissions() {
        const [permissions, setPermissions] = useState();

        useEffect(() => {
            async function askAsync() {
                const response = await MediaLibrary.requestPermissionsAsync();
                setPermissions(response);
            }

            askAsync();
        }, []);

        return [permissions];
    }
    const [permission] = useMediaLibraryPermissions();
    let captureImage;
    const takePicture = async () => {
        if (captureImage) {
            const photo = await captureImage.glView.capture();
            //add to album
            if (!permission) return null;
            saveImageToAlbum(photo);
            setNewPhoto(true);
        }
    };

    // toggle button
    const toggleMoreOptions = () => setShowMoreOptions(!showMoreOptions);
    const toggleFacing = () => setType(type === CameraType.back ? CameraType.front : CameraType.back);

    const toggleFlash = () => {
        if (flashMode === Camera.Constants.FlashMode.torch) {
            setFlashMode(Camera.Constants.FlashMode.off);
        } else if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.torch);
        } else {
            setFlashMode(Camera.Constants.FlashMode.auto);
        }
    };

    const toggleWB = () => setWhiteBalance(wbOrder[whiteBalance]);

    const toggleFocus = () => setAutoFocus(autoFocus === "on" ? "off" : "on");

    const toggleFaceDetection = () => setFaceDetecting(!faceDetecting);

    const toggleShowEffect = () => {
        setShowEffect(!showEffect);
        setShowMoreOptions(false);
    };

    // face detection
    const handleOnFacesDetected = ({ faces }) => {
        setFaces(faces);
    };
    function renderFace({ bounds, faceID, rollAngle, yawAngle, smilingProbability, leftEarPosition }) {
        return (
            <View
                key={faceID}
                transform={[
                    { perspective: 600 },
                    { rotateZ: `${rollAngle.toFixed(0)}deg` },
                    { rotateY: `${yawAngle.toFixed(0)}deg` },
                ]}
                style={[
                    styles.face,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}
            >
                <Text style={styles.faceText}>ID: {faceID}</Text>
                <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
                <Text style={styles.faceText}>yawAngle: {yawAngle}</Text>
                <Text style={styles.faceText}>leftEarPosition: {leftEarPosition}</Text>
                <Text style={styles.faceText}>smilingProbability: {smilingProbability}</Text>
            </View>
        );
    }

    function renderLandmarksOfFace(face) {
        const renderLandmark = (position) =>
            position && (
                <View
                    style={[
                        styles.landmark,
                        {
                            left: position.x - landmarkSize / 2,
                            top: position.y - landmarkSize / 2,
                        },
                    ]}
                />
            );
        return (
            <View key={`landmarks-${face.faceID}`}>
                {renderLandmark(face.leftEyePosition)}
                {renderLandmark(face.rightEyePosition)}
                {renderLandmark(face.leftEarPosition)}
                {renderLandmark(face.rightEarPosition)}
                {renderLandmark(face.leftCheekPosition)}
                {renderLandmark(face.rightCheekPosition)}
                {renderLandmark(face.leftMouthPosition)}
                {renderLandmark(face.mouthPosition)}
                {renderLandmark(face.rightMouthPosition)}
                {renderLandmark(face.noseBasePosition)}
                {renderLandmark(face.bottomMouthPosition)}
            </View>
        );
    }

    const renderFaces = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {faces.map(renderFace)}
        </View>
    );

    const renderLandmarks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {faces.map(renderLandmarksOfFace)}
        </View>
    );

    // mini component
    const renderNoPermissions = () => (
        <View style={styles.noPermissions}>
            {!permissionGranted && (
                <View>
                    <Text style={{ color: "#4630ec", fontWeight: "bold", textAlign: "center", fontSize: 24 }}>
                        Permission {permissionGranted.toLowerCase()}!
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
                <MaterialIcons name={wbIcons[whiteBalance]} size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleFocus}>
                <Text style={[styles.autoFocusLabel, { color: autoFocus === "on" ? "white" : "#6b6b6b" }]}>AF</Text>
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
                        color={faceDetecting ? "white" : "#858585"}
                        type="material"
                        size={32}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleShowEffect}>
                    <MaterialIcons name="auto-fix-high" color={showEffect ? "white" : "#858585"} size={32} />
                </TouchableOpacity>
            </View>

            <View style={styles.pictureSizeContainer}>
                <Text style={styles.pictureQualityLabel}>Picture quality</Text>
                <View style={styles.pictureSizeChooser}>
                    <TouchableOpacity onPress={() => {}} style={{ padding: 6 }}>
                        <Icon name="arrow-back-outline" size={14} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.pictureSizeLabel}>
                        <Text style={{ color: "white" }}>11111</Text>
                    </View>
                    <TouchableOpacity onPress={() => {}} style={{ padding: 6 }}>
                        <Icon name="arrow-forward-outline" size={14} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderTopBar()}
            <View style={{ flex: 1 }}>
                <Surface ref={(ref) => (captureImage = ref)} style={styles.surface}>
                    <Instagram {...effect}>
                        <Node
                            blendFunc={{ src: "one", dst: "one minus src alpha" }}
                            shader={shaders.YFlip}
                            uniforms={{
                                t: () => camera,
                            }}
                        >
                            <Camera
                                ref={onCameraRef}
                                style={styles.camera}
                                type={type}
                                flashMode={flashMode}
                                autoFocus={autoFocus}
                                whiteBalance={whiteBalance}
                                onMountError={handleMountError}
                                onFacesDetected={faceDetecting ? handleOnFacesDetected : undefined}
                                faceDetectorSettings={{
                                    tracking: true,
                                }}
                            />
                        </Node>
                    </Instagram>
                </Surface>

                {faceDetecting && renderFaces()}
                {faceDetecting && renderLandmarks()}
                {showMoreOptions && renderMoreOptions()}
            </View>
            {showEffect && (
                <View style={{ height: 80, marginBottom: 10 }}>
                    <EffectList effectState={effect} changeEffect={changeEffect} onResetEffect={onResetEffect} />
                </View>
            )}
            {renderBottomBar()}
            {/* const cameraScreenContent = cameraProps.permissionsGranted ? renderCamera() : renderNoPermissions(); */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        position: "relative",
    },
    surface: {
        width: 380,
        height: 580,
    },
    camera: {
        flex: 1,
        justifyContent: "space-between",
    },
    topBar: {
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-around",
        // paddingTop: Constants.statusBarHeight,
    },
    bottomBar: {
        // paddingBottom: 5,
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
        bottom: 20,
        left: 10,
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
    facesContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: "absolute",
        borderColor: "#FFD700",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    landmark: {
        width: 2,
        height: 2,
        position: "absolute",
        backgroundColor: "red",
    },
    faceText: {
        color: "#FFD700",
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        backgroundColor: "transparent",
    },
});
