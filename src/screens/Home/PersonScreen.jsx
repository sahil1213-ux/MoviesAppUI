import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import FastImage from 'react-native-fast-image';
import {NormalText, SmallGreyTxt} from '../../utils/commonText';
import MovieList from '../../components/MovieList';
import Loading from '../../utils/loading';
import {styles, theme} from '../../utils/Theme';
import {
  fallBackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image500,
} from '../../services/MoviesDBApi';
// import {fallBackPersonImage, fetchPersonDetails} from '../services/MoviesDBApi';

var {width, height} = Dimensions.get('screen');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';
export default function PersonScreen() {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [personDetails, setPersonDetails] = useState({});
  const [personMovies, setpersonMovies] = useState([]);
  const [isFav, setFav] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPersonDetails();
    getPersonMovies();
  }, [item]);

  const getPersonDetails = async () => {
    const data = await fetchPersonDetails(item.id);
    if (data) {
      setPersonDetails(data);
      setLoading(false);
    }
  };

  const getPersonMovies = async () => {
    const data = await fetchPersonMovies(item.id);
    if (data) {
      // console.log('data', data.cast);
      setpersonMovies(data.cast);
      loading && setLoading(false);
    } else {
      // console.lo
      console.log('error, no data found for person movies');
    }
  };
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}}>
      {/* back button */}
      <SafeAreaView
        className={
          'z-20 w-full flex-row justify-between items-center px-4 ' +
          verticalMargin
        }>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1">
          <ChevronLeftIcon size="28" strokeWidth="2.5" color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFav(!isFav)}>
          <HeartIcon
            size="35"
            color={isFav ? theme.redColor : theme.whiteColor}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {/* person Details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center rounded-full mx-5"
            style={
              ios
                ? {
                    shadowColor: 'gray',
                    shadowRadius: 40,
                    shadowOffset: {width: 0, height: 5},
                    shadowOpacity: 1,
                    backgroundColor: 'white',
                    overflow: 'hidden',
                  }
                : {
                    elevation: 8,
                    shadowColor: 'white',
                    opacity: 0.9,
                  }
            }>
            <View className="items-center rounded-full h-72 w-72 border-2 border-neutral-500 overflow-hidden ">
              <FastImage
                source={{
                  uri:
                    image500(personDetails.profile_path) || fallBackPersonImage,
                }}
                style={{height: height * 0.43, width: width * 0.74}}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {personDetails.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {personDetails.place_of_birth}
            </Text>
          </View>

          <View className="mx-3 p-4 mt-5 justify-center items-center bg-neutral-700 rounded-full flex-row ">
            <View className="border-r-2 border-r-neutral-500 px-2  items-center">
              <NormalText text="Gender" />
              <SmallGreyTxt
                text={personDetails.gender == 1 ? 'Female' : 'Male'}
              />
            </View>
            <View className="border-r-2 border-r-neutral-500 px-2  items-center">
              <NormalText text="Birthday" />
              <SmallGreyTxt text={personDetails.birthday} />
            </View>
            <View className=" px-2 items-center">
              <NormalText text="Popularity" />
              {/* <SmallGreyTxt text={personDetails.popularity.toFixed(2) + '%'} /> */}
            </View>
          </View>

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-500 tracking-wide">
              {personDetails.biography ? personDetails.biography : 'N/A'}
            </Text>
          </View>

          {/* Movies */}
          {personMovies.length > 0 && (
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
}
