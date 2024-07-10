/**
 * //nav
 * npm install @react-navigation/native
 * npm install react-native-screens react-native-safe-area-context
 * npm install @react-navigation/native-stack
 * // tailwind
 * npm install nativewind
 * npm install --save-dev tailwindcss@3.3.2
 * //heroicons
 * npm i react-native-heroicons react-native-svg
 * // carousal
 * $ npm install --save react-native-snap-carousel
 * note if typescript also using then $ npm install --save @types/react-native-snap-carousel
 * npm install react-native-linear-gradient
 * // progress bar
 * npm install react-native-progress --save
 * // api call
 * npm install axios
 * // db
 * the movies db
 * // local storage
 * npm install react-native-mmkv-storage --save
 * // animation
 * npm install react-native-reanimated
 * // responsive
 * npm install react-native-responsive-screen
 * // image
 * npm install react-native-fast-image
 * // search
 * npm i -g npm
 * npm i --save lodash
 */

import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import AppNavigation from './navigation/appNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer
      // theme={{
      //   dark: true,
      //   colors: {
      //     primary: 'blue', // Example color, adjust as needed
      //     background: '#262626', // Adjust the color as needed
      //     card: 'gray', // Example color, adjust as needed
      //     text: 'black', // Adjust the color as needed
      //     border: 'lightgray', // Example color, adjust as needed
      //     notification: 'red', // Example color, adjust as needed
      //   },

      // }}
      >
        <AppNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
