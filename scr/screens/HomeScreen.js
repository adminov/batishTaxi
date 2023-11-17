import React from 'react';
import {View, SafeAreaView, Image} from "react-native";
import tw from "tailwind-react-native-classnames"
import NavOptions from "../components/NavOptions";
import {GooglePlacesAutocomplete}  from 'react-native-google-places-autocomplete';


const HomeScreen = () => {
    const apiKey = process.env['GOOGLE_MAPS_APIKEY'];
    return (
        <SafeAreaView>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                    source={{uri: "https://links.papareact.com/gzs"}}
                />
                <GooglePlacesAutocomplete
                    placeholder="Where from"
                    styles={{
                        container: {
                            flex: 4,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    minLength={2}
                    query={{
                        key: apiKey,
                        language: "en",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
                <NavOptions/>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

