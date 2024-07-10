import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import PersonScreen from '../screens/Home/PersonScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import MovieScreen from '../screens/Home/MovieScreen';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
    animation: 'slide_from_right',
    cardOverlay: () => (
      <View
        style={{
          flex: 1,
          backgroundColor: '#262626',
        }}
      />
    ),
  };

  return (
    <Stack.Navigator mode="modal" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
