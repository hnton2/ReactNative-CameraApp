import { Surface } from "gl-react-expo";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import "webgltexture-loader-expo-camera";
import filterType from "../constants/filterType";
import Amaro from "../filters/Amaro";
import Brannan from "../filters/Brannan";
import Earlybird from "../filters/Earlybird";
import F1977 from "../filters/F1977";
import Hefe from "../filters/Hefe";
import Hudson from "../filters/Hudson";
import Hue from "../filters/Hue";
import Inkwell from "../filters/Inkwell";
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
import FilterComponent from "./Filter";

function FilterButton({ component, name, uri, changeFilter, factor = 1, ...props }) {
    return (
        <TouchableOpacity onPress={() => changeFilter(name)}>
            <Surface style={{ width: 80, height: 80 }}>
                <FilterComponent component={component} photoUri={uri} factor={factor} {...props} />
            </Surface>
            <Text style={{ color: "white", textAlign: "center", fontSize: 9 }}>{name}</Text>
        </TouchableOpacity>
    );
}

function FilterList({ photo, changeFilter }) {
    return (
        <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>
            <FilterButton component={Amaro} name={filterType.Amaro} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Brannan} name={filterType.Brannan} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton
                component={Earlybird}
                name={filterType.Earlybird}
                uri={photo.uri}
                changeFilter={changeFilter}
            />
            <FilterButton component={F1977} name={filterType.F1977} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Hefe} name={filterType.Hefe} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Hudson} name={filterType.Hudson} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Inkwell} name={filterType.Inkwell} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Lokofi} name={filterType.Lokofi} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton
                component={LordKelvin}
                name={filterType.LordKelvin}
                uri={photo.uri}
                changeFilter={changeFilter}
            />
            <FilterButton
                component={Nashville}
                name={filterType.Nashville}
                uri={photo.uri}
                changeFilter={changeFilter}
            />
            <FilterButton component={Normal} name={filterType.Normal} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Rise} name={filterType.Rise} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Sierra} name={filterType.Sierra} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Sutro} name={filterType.Sutro} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Toaster} name={filterType.Toaster} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Valencia} name={filterType.Valencia} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={Walden} name={filterType.Walden} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton component={XproII} name={filterType.XproII} uri={photo.uri} changeFilter={changeFilter} />
            <FilterButton
                component={Temperature}
                name={filterType.Temperature}
                uri={photo.uri}
                changeFilter={changeFilter}
                factor={6300}
            />
            <FilterButton
                component={Hue}
                name={filterType.Hue}
                uri={photo.uri}
                changeFilter={changeFilter}
                factor={2}
            />
            <FilterButton
                component={Negative}
                name={filterType.Negative}
                uri={photo.uri}
                changeFilter={changeFilter}
                factor={0.125}
            />
            <FilterButton
                component={Sharpen}
                name={filterType.Sharpen}
                uri={photo.uri}
                changeFilter={changeFilter}
                factor={1.25}
                width={photo.width}
                height={photo.height}
            />
            <FilterButton
                component={Saturate}
                name={filterType.Saturate}
                uri={photo.uri}
                changeFilter={changeFilter}
                factor={2}
            />
            <FilterButton
                component={Sepia}
                name={filterType.Sepia}
                uri={photo.uri}
                changeFilter={changeFilter}
                factor={0.75}
            />
            {/* <TouchableOpacity>
                <Surface style={{ height: 80, width: 80 }}>
                    <Colorify colorScale={colorScale["heatmap"]}>{{ uri: texture.uri }}</Colorify>
                </Surface>
            </TouchableOpacity> */}
        </ScrollView>
    );
}

export default FilterList;
