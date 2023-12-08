import React from 'react';
import {View, Text, SafeAreaView} from "react-native";
import tw from "tailwind-react-native-classnames/dist";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {useDispatch} from "react-redux";
import {setDestination} from "../navSlice/navSlice";
import {GOOGLE_MAPS} from "@env";

const NavigatorCard = () => {
    const dispatch = useDispatch()
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good morning, BatishTaxi</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder={"where to"}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description,
                            }))
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS,
                            language: "en",
                        }}
                        nearbyPlacesAPI={"GooglePlacesSearch"}
                        debounce={400}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NavigatorCard;

// const toInputBoxStyles = StyleSheet.create({
//     container: {
//         backgroundColor: "white",
//         paddingTop: 20,
//         flex: 0,
//     },
//     textInput: {
//         backgroundColor: "#DDDDF",
//         borderRadius: 0,
//         fontSize: 18,
//     },
//     textInputContainer: {
//         paddingHorizontal: 20,
//         paddingBottom: 0,
//     }
// })