import React from 'react';
import type { Song } from './types/song';
import styles from './SuggestionsList.module.scss';

interface SuggestionsListProps {
  suggestions: string[];
  songs: Song[];
  onSelectSong: (songId: number) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ 
  suggestions, 
  songs, 
  onSelectSong 
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  const suggestionSongs = suggestions
    .map(title => songs.find(song => song.title.toLowerCase() === title.toLowerCase()))
    .filter((song): song is Song => song !== undefined);

  return (
    <div className={styles.suggestionsContainer}>
      <h3>Sugerencias predictivas:</h3>
      <ul className={styles.suggestionsList}>
        {suggestionSongs.map(song => (
          <li 
            key={song.id}
            className={styles.suggestionItem}
            onClick={() => onSelectSong(song.id)}
          >
            <span className={styles.songTitle}>{song.title}</span>
            <span className={styles.songArtist}>{song.artist}</span>
            <span className={styles.playIcon}>▶</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;