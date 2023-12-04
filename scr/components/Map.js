import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from "tailwind-react-native-classnames/dist";
import { selectOrigin } from "../navSlice/navSlice"
import {useSelector} from "react-redux";

const Map = () => {

    const origin = useSelector(selectOrigin);

    const latitude = parseInt(origin.location.lat),
        longitude =  parseInt(origin.location.lon)

    return (
        <MapView
            style={tw`flex-1`}
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
        </MapView>
    );
};

export default Map;