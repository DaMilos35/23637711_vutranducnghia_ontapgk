import React from 'react';
import { render } from '@testing-library/react-native';
import MovieCard, { Movie } from '../components/MovieCard';

const mockMovie: Movie = {
  id: '1',
  title: 'The Dark Knight',
  poster: 'https://via.placeholder.com/300x450',
  genre: 'Action, Crime',
  year: 2008,
  rating: 8,
  isShowing: true,
};

describe('MovieCard Component - a & b', () => {
  it('a. renders title and formatted rating correctly', () => {
    const { getByText } = render(
      <MovieCard movie={mockMovie} layout="row" onSelect={() => {}} />
    );

    expect(getByText('The Dark Knight')).toBeTruthy();
    expect(getByText('⭐ 8.0')).toBeTruthy();
  });

  it('b. shows genre in row layout and hides genre in tile layout', () => {
    const { getByText } = render(
      <MovieCard movie={mockMovie} layout="row" onSelect={() => {}} />
    );
    expect(getByText(/Action, Crime/i)).toBeTruthy();

    const { queryByText } = render(
      <MovieCard movie={mockMovie} layout="tile" onSelect={() => {}} />
    );
    expect(queryByText(/Action, Crime/i)).toBeNull();
  });
});