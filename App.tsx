import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Switch, Alert, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const fetchMovies = async () => {
    try {
      const res = await fetch('https://6976c5a9c0c36a2a9951c9d8.mockapi.io/Movie');
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      Alert.alert('Lỗi');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const handleSelect = (id: string) => {
    const item = movies.find((m) => m.id === id);
    if (item) Alert.alert(item.title);
  };

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Movie App</Text>
          <View style={styles.switchBox}>
            <Text style={styles.switchText}>Dạng lưới</Text>
            <Switch value={isTile} onValueChange={setIsTile} />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <FlatList
            key={String(numColumns)}
            data={movies}
            keyExtractor={(item) => String(item.id)}
            numColumns={numColumns}
            columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
            renderItem={({ item }) => (
              <MovieCard movie={item} layout={isTile ? 'tile' : 'row'} onSelect={handleSelect} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    marginRight: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 8,
  },
});