import React, {useState} from 'react';
import {
    Text,
    Pressable,
    View,
    SafeAreaView,
    Image,
    TextInput,
    FlatList,

} from "react-native";
import tw from "tailwind-react-native-classnames"
import NavOptions from "../components/NavOptions";
import {GOOGLE_MAPS_APIKEY} from "@env";

import {useDispatch} from "react-redux";
import {setOrigin, setDestination} from "../navSlice/navSlice"


const HomeScreen = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState('');
    const [dataOne, setDataOne] = useState([]);
    const [autoComplete, setAutoComplete] = useState('');


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

    const autoCompleteFan = (item) => {
        let mainText = item.address.name;
        if (item.type === "city" && item.address.state) {
            mainText += ", " + item.address.state
            return  setAutoComplete(mainText + ','+ item.address.country)
        }
    }

    console.log(dataOne)
    console.log(autoComplete)

    return (
            <SafeAreaView style={tw`bg-white h-full`}>
                <View style={tw`p-5`}>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain",
                        }}
                        source={{uri: "https://links.papareact.com/gzs"}}
                    />
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
                                        dispatch(setOrigin({
                                            location: {
                                                lat: item.lat,
                                                lon: item.lon,
                                            },
                                            description: item.display_address
                                        }));
                                        dispatch(setDestination(null))
                                        autoCompleteFan(item)

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

                    <NavOptions/>
                </View>
            </SafeAreaView>
    );
};

export default HomeScreen;

