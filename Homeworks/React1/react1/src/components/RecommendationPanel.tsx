import React from 'react';
import type { Song } from './types/song';
import styles from './RecommendationPanel.module.scss';

interface RecommendationPanelProps {
  selectedSong: Song | null | undefined;
  relatedSongs: (Song | undefined)[];
  onSelectSong: (songId: number) => void;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ 
  selectedSong, 
  relatedSongs, 
  onSelectSong 
}) => {
  const validRelatedSongs = relatedSongs.filter((song): song is Song => song !== undefined);

  return (
    <div className={styles.recommendationContainer}>
      {!selectedSong ? (
        <div className={styles.placeholder}>
          <p>🎵 Selecciona una canción del buscador o ranking</p>
          <p className={styles.hint}>Para ver recomendaciones basadas en el grafo no dirigido</p>
        </div>
      ) : (
        <>
          <div className={styles.selectedSong}>
            <h3>🎤 Canción actual</h3>
            <div className={styles.songCard}>
              <strong>{selectedSong.title}</strong>
              <span>{selectedSong.artist}</span>
              <small>🎧 {selectedSong.playCount} plays</small>
            </div>
          </div>
          
          <div className={styles.recommendations}>
            <h3>🔗 Canciones relacionadas (Grafo)</h3>
            {validRelatedSongs.length === 0 ? (
              <div className={styles.noRecommendations}>
                No hay canciones relacionadas en el grafo
              </div>
            ) : (
              <ul className={styles.relatedList}>
                {validRelatedSongs.map(song => (
                  <li 
                    key={song.id}
                    className={styles.relatedItem}
                    onClick={() => onSelectSong(song.id)}
                  >
                    <span className={styles.relatedTitle}>{song.title}</span>
                    <span className={styles.relatedArtist}>{song.artist}</span>
                    <span className={styles.arrow}>→</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className={styles.graphInfo}>
            📊 Grafo no dirigido con {validRelatedSongs.length} conexiones para esta canción
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationPanel;