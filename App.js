import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "./screens/Camera";
import GalleryScreen from "./screens/Gallery";
import { Buffer } from "buffer";
import EditScreen from "./screens/Edit";

global.Buffer = Buffer;
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar hidden />
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="Camera"
                >
                    <Stack.Screen name="Camera" component={CameraScreen} />
                    <Stack.Screen name="Gallery" component={GalleryScreen} />
                    <Stack.Screen name="Edit" component={EditScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
