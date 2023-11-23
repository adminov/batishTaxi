import React, {useState} from 'react';
import {Pressable, View, SafeAreaView, Image, TouchableWithoutFeedback, TextInput, FlatList} from "react-native";
import tw from "tailwind-react-native-classnames"
import NavOptions from "../components/NavOptions";
import MaterialIcons from "material-icons"
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";


const HomeScreen = () => {

    const [input, setInput] = useState('');
    const [dataOne, setDataOne] = useState();
    //
    const onChangeText = async (text) => {
        setInput(text)
        if (text.length > 2) {
            const endpoint = `https://api.locationiq.com/v1/autocomplete?key=${GOOGLE_MAPS_APIKEY}&q=${input}&limit=5&dedupe=1&`
            const res = await fetch(endpoint);
            if (res) {
                const data = await res.json()
                if (data.length > 0) setDataOne(data)
            }
        }
    }

    // const getItemText = (item) => {
    //     let mainText = item.address.name;
    //     if (item.type === "city" && item.address.state)
    //         mainText += ", " + item.address.state;
    //
    //     return (
    //         <SafeAreaView>
    //             <View style={{flexDirection: "row", alignItems: "center", padding: 15 }}>
    //                 <MaterialIcons
    //                     name={item.type === "city" ? "location-city" : "location-on"}
    //                     color={"Black"}
    //                     size={30}
    //                 />
    //                 <View style={{marginLeft: 10, flexShrink: 1}}>
    //                     <Text style={{fontWeight: "700"}}>{mainText}</Text>
    //                     <Text style={{fontSize: 12 }}>{item.address.country}</Text>
    //                 </View>
    //             </View>
    //         </SafeAreaView>
    //     )
    // }

    console.log(dataOne)

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
                <TouchableWithoutFeedback>
                    <SafeAreaView>
                        <TextInput
                            placeholder={'Find Location'}
                            onChangeText={textInput => onChangeText(textInput)}
                        />
                        <FlatList
                            data={dataOne}
                            renderItem={({item}) => (
                                    <Pressable
                                        key={item.id}
                                        onPress={() => alert("navigate passing" + JSON.stringify(item))}
                                    >
                                        {/*<p>{item.id}</p>*/}
                                    </Pressable>
                            )}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </SafeAreaView>
                </TouchableWithoutFeedback>

                    {/*<GooglePlacesAutocomplete*/}
                    {/*    placeholder={"Where from"}*/}
                    {/*    fetchDetails={true}*/}
                    {/*    returnKeyType={"search"}*/}
                    {/*    enablePoweredByContainer={false}*/}
                    {/*    minLength={2}*/}
                    {/*    listViewDisplayed='auto'*/}
                    {/*    renderDescription={row => row.description}*/}
                    {/*    onPress={(data, details = null) => {*/}
                    {/*        console.log(data, details);*/}
                    {/*    }}*/}

                    {/*    onFail={error => console.log(error)}*/}
                    {/*    onNotFound={() => console.log('no results')}*/}

                    {/*    query={{*/}
                    {/*        useOnPlatform: "all",*/}
                    {/*        key: GOOGLE_MAPS_APIKEY,*/}
                    {/*        language: 'en',*/}
                    {/*    }}*/}

                    {/*    nearbyPlacesAPI="GooglePlacesSearch"*/}
                    {/*    debounce={200}*/}
                    {/*    styles={{*/}
                    {/*        container: {*/}
                    {/*            flex: 0,*/}
                    {/*        },*/}
                    {/*        TextInput: {*/}
                    {/*            fontSize: 18,*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    // currentLocation={false}*/}
                    {/*/>*/}

                <NavOptions/>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

