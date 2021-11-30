import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Modal,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { isIphoneX } from "react-native-iphone-x-helper";
import ImageCropOverlay from "../components/Manipulation/ImageCropOverlay";

const { width } = Dimensions.get("window");

export default function CropList({ photo, toggleModal, changePhoto }) {
    let scrollView;
    const [photoUri, setPhotoUri] = useState(photo.uri);
    const [cropMode, setCropMode] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [zoomScale, setZoomScale] = useState(1);
    const [photoBase64, setPhotoBase64] = useState();
    const [scrollOffset, setScrollOffset] = useState(0);
    const [currentPos, setCurrentPos] = useState({
        left: 0,
        top: 0,
    });
    const [currentSize, setCurrentSize] = useState({
        width: 0,
        height: 0,
    });
    const [actualSize, setActualSize] = useState({
        width: photo.width,
        height: photo.height,
    });

    const [cropData, setCropData] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const [distanceY, setDistanceY] = useState(0);
    const changeDistanceY = (val) => {
        setDistanceY(val);
    };
    const changeCropData = (data) => {
        setCropData(data);
    };

    const saveOptions = {
        compress: 1,
        format: "png",
        base64: true,
    };

    // useEffect(() => {
    //     const onConvertImageToEditableSize = async () => {
    //         const { convertedWidth, convertedheight } = onGetCorrectSizes(photo.width, photo.height);
    //         const {
    //             uri,
    //             width: w,
    //             height,
    //         } = await ImageManipulator.manipulateAsync(
    //             photo.uri,
    //             [
    //                 {
    //                     resize: {
    //                         width: convertedWidth,
    //                         height: convertedheight,
    //                     },
    //                 },
    //             ],
    //             saveOptions
    //         );
    //         setPhotoUri(uri);
    //         setActualSize({ width: w, height: height });
    //     };
    //     onConvertImageToEditableSize();
    // }, []);

    // const onGetCorrectSizes = (w, h) => {
    //     const sizes = {
    //         convertedWidth: w,
    //         convertedheight: h,
    //     };
    //     const ratio = Math.min(1920 / w, 1080 / h);
    //     sizes.convertedWidth = Math.round(w * ratio);
    //     sizes.convertedheight = Math.round(h * ratio);
    //     return sizes;
    // };

    const onToggleModal = () => {
        toggleModal();
        setIsVisible(false);
        setCropMode(false);
    };
    const onCropImage = async () => {
        setProcessing(false);
        const cropObj = {
            originX: cropData.x,
            originY: cropData.y - distanceY,
            width: cropData.width,
            height: cropData.height,
        };
        if (cropObj.height > 0 && cropObj.width > 0) {
            const {
                uri: uriCroped,
                base64,
                width: croppedWidth,
                height: croppedHeight,
            } = await crop(cropObj, photoUri);

            setActualSize({ width: croppedWidth, height: croppedHeight });

            setPhotoUri(uriCroped);
            setPhotoBase64(base64);
            setCropMode(false);
            setProcessing(false);
            setZoomScale(1);
        } else {
            setCropMode(false);
            setProcessing(false);
        }
    };

    const onRotateImage = async () => {
        const { uri: rotUri, base64 } = await rotate(photoUri);
        setPhotoUri(rotUri);
        setPhotoBase64(base64);
    };

    const onFlipImage = async (orientation) => {
        const { uri: rotUri, base64 } = await filp(photoUri, orientation);
        setPhotoUri(rotUri);
        setPhotoBase64(base64);
    };

    const onHandleScroll = (event) => {
        setScrollOffset(event.nativeEvent.contentOffset.y);
    };

    const filp = async (uri, orientation) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [
                {
                    flip:
                        orientation === "vertical"
                            ? ImageManipulator.FlipType.Vertical
                            : ImageManipulator.FlipType.Horizontal,
                },
            ],
            saveOptions
        );
        return manipResult;
    };

    const rotate = async (uri) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [
                {
                    rotate: -90,
                },
            ],
            saveOptions
        );
        return manipResult;
    };

    const crop = async (cropObj, uri) => {
        if (cropObj.height > 0 && cropObj.width > 0) {
            const manipResult = await ImageManipulator.manipulateAsync(
                uri,
                [
                    {
                        crop: cropObj,
                    },
                ],
                saveOptions
            );
            return manipResult;
        }
        return {
            uri: null,
            base64: null,
        };
    };

    let originalHeight = Dimensions.get("window").height - 64;
    if (isIphoneX()) {
        originalHeight = Dimensions.get("window").height - 122;
    }

    const [isVisible, setIsVisible] = useState(true);

    // crop
    const [imageBounds, setImageBounds] = useState();
    const [imageScaleFactor, setImageScaleFactor] = useState();
    const [imageLayout, setImageLayout] = useState();

    const getImageFrame = (layout) => {
        onUpdateCropLayout(layout);
    };
    const onUpdateCropLayout = (layout) => {
        // Check layout is not null
        if (layout) {
            // Find the start point of the photo on the screen and its
            // width / height from there
            const editingWindowAspectRatio = layout.height / layout.width;
            //
            const imageAspectRatio = actualSize.height / actualSize.width;
            let bounds = { x: 0, y: 0, width: 0, height: 0 };
            let imageScaleFactor = 1;
            // Check which is larger
            if (imageAspectRatio > editingWindowAspectRatio) {
                // Then x is non-zero, y is zero; calculate x...
                bounds.x = (((imageAspectRatio - editingWindowAspectRatio) / imageAspectRatio) * layout.width) / 2;
                bounds.width = layout.height / imageAspectRatio;
                bounds.height = layout.height;
                imageScaleFactor = actualSize.height / layout.height;
            } else {
                // Then y is non-zero, x is zero; calculate y...
                bounds.y =
                    (((1 / imageAspectRatio - 1 / editingWindowAspectRatio) / (1 / imageAspectRatio)) * layout.height) /
                    2;
                bounds.width = layout.width;
                bounds.height = layout.width * imageAspectRatio;
                imageScaleFactor = actualSize.width / layout.width;
            }
            setImageBounds(bounds);
            setImageScaleFactor(imageScaleFactor);
            setImageLayout({
                height: layout.height,
                width: layout.width,
            });
        }
    };

    React.useEffect(() => {
        onUpdateCropLayout(imageLayout);
    }, [photoUri]);

    return (
        <Modal
            animationType="slide"
            transparent
            visible={isVisible}
            hardwareAccelerated
            onRequestClose={() => {
                onToggleModal();
            }}
        >
            <SafeAreaView style={styles.topbar}>
                <ScrollView
                    scrollEnabled={false}
                    horizontal
                    contentContainerStyle={{
                        width: "100%",
                        paddingHorizontal: 15,
                        height: 50,
                        alignItems: "center",
                    }}
                >
                    {!cropMode ? (
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => onToggleModal()}
                                style={{
                                    width: 32,
                                    height: 32,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon size={24} name="arrow-left" color="white" />
                            </TouchableOpacity>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                                <TouchableOpacity onPress={() => setCropMode(true)} style={styles.button}>
                                    <Icon size={20} name="crop" color="white" />
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => onRotateImage()} style={styles.button}>
                                        <Icon size={20} name="rotate-left" color="white" />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => onFlipImage("vertical")} style={styles.button}>
                                        <MaterialIcon
                                            style={{ transform: [{ rotate: "270deg" }] }}
                                            size={20}
                                            name="flip"
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onFlipImage("horizontal")} style={styles.button}>
                                        <MaterialIcon size={20} name="flip" color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // ChangePhoto
                                            onPictureChoosed({ uri, base64 });
                                            toggleModal();
                                        }}
                                        style={{
                                            marginLeft: 10,
                                            width: 60,
                                            height: 32,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ fontWeight: "500", color: "white", fontSize: 18 }}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => setCropMode(false)} style={styles.button}>
                                <Icon size={24} name="arrow-left" color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => onCropImage()}
                                style={{
                                    marginRight: 10,
                                    alignItems: "flex-end",
                                    flex: 1,
                                }}
                            >
                                <Text style={{ fontWeight: "500", color: "white", fontSize: 18 }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
            <View style={{ flex: 1, backgroundColor: "black", width: Dimensions.get("window").width }}>
                <ScrollView
                    style={{ position: "relative", flex: 1 }}
                    contentContainerStyle={{ backgroundColor: "black" }}
                    maximumZoomScale={5}
                    minimumZoomScale={0.5}
                    onScroll={onHandleScroll}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ref={(c) => {
                        scrollView = c;
                    }}
                    scrollEventThrottle={16}
                    scrollEnabled={false}
                    pinchGestureEnabled={false}
                    // scrollEnabled={cropMode ? false : true}
                    // pinchGestureEnabled={cropMode ? false : pinchGestureEnabled}
                >
                    <Image
                        source={{ uri: photoUri }}
                        style={{ width: actualSize.width, height: actualSize.height, resizeMode: "contain" }}
                        onLayout={({ nativeEvent }) => getImageFrame(nativeEvent.layout)}
                    />
                    {cropMode && (
                        <ImageCropOverlay
                            photo={photo}
                            photoBounds={imageBounds}
                            setCropData={changeCropData}
                            setDistanceY={changeDistanceY}
                        />
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topbar: {
        width,
        flexDirection: "row",
        backgroundColor: "black",
        justifyContent: "space-between",
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
        marginLeft: 10,
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
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
