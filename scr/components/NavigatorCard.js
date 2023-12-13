import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable, FlatList, TextInput} from "react-native";
import tw from "tailwind-react-native-classnames/dist";
import {useDispatch} from "react-redux";
import {setDestination} from "../navSlice/navSlice";
import {GOOGLE_MAPS_APIKEY} from "@env";
import {useNavigation} from "@react-navigation/core";
import {RideOptionsCard} from "./RideOptionsCard";


const NavigatorCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [input, setInput] = useState('');
    const [dataOne, setDataOne] = useState([]);

    const onChangeText = async (text) => {
        setInput(text)
        if (text.length === 0) return setDataOne([])
        if (text.length > 2) {
            const endpoint = `https://api.locationiq.com/v1/autocomplete?key=${GOOGLE_MAPS_APIKEY}&q=${input}&limit=5&dedupe=1&`
            const res = await fetch(endpoint);
            if (res) {
                const data = await res.json()
                if (data.length > 0) setDataOne(data)
            }
        }
    }


    const getItemText = (item) => {
        let mainText = item.address.name;
        if (item.type === "city" && item.address.state) {
            mainText += ", " + item.address.state
        }

        return (
            <View style={{flexDirection: "row", alignItems: "center", padding: 15 }}>
                {/*<MaterialIcons*/}
                {/*    name={item.type === "city" ? "location-city" : "location-on"}*/}
                {/*    color={"Black"}*/}
                {/*    size={30}*/}
                {/*/>*/}
                <View style={{marginLeft: 10, flexShrink: 1}}>
                    <Text style={{fontWeight: "700"}}>{mainText}</Text>
                    <Text style={{fontSize: 12 }}>{item.address.country}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good morning, BatishTaxi</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <TextInput
                    placeholder={'Find Location'}
                    onChangeText={textInput => onChangeText(textInput)}
                    fetchDetails={true}
                    // enablePoweredByContainer={false}
                    returnKeyType={"search"}
                    minLength={2}
                />
                <FlatList
                    data={dataOne}
                    renderItem={({item}) => (
                        <Pressable
                            onPress={() => {
                                dispatch(setDestination({
                                    location: {
                                        lat: item.lat,
                                        lon: item.lon,
                                    },
                                    description: item.display_address
                                }));


                                // navigation.navigate(RideOptionsCard)
                                console.log(item.lat)
                                console.log(item.lon)
                            }}
                        >
                            {
                                getItemText(item)
                            }
                        </Pressable>
                    )}
                    // keyExtractor={item => item.id}
                    // removeClippedSubviews={true}
                    key={item => item.id}
                />
                {/*<View>*/}
                {/*    <GooglePlacesAutocomplete*/}
                {/*        placeholder={"where to"}*/}
                {/*        fetchDetails={true}*/}
                {/*        returnKeyType={"search"}*/}
                {/*        minLength={2}*/}
                {/*        onPress={(data, details = null) => {*/}
                {/*            dispatch(setDestination({*/}
                {/*                location: details.geometry.location,*/}
                {/*                description: data.description,*/}
                {/*            }))*/}
                {/*            navigation.navigate(RideOptionsCard)*/}
                {/*        }}*/}
                {/*        enablePoweredByContainer={false}*/}
                {/*        query={{*/}
                {/*            key: GOOGLE_MAPS,*/}
                {/*            language: "en",*/}
                {/*        }}*/}
                {/*        nearbyPlacesAPI={"GooglePlacesSearch"}*/}
                {/*        debounce={400}*/}
                {/*    />*/}
                {/*</View>*/}
            </View>
        </SafeAreaView>
    );
};

export default NavigatorCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})