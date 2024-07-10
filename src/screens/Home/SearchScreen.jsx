import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Loading from '../../utils/loading';
import {searchMovies, image185} from '../../services/MoviesDBApi';
// export {debounce} from 'lodash';
import {debounce} from 'lodash';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  var {width, height} = Dimensions.get('screen');
  const [loading, setLoading] = useState(false);

  const handleSearch = text => {
    if (text.length > 2 && text) {
      setLoading(true);
      searchMovies({
        query: text,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      }).then(data => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setResults([]);
      setLoading(false);
      console.log('no results found');
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []); // why 400ms?
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className=" mb-3 rounded-full flex-row justify-between items-center border border-neutral-500">
        <TextInput
          placeholder="Search Movies"
          onChangeText={handleTextDebounce}
          placeholderTextColor="lightgrey"
          className="text-white pb-1 pl-6 flex-1 text-base font-semibold tracking-wider text-opacity-75 "
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-3 m-1">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results && results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          className="space-y-2 mx-2">
          <Text className="text-white font-semibold ml-2">
            Results{' '}
            <Text className="text-white font-semibold">({results.length})</Text>
          </Text>
          {/* flex-wrap add below */}
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}>
                <View className="my-2">
                  <FastImage
                    source={
                      {uri: image185(item.poster_path)} || fallbackMoviePoster
                    }
                    style={{height: height * 0.3, width: width * 0.47}}
                    className="rounded-md z-30"
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item.title.length > 22
                      ? item.title.slice(0, 22) + '...'
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <FastImage
            source={require('../../assets/images/Owl.png')}
            className="h-64 w-64 rounded-full mt-10"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
