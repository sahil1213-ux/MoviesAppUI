import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {styles, theme} from '../../utils/Theme';
import TrendingMovies from '../../components/TrendingMovies';
import MovieList from '../../components/MovieList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../utils/loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../../services/MoviesDBApi';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getTopRatedMovies();
    getUpComingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
  };
  const getUpComingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpComing(data.results);
  };

  return loading ? (
    <Loading />
  ) : (
    <View
      className="flex-1 space-y-2"
      style={{backgroundColor: theme.appBgcolor}}>
      {/* search bar and logo */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar
          barStyle="light-content"
          className="bg-neutral-800"
          backgroundColor={theme.appBgcolor}
        />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon color={'#fff'} size={30} strokeWidth={2} />
          <Text style={styles.text} className="text-2xl font-bold text-white">
            M <Text className="text-3xl font-bold text-white">ovies</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.push('Search')}>
            <MagnifyingGlassIcon color={'#fff'} size={30} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 13}}>
        {/* Treanding Movies */}
        {trending.length > 0 && upcoming.length > 0 && topRated.length > 0 && (
          <TrendingMovies data={trending} />
        )}

        {/* upcoming */}
        {trending.length > 0 && upcoming.length > 0 && topRated.length > 0 && (
          <MovieList title="Coming Soon..." data={upcoming} />
        )}

        {/* Top Rated */}
        {trending.length > 0 && upcoming.length > 0 && topRated.length > 0 && (
          <MovieList title="Top Loved in Delhi" data={topRated} />
        )}
      </ScrollView>
    </View>
  );
}
