// import React, { Component, useRef, useState } from "react";
// import { View, PanResponder, Dimensions, StyleSheet } from "react-native";

// export default function ImageCropOverlay(props) {
//     const cropRef = useRef();

//     const width = props.initialWidth;
//     const height = props.initialHeight;
//     const boundary = 100;
//     const widthBoundary = width - boundary;
//     const heightBoundary = height - boundary;

//     const [lastLeft, setLastLeft] = useState(0);
//     const [lastRight, setLastRight] = useState(0);
//     const [lastTop, setLastTop] = useState(0);
//     const [lastBottom, setLastBottom] = useState(0);

//     const [position, setPosition] = useState({
//         position: "absolute",
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//     });

//     const setLeft = (left) => {
//         if (left <= 0) {
//             setPosition((prev) => ({ ...prev, left: 0 }));
//         } else if (left >= widthBoundary - position.right) {
//             setPosition((prev) => ({ ...prev, left: widthBoundary - position.right }));
//         } else {
//             setPosition((prev) => ({ ...prev, left: left }));
//         }
//     };
//     const setRight = (right) => {
//         if (right >= 0) {
//             setPosition((prev) => ({ ...prev, right: 0 }));
//         } else if (-right >= widthBoundary - position.left) {
//             setPosition((prev) => ({ ...prev, right: widthBoundary - position.left }));
//         } else {
//             setPosition((prev) => ({ ...prev, right: -right }));
//         }
//     };
//     const setTop = (top) => {
//         if (top <= 0) {
//             setPosition((prev) => ({ ...prev, top: 0 }));
//         } else if (top >= heightBoundary - position.bottom) {
//             setPosition((prev) => ({ ...prev, top: heightBoundary - position.bottom }));
//         } else {
//             setPosition((prev) => ({ ...prev, top: top }));
//         }
//     };
//     const setBottom = (bottom) => {
//         if (bottom >= 0) {
//             setPosition((prev) => ({ ...prev, bottom: 0 }));
//         } else if (-bottom >= heightBoundary - position.top) {
//             setPosition((prev) => ({ ...prev, bottom: heightBoundary - position.top }));
//         } else {
//             setPosition((prev) => ({ ...prev, bottom: -bottom }));
//         }
//     };
//     // TOP LEFT
//     const topLeftResponder = useRef(
//         PanResponder.create({
//             onMoveShouldSetPanResponder: () => true,
//             onMoveShouldSetPanResponderCapture: () => true,
//             onPanResponderMove: (e, gestureState) => {
//                 console.log(gestureState);
//                 const { dx, dy } = gestureState;
//                 const left = lastLeft + dx;
//                 const top = lastTop + dy;
//                 setLeft(left);
//                 setTop(top);
//                 // cropRef.current.setNativeProps({ style: this.position });
//             },
//             onPanResponderRelease: (e, gestureState) => {
//                 // lastLeft += gestureState.dx;
//                 // lastTop += gestureState.dy;
//                 setLastLeft(lastLeft + gestureState.dx);
//                 setLastTop(lastTop + gestureState.dy);
//             },
//             onPanResponderTerminate: (e, gestureState) => {
//                 setLastLeft(lastLeft + gestureState.dx);
//                 setLastTop(lastTop + gestureState.dy);
//             },
//         })
//     );

//     // TOP RIGHT
//     const topRightResponder = useRef(
//         PanResponder.create({
//             onMoveShouldSetPanResponder: () => true,
//             onMoveShouldSetPanResponderCapture: () => true,
//             onPanResponderMove: (e, gestureState) => {
//                 const { dx, dy } = gestureState;
//                 const right = lastRight + dx;
//                 const top = lastTop + dy;
//                 setRight(right);
//                 setTop(top);
//                 // cropRef.current.setNativeProps({ style: this.position });
//             },
//             onPanResponderRelease: (e, gestureState) => {
//                 setLastRight(lastRight + gestureState.dx);
//                 setLastTop(lastTop + gestureState.dy);
//             },
//             onPanResponderTerminate: (e, gestureState) => {
//                 setLastRight(lastRight + gestureState.dx);
//                 setLastTop(lastTop + gestureState.dy);
//             },
//         })
//     );

//     // BOTTOM LEFT
//     const bottomLeftResponder = useRef(
//         PanResponder.create({
//             onMoveShouldSetPanResponder: () => true,
//             onMoveShouldSetPanResponderCapture: () => true,
//             onPanResponderMove: (e, gestureState) => {
//                 console.log("object");
//                 const { dx, dy } = gestureState;
//                 const left = lastLeft + dx;
//                 const bottom = lastBottom + dy;
//                 setLeft(left);
//                 setBottom(bottom);
//                 // cropRef.current.setNativeProps({ style: this.position });
//             },
//             onPanResponderRelease: (e, gestureState) => {
//                 setLastLeft(lastLeft + gestureState.dx);
//                 setLastBottom(lastBottom + gestureState.dy);
//             },
//             onPanResponderTerminate: (e, gestureState) => {
//                 setLastLeft(lastLeft + gestureState.dx);
//                 setLastBottom(lastBottom + gestureState.dy);
//             },
//         })
//     ).current;

//     // BOTTOM RIGHT
//     const bottomRightResponder = useRef(
//         PanResponder.create({
//             onMoveShouldSetPanResponder: () => {
//                 console.log("start");
//                 return true;
//             },
//             onMoveShouldSetPanResponderCapture: () => true,
//             onPanResponderMove: (e, gestureState) => {
//                 const { dx, dy } = gestureState;
//                 const right = lastRight + dx;
//                 const bottom = lastBottom + dy;
//                 setRight(right);
//                 setBottom(bottom);
//                 // cropRef.current.setNativeProps({ style: this.position });
//             },
//             onPanResponderRelease: (e, gestureState) => {
//                 setLastRight(lastRight + gestureState.dx);
//                 setLastBottom(lastBottom + gestureState.dy);
//             },
//             onPanResponderTerminate: (e, gestureState) => {
//                 setLastRight(lastRight + gestureState.dx);
//                 setLastBottom(lastBottom + gestureState.dy);
//             },
//         })
//     );
//     console.log(position);

//     return (
//         <View style={styles.wrapper}>
//             <View style={styles.topLeft} {...topLeftResponder.panHandlers} />
//             <View style={styles.topRight} {...topRightResponder.panHandlers} />
//             <View style={styles.bottomLeft} {...bottomLeftResponder.panHandlers} />
//             <View style={styles.bottomRight} {...bottomRightResponder.panHandlers} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//     },
//     wrapper: {
//         position: "absolute",
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//     },
//     topLeft: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: 15,
//         height: 15,
//         borderRadius: 7.5,
//         backgroundColor: "#fff",
//     },
//     topRight: {
//         position: "absolute",
//         top: 0,
//         right: 0,
//         width: 15,
//         height: 15,
//         borderRadius: 7.5,
//         backgroundColor: "#fff",
//     },
//     bottomLeft: {
//         position: "absolute",
//         bottom: 0,
//         left: 10,
//         width: 30,
//         height: 30,
//         borderRadius: 7.5,
//         backgroundColor: "#fff",
//     },
//     bottomRight: {
//         position: "absolute",
//         bottom: 0,
//         right: 0,
//         width: 15,
//         height: 15,
//         borderRadius: 7.5,
//         backgroundColor: "#fff",
//     },
// });

// import React, { Component } from "react";
// import { View, PanResponder, Dimensions } from "react-native";

// class ImageCropOverlay extends React.Component {
//     state = {
//         draggingTL: false,
//         draggingTM: false,
//         draggingTR: false,
//         draggingML: false,
//         draggingMM: false,
//         draggingMR: false,
//         draggingBL: false,
//         draggingBM: false,
//         draggingBR: false,
//         initialTop: this.props.initialTop,
//         initialLeft: this.props.initialLeft,
//         initialWidth: this.props.initialWidth,
//         initialHeight: this.props.initialHeight,
//         ratio: this.props.ratio,

//         offsetTop: 0,
//         offsetLeft: 0,
//     };

//     panResponder = {};

//     UNSAFE_componentWillMount() {
//         this.panResponder = PanResponder.create({
//             onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
//             onPanResponderGrant: this.handlePanResponderGrant,
//             onPanResponderMove: this.handlePanResponderMove,
//             onPanResponderRelease: this.handlePanResponderEnd,
//             onPanResponderTerminate: this.handlePanResponderEnd,
//         });
//     }

//     render() {
//         const {
//             draggingTL,
//             draggingTM,
//             draggingTR,
//             draggingML,
//             draggingMM,
//             draggingMR,
//             draggingBL,
//             draggingBM,
//             draggingBR,
//             initialTop,
//             initialLeft,
//             initialHeight,
//             initialWidth,
//             offsetTop,
//             offsetLeft,
//             ratio,
//         } = this.state;
//         const style = {};

//         style.top = initialTop + (draggingTL || draggingTM || draggingTR || draggingMM ? offsetTop : 0);
//         style.left = initialLeft + (draggingTL || draggingML || draggingBL || draggingMM ? offsetLeft : 0);
//         style.width =
//             initialWidth +
//             (draggingTL || draggingML || draggingBL
//                 ? -offsetLeft
//                 : draggingTM || draggingMM || draggingBM
//                 ? 0
//                 : offsetLeft);
//         style.height =
//             initialHeight +
//             (draggingTL || draggingTM || draggingTR
//                 ? -offsetTop
//                 : draggingML || draggingMM || draggingMR
//                 ? 0
//                 : offsetTop);

//         //If ratio specified, modify width and height to maintain ratio
//         if (ratio && ratio.height && ratio.width) {
//             if (style.width * ratio.width > style.height * ratio.height) {
//                 style.height = style.width * (ratio.height / ratio.width);
//             }
//             if (style.height * ratio.height > style.width * ratio.width) {
//                 style.width = style.height * (ratio.width / ratio.height);
//             }
//         }

//         if (style.width > this.props.initialWidth) {
//             style.width = this.props.initialWidth;
//         }
//         if (style.width < this.props.minWidth) {
//             style.width = this.props.minWidth;
//         }
//         if (style.height > this.props.initialHeight) {
//             style.height = this.props.initialHeight;
//         }
//         if (style.height < this.props.minHeight) {
//             style.height = this.props.minHeight;
//         }
//         const { borderColor } = this.props;
//         return (
//             <View
//                 {...this.panResponder.panHandlers}
//                 style={[
//                     {
//                         flex: 1,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         position: "absolute",
//                         borderStyle: "solid",
//                         borderWidth: 2,
//                         borderColor,
//                         backgroundColor: "rgb(0,0,0,0.5)",
//                     },
//                     style,
//                 ]}
//             >
//                 <View
//                     style={{
//                         flexDirection: "row",
//                         width: "100%",
//                         flex: 1 / 3,
//                         backgroundColor: "transparent",
//                     }}
//                 >
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingTL ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingTM ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingTR ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                 </View>
//                 <View
//                     style={{
//                         flexDirection: "row",
//                         width: "100%",
//                         flex: 1 / 3,
//                         backgroundColor: "transparent",
//                     }}
//                 >
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingML ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingMM ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingMR ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                 </View>
//                 <View
//                     style={{
//                         flexDirection: "row",
//                         width: "100%",
//                         flex: 1 / 3,
//                         backgroundColor: "transparent",
//                     }}
//                 >
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingBL ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingBM ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                     <View
//                         style={{
//                             borderColor,
//                             borderWidth: 0,
//                             backgroundColor: draggingBR ? "transparent" : "transparent",
//                             flex: 1 / 3,
//                             height: "100%",
//                         }}
//                     />
//                 </View>
//                 <View
//                     style={{
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         position: "absolute",
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                     }}
//                 >
//                     <View style={{ flex: 1 / 3, flexDirection: "row" }}>
//                         <View
//                             style={{
//                                 flex: 3,
//                                 borderRightWidth: 1,
//                                 borderBottomWidth: 1,
//                                 borderColor: "#c9c9c9",
//                                 borderStyle: "solid",
//                             }}
//                         >
//                             <View
//                                 style={{
//                                     position: "absolute",
//                                     left: 5,
//                                     top: 5,
//                                     borderLeftWidth: 2,
//                                     borderTopWidth: 2,
//                                     height: 48,
//                                     width: 48,
//                                     borderColor: "#f4f4f4",
//                                     borderStyle: "solid",
//                                 }}
//                             />
//                         </View>
//                         <View
//                             style={{
//                                 flex: 3,
//                                 borderRightWidth: 1,
//                                 borderBottomWidth: 1,
//                                 borderColor: "#c9c9c9",
//                                 borderStyle: "solid",
//                             }}
//                         />
//                         <View
//                             style={{
//                                 flex: 3,
//                                 borderBottomWidth: 1,
//                                 borderColor: "#c9c9c9",
//                                 borderStyle: "solid",
//                             }}
//                         >
//                             <View
//                                 style={{
//                                     position: "absolute",
//                                     right: 5,
//                                     top: 5,
//                                     borderRightWidth: 2,
//                                     borderTopWidth: 2,
//                                     height: 48,
//                                     width: 48,
//                                     borderColor: "#f4f4f4",
//                                     borderStyle: "solid",
//                                 }}
//                             />
//                         </View>
//                     </View>
//                     <View style={{ flex: 1 / 3, flexDirection: "row" }}>
//                         <View
//                             style={{
//                                 flex: 3,
//                                 borderRightWidth: 1,
//                                 borderBottomWidth: 1,
//                                 borderColor: "#c9c9c9",
//                                 borderStyle: "solid",
//                             }}
//                         />
//                         <View
//                             style={{
//                                 flex: 3,
//                                 borderRightWidth: 1,
//                                 borderBottomWidth: 1,
//                                 borderColor: "#c9c9c9",
//                                 borderStyle: "solid",
//                             }}
//                         />
//                         <View
//                             style={{
//                                 flex: 3,
//                                 borderBottomWidth: 1,
//                                 borderColor: "#c9c9c9",
//                                 borderStyle: "solid",
//                             }}
//                         />
//                     </View>
//                     <View style={{ flex: 1 / 3, flexDirection: "row" }}>
//                         <View
//                             style={{
//                                 flex: 3,
//                                 borderRightWidth: 1,
//                                 borderColor: "#c9c9c9",
//                                 borderStyle: "solid",
//                                 position: "relative",
//                             }}
//                         >
//                             <View
//                                 style={{
//                                     position: "absolute",
//                                     left: 5,
//                                     bottom: 5,
//                                     borderLeftWidth: 2,
//                                     borderBottomWidth: 2,
//                                     height: 48,
//                                     width: 48,
//                                     borderColor: "#f4f4f4",
//                                     borderStyle: "solid",
//                                 }}
//                             />
//                         </View>
//                         <View
//                             style={{
//                                 flex: 3,
//                                 borderRightWidth: 1,
//                                 borderColor: "#c9c9c9",
//                                 borderStyle: "solid",
//                             }}
//                         />
//                         <View style={{ flex: 3, position: "relative" }}>
//                             <View
//                                 style={{
//                                     position: "absolute",
//                                     right: 5,
//                                     bottom: 5,
//                                     borderRightWidth: 2,
//                                     borderBottomWidth: 2,
//                                     height: 48,
//                                     width: 48,
//                                     borderColor: "#f4f4f4",
//                                     borderStyle: "solid",
//                                 }}
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         );
//     }

//     getTappedItem(x, y) {
//         const { initialLeft, initialTop, initialWidth, initialHeight } = this.state;
//         const xPos = parseInt((x - initialLeft) / (initialWidth / 3));
//         const yPos = parseInt((y - initialTop - 64) / (initialHeight / 3));

//         const index = yPos * 3 + xPos;
//         if (index == 0) {
//             return "tl";
//         }
//         if (index == 1) {
//             return "tm";
//         }
//         if (index == 2) {
//             return "tr";
//         }
//         if (index == 3) {
//             return "ml";
//         }
//         if (index == 4) {
//             return "mm";
//         }
//         if (index == 5) {
//             return "mr";
//         }
//         if (index == 6) {
//             return "bl";
//         }
//         if (index == 7) {
//             return "bm";
//         }
//         if (index == 8) {
//             return "br";
//         }
//         return "";
//     }

//     // Should we become active when the user presses down on the square?
//     handleStartShouldSetPanResponder = (event) => true;

//     // We were granted responder status! Let's update the UI
//     handlePanResponderGrant = (event) => {
//         console.log(event.nativeEvent.locationX + ", " + event.nativeEvent.locationY);

//         const selectedItem = this.getTappedItem(event.nativeEvent.pageX, event.nativeEvent.pageY);
//         if (selectedItem == "tl") {
//             this.setState({ draggingTL: true });
//         } else if (selectedItem == "tm") {
//             this.setState({ draggingTM: true });
//         } else if (selectedItem == "tr") {
//             this.setState({ draggingTR: true });
//         } else if (selectedItem == "ml") {
//             this.setState({ draggingML: true });
//         } else if (selectedItem == "mm") {
//             this.setState({ draggingMM: true });
//         } else if (selectedItem == "mr") {
//             this.setState({ draggingMR: true });
//         } else if (selectedItem == "bl") {
//             this.setState({ draggingBL: true });
//         } else if (selectedItem == "bm") {
//             this.setState({ draggingBM: true });
//         } else if (selectedItem == "br") {
//             this.setState({ draggingBR: true });
//         }
//     };

//     // Every time the touch/mouse moves
//     handlePanResponderMove = (e, gestureState) => {
//         // Keep track of how far we've moved in total (dx and dy)
//         this.setState({
//             offsetTop: gestureState.dy,
//             offsetLeft: gestureState.dx,
//         });
//     };

//     // When the touch/mouse is lifted
//     handlePanResponderEnd = (e, gestureState) => {
//         const {
//             initialTop,
//             initialLeft,
//             initialWidth,
//             initialHeight,
//             draggingTL,
//             draggingTM,
//             draggingTR,
//             draggingML,
//             draggingMM,
//             draggingMR,
//             draggingBL,
//             draggingBM,
//             draggingBR,
//             ratio,
//         } = this.state;

//         const state = {
//             draggingTL: false,
//             draggingTM: false,
//             draggingTR: false,
//             draggingML: false,
//             draggingMM: false,
//             draggingMR: false,
//             draggingBL: false,
//             draggingBM: false,
//             draggingBR: false,
//             offsetTop: 0,
//             offsetLeft: 0,
//         };

//         state.initialTop = initialTop + (draggingTL || draggingTM || draggingTR || draggingMM ? gestureState.dy : 0);
//         state.initialLeft = initialLeft + (draggingTL || draggingML || draggingBL || draggingMM ? gestureState.dx : 0);
//         state.initialWidth =
//             initialWidth +
//             (draggingTL || draggingML || draggingBL
//                 ? -gestureState.dx
//                 : draggingTM || draggingMM || draggingBM
//                 ? 0
//                 : gestureState.dx);
//         state.initialHeight =
//             initialHeight +
//             (draggingTL || draggingTM || draggingTR
//                 ? -gestureState.dy
//                 : draggingML || draggingMM || draggingMR
//                 ? 0
//                 : gestureState.dy);

//         if (ratio && ratio.height && ratio.width) {
//             if (state.initialWidth * ratio.width > state.initialHeight * ratio.height) {
//                 state.initialHeight = state.initialWidth * (ratio.height / ratio.width);
//             }
//             if (state.initialHeight * ratio.height > state.initialWidth * ratio.width) {
//                 state.initialWidth = state.initialHeight * (ratio.width / ratio.height);
//             }
//         }

//         if (state.initialWidth > this.props.initialWidth) {
//             state.initialWidth = this.props.initialWidth;
//         }
//         if (state.initialWidth < this.props.minWidth) {
//             state.initialWidth = this.props.minWidth;
//         }
//         if (state.initialHeight > this.props.initialHeight) {
//             state.initialHeight = this.props.initialHeight;
//         }
//         if (state.initialHeight < this.props.minHeight) {
//             state.initialHeight = this.props.minHeight;
//         }

//         this.setState(state);
//         this.props.onLayoutChanged(state.initialTop, state.initialLeft, state.initialWidth, state.initialHeight);
//     };
// }

// export default ImageCropOverlay;

import * as React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";
const horizontalSections = ["top", "middle", "bottom"];
const verticalSections = ["left", "middle", "right"];
const ImageCropOverlay = ({ photo, photoBounds, setCropData, setDistanceY }) => {
    // Record which section of the fram window has been pressed
    // this determines whether it is a translation or scaling gesture
    const [selectedFrameSection, setSelectedFrameSection] = React.useState("");
    // Shared state and bits passed through recoil to avoid prop drilling
    const [cropSize, setCropSize] = React.useState({ width: 0, height: 0 });
    const [imageBounds, setImageBounds] = React.useState(photoBounds);
    const [accumulatedPan, setAccumulatedPan] = React.useState({
        x: 0,
        y: 0,
    });
    // Editor context
    const fixedAspectRatio = photo.width / photo.height;
    const lockAspectRatio = false;
    const minimumCropDimensions = {
        width: 0,
        height: 0,
    };

    const [animatedCropSize, setAnimatedCropSize] = React.useState({
        width: new Animated.Value(cropSize.width),
        height: new Animated.Value(cropSize.height),
    });
    // pan X and Y values to track the current delta of the pan
    // in both directions - this should be zeroed out on release
    // and the delta added onto the accumulatedPan state
    const panX = React.useRef(new Animated.Value(imageBounds.x));
    const panY = React.useRef(new Animated.Value(imageBounds.y));
    React.useEffect(() => {
        // Move the pan to the origin and check the bounds so it clicks to
        // the corner of the image
        checkCropBounds({
            translationX: 0,
            translationY: 0,
        });
        // When the crop size updates make sure the animated value does too!
        setAnimatedCropSize({ height: cropSize.height, width: cropSize.width });
    }, [cropSize]);
    React.useEffect(() => {
        // Update the size of the crop window based on the new image bounds
        let newSize = { width: 0, height: 0 };
        const { width, height } = imageBounds;
        const imageAspectRatio = width / height;
        // Then check if the cropping aspect ratio is smaller
        if (fixedAspectRatio < imageAspectRatio) {
            // If so calculate the size so its not greater than the image width
            newSize.height = height;
            newSize.width = height * fixedAspectRatio;
        } else {
            // else, calculate the size so its not greater than the image height
            newSize.width = width;
            newSize.height = width / fixedAspectRatio;
        }
        // Set the size of the crop overlay
        setCropSize(newSize);
    }, [imageBounds]);
    // Function that sets which sections allow for translation when
    // pressed
    const isMovingSection = () => {
        return (
            selectedFrameSection == "topmiddle" ||
            selectedFrameSection == "middleleft" ||
            selectedFrameSection == "middleright" ||
            selectedFrameSection == "middlemiddle" ||
            selectedFrameSection == "bottommiddle"
        );
    };
    // Check what resizing / translation needs to be performed based on which section was pressed
    const isLeft = selectedFrameSection.endsWith("left");
    const isTop = selectedFrameSection.startsWith("top");
    const onOverlayMove = ({ nativeEvent }) => {
        if (selectedFrameSection !== "") {
            // Check if the section pressed is one to translate the crop window or not
            if (isMovingSection()) {
                // If it is then use an animated event to directly pass the tranlation
                // to the pan refs
                Animated.event(
                    [
                        {
                            translationX: panX.current,
                            translationY: panY.current,
                        },
                    ],
                    { useNativeDriver: false }
                )(nativeEvent);
            } else {
                // Else its a scaling operation
                const { x, y } = getTargetCropFrameBounds(nativeEvent);
                if (isTop) {
                    panY.current.setValue(-y);
                }
                if (isLeft) {
                    panX.current.setValue(-x);
                }
                // Finally update the animated width to the values the crop
                // window has been resized to
                setAnimatedCropSize({ width: cropSize.width + x, height: cropSize.height + y });
            }
        } else {
            // We need to set which section has been pressed
            const { x, y } = nativeEvent;
            const { width: initialWidth, height: initialHeight } = cropSize;
            let position = "";
            // Figure out where we pressed vertically
            if (y / initialHeight < 0.333) {
                position = position + "top";
            } else if (y / initialHeight < 0.667) {
                position = position + "middle";
            } else {
                position = position + "bottom";
            }
            // Figure out where we pressed horizontally
            if (x / initialWidth < 0.333) {
                position = position + "left";
            } else if (x / initialWidth < 0.667) {
                position = position + "middle";
            } else {
                position = position + "right";
            }
            setSelectedFrameSection(position);
        }
    };
    const getTargetCropFrameBounds = ({ translationX, translationY }) => {
        let x = 0;
        let y = 0;
        if (translationX && translationY) {
            if (translationX < translationY) {
                x = (isLeft ? -1 : 1) * translationX;
                if (lockAspectRatio) {
                    y = x / fixedAspectRatio;
                } else {
                    y = (isTop ? -1 : 1) * translationY;
                }
            } else {
                y = (isTop ? -1 : 1) * translationY;
                if (lockAspectRatio) {
                    x = y * fixedAspectRatio;
                } else {
                    x = (isLeft ? -1 : 1) * translationX;
                }
            }
        }
        return { x, y };
    };
    const onOverlayRelease = (nativeEvent) => {
        // Check if the section pressed is one to translate the crop window or not
        if (isMovingSection()) {
            // Ensure the cropping overlay has not been moved outside of the allowed bounds
            checkCropBounds(nativeEvent);
        } else {
            // Else its a scaling op - check that the resizing didnt take it out of bounds
            checkResizeBounds(nativeEvent);
        }
        // Disable the pan responder so the section tiles can register being pressed again
        setSelectedFrameSection("");
    };
    const onHandlerStateChange = ({ nativeEvent }) => {
        // Handle any state changes from the pan gesture handler
        // only looking at when the touch ends atm
        if (nativeEvent.state === State.END) {
            onOverlayRelease(nativeEvent);
        }
        setCropData({
            x: accumulatedPan.x,
            y: accumulatedPan.y,
            width: cropSize.width,
            height: cropSize.height,
        });
    };
    const checkCropBounds = ({ translationX, translationY }) => {
        // Check if the pan in the x direction exceeds the bounds
        let accDx = accumulatedPan.x + translationX;
        // Is the new x pos less than zero?
        if (accDx <= imageBounds.x) {
            // Then set it to be zero and set the pan to zero too
            accDx = imageBounds.x;
        }
        // Is the new x pos plus crop width going to exceed the right hand bound
        else if (accDx + cropSize.width > imageBounds.width + imageBounds.x) {
            // Then set the x pos so the crop frame touches the right hand edge
            let limitedXPos = imageBounds.x + imageBounds.width - cropSize.width;
            accDx = limitedXPos;
        } else {
            // It's somewhere in between - no formatting required
        }
        // Check if the pan in the y direction exceeds the bounds
        let accDy = accumulatedPan.y + translationY;
        // Is the new y pos less the top edge?
        if (accDy <= imageBounds.y) {
            // Then set it to be zero and set the pan to zero too
            accDy = imageBounds.y;
        }
        // Is the new y pos plus crop height going to exceed the bottom bound
        else if (accDy + cropSize.height > imageBounds.height + imageBounds.y) {
            // Then set the y pos so the crop frame touches the bottom edge
            let limitedYPos = imageBounds.y + imageBounds.height - cropSize.height;
            accDy = limitedYPos;
        } else {
            // It's somewhere in between - no formatting required
        }
        // Record the accumulated pan and reset the pan refs to zero
        panX.current.setValue(0);
        panY.current.setValue(0);
        setAccumulatedPan({ x: accDx, y: accDy });
    };
    const checkResizeBounds = ({ translationX, translationY }) => {
        // Check we haven't gone out of bounds when resizing - allow it to be
        // resized up to the appropriate bounds if so
        const { width: maxWidth, height: maxHeight } = imageBounds;
        const { width: minWidth, height: minHeight } = minimumCropDimensions;
        const { x, y } = getTargetCropFrameBounds({ translationX, translationY });
        const animatedWidth = cropSize.width + x;
        const animatedHeight = cropSize.height + y;
        let finalHeight = animatedHeight;
        let finalWidth = animatedWidth;
        // Ensure the width / height does not exceed the boundaries -
        // resize to the max it can be if so
        if (animatedHeight > maxHeight) {
            finalHeight = maxHeight;
            if (lockAspectRatio) finalWidth = finalHeight * fixedAspectRatio;
        } else if (animatedHeight < minHeight) {
            finalHeight = minHeight;
            if (lockAspectRatio) finalWidth = finalHeight * fixedAspectRatio;
        }
        if (animatedWidth > maxWidth) {
            finalWidth = maxWidth;
            if (lockAspectRatio) finalHeight = finalWidth / fixedAspectRatio;
        } else if (animatedWidth < minWidth) {
            finalWidth = minWidth;
            if (lockAspectRatio) finalHeight = finalWidth / fixedAspectRatio;
        }
        // Update the accumulated pan with the delta from the pan refs
        setAccumulatedPan({
            x: accumulatedPan.x + (isLeft ? -x : 0),
            y: accumulatedPan.y + (isTop ? -y : 0),
        });
        // Zero out the pan refs
        panX.current.setValue(0);
        panY.current.setValue(0);
        // Update the crop size to the size after resizing
        setCropSize({
            height: finalHeight,
            width: finalWidth,
        });
    };

    // Crop change
    React.useEffect(() => {
        setDistanceY(accumulatedPan.y);
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={onOverlayMove} onHandlerStateChange={(e) => onHandlerStateChange(e)}>
                <Animated.View
                    style={[
                        styles.overlay,
                        animatedCropSize,
                        {
                            transform: [
                                { translateX: Animated.add(panX.current, accumulatedPan.x) },
                                { translateY: Animated.add(panY.current, accumulatedPan.y) },
                            ],
                        },
                    ]}
                >
                    {
                        // For reendering out each section of the crop overlay frame
                        horizontalSections.map((hsection) => {
                            return (
                                <View style={styles.sectionRow} key={hsection}>
                                    {verticalSections.map((vsection) => {
                                        const key = hsection + vsection;
                                        return (
                                            <View style={[styles.defaultSection]} key={key}>
                                                {
                                                    // Add the corner markers to the topleft,
                                                    // topright, bottomleft and bottomright corners to indicate resizing
                                                    key == "topleft" ||
                                                    key == "topright" ||
                                                    key == "bottomleft" ||
                                                    key == "bottomright" ? (
                                                        <View
                                                            style={[
                                                                styles.cornerMarker,
                                                                hsection == "top"
                                                                    ? { top: -4, borderTopWidth: 7 }
                                                                    : { bottom: -4, borderBottomWidth: 7 },
                                                                vsection == "left"
                                                                    ? { left: -4, borderLeftWidth: 7 }
                                                                    : { right: -4, borderRightWidth: 7 },
                                                            ]}
                                                        />
                                                    ) : null
                                                }
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })
                    }
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};
export default ImageCropOverlay;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
    },
    overlay: {
        height: 40,
        width: 40,
        backgroundColor: "#33333355",
        borderColor: "#ffffff88",
        borderWidth: 1,
    },
    sectionRow: {
        flexDirection: "row",
        flex: 1,
    },
    defaultSection: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: "#ffffff88",
        justifyContent: "center",
        alignItems: "center",
    },
    cornerMarker: {
        position: "absolute",
        borderColor: "#ffffff",
        height: 30,
        width: 30,
    },
});
