import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {image185, fallBackPersonImage} from '../services/MoviesDBApi';
export default function Cast({cast, navigation}) {
  const txtStyle = 'text-white text-xs mt-1 ';
  return (
    <View className="mt-3 mb-2">
      <Text className="text-white text-lg mx-4 mb-3 my-3">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}>
        {cast &&
          cast.map((person, index) => (
            <TouchableOpacity
              key={index}
              className="mr-4 items-center"
              onPress={() => navigation.push('Person', person)}>
              <View className="rounded-full h-20 w-20 border border-neutral-500 overflow-hidden">
                <FastImage
                  // source={require('../assets/images/Cast.png')}
                  source={{
                    uri: image185(person.profile_path) || fallBackPersonImage,
                  }}
                  className="rounded-2xl h-20 w-20"
                />
              </View>
              <Text className={txtStyle}>
                {person?.character.length > 10
                  ? person?.character.slice(0, 10) + '...'
                  : person?.character}
              </Text>
              <Text className={txtStyle}>
                {person?.original_name.length > 10
                  ? person?.original_name.slice(0, 10) + '...'
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
