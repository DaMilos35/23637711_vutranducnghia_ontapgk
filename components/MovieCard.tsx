import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  year: number;
  rating: number;
  isShowing: boolean;
}

interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.imageRow, isTile && styles.imageTile]}
        />
        {isTile && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⭐ {Number(movie.rating).toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
        
        {!isTile && (
          <>
            <Text style={styles.text}>{movie.genre} • {movie.year}</Text>
            <Text style={styles.text}>⭐ {Number(movie.rating).toFixed(1)}</Text>
          </>
        )}

        <Text style={styles.text}>{movie.isShowing ? '✅' : '❌'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTile: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginHorizontal: 4,
    padding: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  imageRow: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  imageTile: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 6,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  infoTile: {
    marginLeft: 0,
    marginTop: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
});

export default React.memo(MovieCard);