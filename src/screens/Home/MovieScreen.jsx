import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles, theme} from '../../utils/Theme';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../../components/Cast';
import MovieList from '../../components/MovieList';
import Loading from '../../utils/loading';
import {
  fetchMovieDetails,
  image500,
  fetchMovieCredits,
  fetchSimilarMovies,
} from '../../services/MoviesDBApi';

export default function MovieScreen() {
  const {params: item} = useRoute();

  var {height, width} = Dimensions.get('window');
  const ios = Platform.OS == 'ios';
  const topMargin = ios ? '' : 'mt-4';
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const [similarMovies, setsimilarMovies] = useState([]);
  const txtStyle = 'text-neutral-300 text-base font-semibold text-center ';
  const lightTxtStyle = 'text-neutral-400 text-base font-semibold text-center ';

  const navigation = useNavigation();

  useEffect(() => {
    console.log('item', item.id);
    getMovieDetails();
    getMovieCredits();
    getSimilarMovies();
  }, [item]);

  const getMovieDetails = async () => {
    const data = await fetchMovieDetails(item.id);
    if (data) {
      setMovie(data);
      setLoading(false);
    }
  };
  const getMovieCredits = async () => {
    const data = await fetchMovieCredits(item.id);
    if (data) {
      setCast(data.cast);
      setLoading(false);
    }
  };

  const getSimilarMovies = async () => {
    const data = await fetchSimilarMovies(item.id);
    if (data) {
      setsimilarMovies(data.results);
      setLoading(false);
    }
  };
  //   const movie
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-900 space-y-2">
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4 ' +
            topMargin
          }>
          <StatusBar backgroundColor="transparent" translucent />
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              color={isFavourite ? theme.redColor : theme.whiteColor}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <FastImage
              source={{uri: image500(item.poster_path)}}
              style={{width, height: height * 0.55}}
              resizeMode="stretch"
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{width, height: height * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              className="absolute bottom-0"></LinearGradient>
          </View>
        )}
      </View>

      {/* Movie details */}
      <View style={{marginTop: -height * 0.09}} className="space-y-2">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {movie.id ? (
          <Text className={txtStyle}>
            {movie?.status} - {movie.release_date?.split('-')[0]} -{' '}
            {movie.runtime} min
          </Text>
        ) : null}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: 10,
          paddingHorizontal: 8,
          flex: 1,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        {movie?.genres?.map((genre, index) => {
          let showBar = index < movie.genres.length - 1;
          return (
            <Text key={index} className={txtStyle + (showBar ? 'mr-2' : '')}>
              {genre.name}
              {showBar && ' |'}
            </Text>
          );
        })}
      </ScrollView>
      {/* description */}
      <Text className={lightTxtStyle + 'tracking-wide'}>{movie?.overview}</Text>

      {/* Cast */}
      <Cast cast={cast} navigation={navigation} />
      {/* Similar Movies */}
      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
}
