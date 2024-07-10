import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Dimensions, TouchableWithoutFeedback, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import {HeadingText} from '../utils/commonText';
import {image500} from '../services/MoviesDBApi';

var {width, height} = Dimensions.get('window');

const TrendingMoviesCarousel = ({data}) => {
  const navigation = useNavigation();

  const handleClick = item => navigation.push('Movie', item);

  return (
    <View>
      {data.length > 0 && <HeadingText text="Trending" />}
      <Carousel
        data={data}
        renderItem={({item, index}) => (
          <MoviesCard item={item} handleClick={handleClick} />
        )}
        width={width}
        height={width * 0.62} // Set to your desired height
        initialIndex={1}
        styleInterpolator={({animatedValue}) => {
          const opacity = animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0.6, 1, 0.6],
          });
          return {
            opacity,
          };
        }}
        loop
        autoPlay={false}
        onSnapToItem={index => console.log('Current index:', index)}
      />
    </View>
  );
};

export default TrendingMoviesCarousel;

const MoviesCard = ({item, handleClick}) => {
  console.log('item.poster_path', item.poster_path);
  return (
    <View
      style={{
        width: width * 0.99,
        // height: height * 0.34,
      }}>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <FastImage
          // source={require('../assets/images/Avengers.png')}
          source={{uri: image500(item.poster_path)}}
          resizeMode="stretch" // This will ensure the entire image is
          className="rounded-3xl h-full z-30 mx-1"
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
