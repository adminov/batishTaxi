import React, {useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from "tailwind-react-native-classnames/dist";
import {selectDestination, selectOrigin} from "../navSlice/navSlice"
import {useSelector} from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import {useRef} from "react";
import {GOOGLE_MAPS_APIKEY} from "@env";
import {StyleSheet} from "react-native";

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    const destinationAll = {
        latitude: parseInt(destination.location.lat),
        longitude: parseInt(destination.location.lon),
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421,
    }

    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;

        //zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    console.log(typeof origin.location.lat)
    console.log( origin.location)



    return (

        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType={"mutedStandard"}
            initialRegion={{
                latitude: parseInt(origin.location.lat),
                longitude: parseInt(origin.location.lon),
                latitudeDelta: 0.0155,
                longitudeDelta: 0.0155,
            }}
        >

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: parseInt(origin.location.lat),
                        longitude: parseInt(origin.location.lon),
                    }}
                    title={"Origin"}
                    description={`${origin.description}`}
                    identifier={"origin"}
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: parseInt(destination.location.lat),
                        longitude: parseInt(destination.location.lon),
                    }}
                    title={"Destination"}
                    description={`${destination.description}`}
                    identifier={"destination"}
                />
            )}

             {/*    {*/}
             {/*    origin && destination && (*/}
             {/*    <MapViewDirections*/}
             {/*       origin={originAll}*/}
             {/*        destination={destinationAll}*/}
             {/*        // apikey={`https://eu1.locationiq.com/v1/matrix/driving/${originLatitude},${originLongitude};${destinationLatitude},${destinationLongitude}?key=${GOOGLE_MAPS_APIKEY}&option=value&option=value`}*/}
             {/*        // apikey={`https://us1.locationiq.com/v1/matrix/driving/${origin.location.lat + ','+ origin.location.lon + ';' + destination.location.lat + ',' + destination.location.lon }?key=${GOOGLE_MAPS_APIKEY}&steps=true&alternatives=true&geometries=polyline&overview=full&`}*/}
             {/*        // apikey={`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.location}&destination=${destination.location}`}*/}
             {/*        apikey={`https://us1.locationiq.com/v1/directions/driving/${origin.location};${destination.location}?key=${GOOGLE_MAPS_APIKEY}&steps=true&alternatives=true&geometries=polyline&overview=full`}*/}

             {/*        strokeWidth={3}*/}
             {/*        strokeColors="black"*/}
             {/*    />*/}
             {/*)*/}

             {/*}*/}
        </MapView>
    );
};

export default Map;