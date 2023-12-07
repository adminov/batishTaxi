import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from "tailwind-react-native-classnames/dist";
import { selectOrigin } from "../navSlice/navSlice"
import {useSelector} from "react-redux";

const Map = () => {

    const origin = useSelector(selectOrigin);

    const latitude = parseInt(origin.location.lat),
        longitude =  parseInt(origin.location.lon)

    console.log(typeof origin.description)
    return (
        <MapView
            style={tw`flex-1`}
            mapType={"mutedStandard"}
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0155,
                longitudeDelta: 0.0155,
            }}
        >
            {origin.location && (
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title={"Origin"}
                    description={`${origin.description}`}
                    identifier={"origin"}
                />
            )}
        </MapView>
    );
};

export default Map;