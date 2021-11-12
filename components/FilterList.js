import { Surface } from "gl-react-expo";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import GLImage from "gl-react-image";
import "webgltexture-loader-expo-camera";

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
import filterType from "../constants/filterType";
import FilterComponent from "./Filter";

function FilterButton({ component, name, uri, changeFilter, factor = 1 }) {
    return (
        <TouchableOpacity onPress={() => changeFilter(name)}>
            <Surface style={{ width: 80, height: 80 }}>
                <FilterComponent component={component} photoUri={uri} factor={factor} />
            </Surface>
            <Text style={{ color: "white", textAlign: "center", fontSize: 9 }}>{name}</Text>
        </TouchableOpacity>
    );
}

function FilterList({ texture, changePhoto }) {
    const handleChangeFilter = (type) => {
        changePhoto(type);
    };

    return (
        <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>
            <FilterButton component={Amaro} name={filterType.Amaro} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Brannan} name={filterType.Brannan} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton
                component={Earlybird}
                name={filterType.Earlybird}
                uri={texture.uri}
                changeFilter={changePhoto}
            />
            <FilterButton component={F1977} name={filterType.F1977} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Hefe} name={filterType.Hefe} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Hudson} name={filterType.Hudson} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Inkwell} name={filterType.Inkwell} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Lokofi} name={filterType.Lokofi} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton
                component={LordKelvin}
                name={filterType.LordKelvin}
                uri={texture.uri}
                changeFilter={changePhoto}
            />
            <FilterButton
                component={Nashville}
                name={filterType.Nashville}
                uri={texture.uri}
                changeFilter={changePhoto}
            />
            <FilterButton component={Normal} name={filterType.Normal} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Rise} name={filterType.Rise} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Sierra} name={filterType.Sierra} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Sutro} name={filterType.Sutro} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={Toaster} name={filterType.Toaster} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton
                component={Valencia}
                name={filterType.Valencia}
                uri={texture.uri}
                changeFilter={changePhoto}
            />
            <FilterButton component={Walden} name={filterType.Walden} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton component={XproII} name={filterType.XproII} uri={texture.uri} changeFilter={changePhoto} />
            <FilterButton
                component={Temperature}
                name={filterType.Temperature}
                uri={texture.uri}
                changeFilter={changePhoto}
                factor={6300}
            />
            <FilterButton
                component={Hue}
                name={filterType.Hue}
                uri={texture.uri}
                changeFilter={changePhoto}
                factor={2}
            />
            <FilterButton
                component={Negative}
                name={filterType.Negative}
                uri={texture.uri}
                changeFilter={changePhoto}
                factor={0.25}
            />
            <FilterButton
                component={Sharpen}
                name={filterType.Sharpen}
                uri={texture.uri}
                changeFilter={changePhoto}
                factor={0.25}
            />
            <FilterButton
                component={Saturate}
                name={filterType.Saturate}
                uri={texture.uri}
                changeFilter={changePhoto}
                factor={2}
            />
            <FilterButton
                component={Sepia}
                name={filterType.Sepia}
                uri={texture.uri}
                changeFilter={changePhoto}
                factor={1.5}
            />
        </ScrollView>
    );
}

export default FilterList;