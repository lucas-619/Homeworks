import React from 'react';
import type { Song } from './types/song';
import styles from './RankingList.module.scss';

interface RankingListProps {
  songs: Song[];
  onSelectSong: (songId: number) => void;
}

const RankingList: React.FC<RankingListProps> = ({ songs, onSelectSong }) => {
  if (songs.length === 0) {
    return <div className={styles.empty}>No hay canciones en el ranking</div>;
  }

  return (
    <div className={styles.rankingContainer}>
      <div className={styles.rankingHeader}>
        <span>#</span>
        <span>Canción</span>
        <span>Artista</span>
        <span>Reproducciones</span>
      </div>
      <ul className={styles.rankingList}>
        {songs.map((song, index) => (
          <li 
            key={song.id}
            className={styles.rankingItem}
            onClick={() => onSelectSong(song.id)}
          >
            <span className={styles.rank}>{index + 1}</span>
            <span className={styles.title}>{song.title}</span>
            <span className={styles.artist}>{song.artist}</span>
            <span className={styles.playCount}>
              🎧 {song.playCount.toLocaleString()}
            </span>
            <span className={styles.playButton}>▶</span>
          </li>
        ))}
      </ul>
      <div className={styles.heapInfo}>
        📊 Max Heap implementado para ranking en tiempo real
      </div>
    </div>
  );
};

export default RankingList;