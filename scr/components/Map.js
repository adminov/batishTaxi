import React, {useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from "tailwind-react-native-classnames/dist";
import {selectDestination, selectOrigin} from "../navSlice/navSlice"
import {useSelector} from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import {useRef} from "react";
import {GOOGLE_MAPS_APIKEY} from "@env";


const Map = () => {


    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    const apiMatrix = `https://us1.locationiq.com/v1/matrix/driving/{origin,destination}?key=<YOUR_ACCESS_TOKEN>&sources={elem1};{elem2};..&destinations={elem1};{elem2};...&annotations={duration|distance|duration,distance}`



    const mapRef = useRef(null);
    const latitude = parseInt(origin.location.lat),
        longitude =  parseInt(origin.location.lon)

    console.log(typeof origin.description)

    useEffect(() => {
        if (!origin || !destination) return;

        //zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);
    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType={"mutedStandard"}
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0155,
                longitudeDelta: 0.0155,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin?.description}
                    destination={destination?.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColors={"black"}
                />
            )

            }

            {origin?.location && (
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