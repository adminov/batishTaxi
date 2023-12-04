import {Provider} from "react-redux";
import {store} from "./scr/store/store";
import HomeScreen from "./scr/screens/HomeScreen";
import MapScreen from "./scr/screens/MapScreen";
import "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




export default function App() {

    const Stack = createNativeStackNavigator();

  return (
      <Provider store={store}>
          <NavigationContainer>
              <SafeAreaProvider>
                  <Stack.Navigator>
                      <Stack.Screen
                          name="HomeScreen"
                          component={HomeScreen}
                          options={{
                              headerShown: false,
                          }}
                      />
                      <Stack.Screen
                          name="MapScreen"
                          component={MapScreen}
                          options={{
                              headerShown: false,
                          }}
                      />
                  </Stack.Navigator>
              </SafeAreaProvider>
          </NavigationContainer>
      </Provider>
  );
}