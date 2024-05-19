import { Ionicons } from '@expo/vector-icons';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import Page1 from './(chat)/[chatid]';
import Page from './(modal)/create';
import Page2 from './index';
import EditProfileScreen from './Screens/EditProfileScreen';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const Stack = createNativeStackNavigator();

// Stack navigation with two screens and one modal
export default function RootLayoutNav() {
  return (
    <ConvexProvider client={convex}>
      <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#EEA217',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Login"
          component = {LoginScreen}
          options={{
            headerTitle: 'Login',
            headerRight: () => (
              <Link href={'/Screens/LoginScreen'}>
                <TouchableOpacity>
                  <Ionicons name="add" size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
          }} 
        />
        <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home ',
          headerRight: () => (
            <Link href={'/Screens/HomeScreen'}>
              <TouchableOpacity>
                <Ionicons name="add" size={32} color="white" />
              </TouchableOpacity>
            </Link>
          ),
        }} />
          <Stack.Screen
          name="EditProfile"
          component = {EditProfileScreen}
          options={{
            headerTitle: 'Edit Profile',
            headerRight: () => (
              <Link href={'/Screens/EditProfileScreen'}>
                <TouchableOpacity>
                  <Ionicons name="add" size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
          }} 
        />
        <Stack.Screen
          name="index"
          component={Page2}
          options={{
            headerTitle: 'My Matches',
            headerRight: () => (
              <Link href={'/(modal)'} asChild>
                <TouchableOpacity>
                  <Ionicons name="add" size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
            
          }}
        />
        <Stack.Screen name="(chat)/[chatid]" component={Page1} options={{ headerTitle: 'Test' }} />
        <Stack.Screen
          name="(modal)/create"
          component={Page}
          options={{
            headerTitle: 'Start a Chat',
            headerLeft: () => (
              <Link href={'/'} asChild>
                <TouchableOpacity>
                  <Ionicons name="close-outline" size={32} color="white" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}