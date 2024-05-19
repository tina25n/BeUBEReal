import react from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
