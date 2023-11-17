import React from 'react';
import {View, SafeAreaView, Image} from "react-native";
import tw from "tailwind-react-native-classnames"

const MapScreen = () => {
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
                <h2>hi</h2>
            </View>
        </SafeAreaView>
    );
};

export default MapScreen;