import {View, Text, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {HeadingText, NormalText} from '../utils/commonText';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {fallbackMoviePoster, image185} from '../services/MoviesDBApi';

const {height, width} = Dimensions.get('screen');
export default function MovieList({title, hideSeeAll, data}) {
  console.log('data fr movies', data);
  const navigation = useNavigation();
  return (
    <View>
      {data.length > 0 && (
        <View className="flex-row justify-between items-center">
          <HeadingText text={title} />
          {!hideSeeAll && (
            <TouchableOpacity>
              <NormalText text="See All" isOrange={true} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Movie Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 15}}>
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push('Movie', item)}>
            <View className="mr-2">
              <FastImage
                source={{
                  uri: image185(item.poster_path) || fallbackMoviePoster,
                }}
                className="rounded-2xl z-30"
                style={{
                  width: width * 0.33,
                  height: height * 0.25,
                }}
              />
            </View>
            <NormalText
              text={
                item.title.length > 14
                  ? item.title.slice(0, 14) + '...'
                  : item.title
              }
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
