import React, { useState, useCallback } from 'react';
import type { Song, SongInput } from './types/song';
import styles from './AddSongForm.module.scss';

interface AddSongFormProps {
  existingSongs: Song[];
  onAddSong: (song: SongInput) => void;
}

const AddSongForm: React.FC<AddSongFormProps> = ({ existingSongs, onAddSong }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [playCount, setPlayCount] = useState(0);
  const [selectedRelatedIds, setSelectedRelatedIds] = useState<number[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(() => {
    if (!title.trim() || !artist.trim()) {
      setError('Título y artista son obligatorios');
      return;
    }

    setError('');

    const newSong: SongInput = {
      title: title.trim(),
      artist: artist.trim(),
      playCount,
      relatedIds: selectedRelatedIds,
    };

    onAddSong(newSong);

    setTitle('');
    setArtist('');
    setPlayCount(0);
    setSelectedRelatedIds([]);
  }, [title, artist, playCount, selectedRelatedIds, onAddSong]);

  const handleRelatedToggle = useCallback((songId: number) => {
    setSelectedRelatedIds(prev =>
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  }, []);

  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <label>Título de la canción *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: 'Nueva Canción'"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Artista *</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Ej: 'Artista Ejemplo'"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Reproducciones iniciales</label>
        <input
          type="number"
          value={playCount}
          onChange={(e) => setPlayCount(Math.max(0, parseInt(e.target.value) || 0))}
          min="0"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Canciones relacionadas (opcional)</label>
        <div className={styles.relatedList}>
          {existingSongs.map(song => (
            <label key={song.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedRelatedIds.includes(song.id)}
                onChange={() => handleRelatedToggle(song.id)}
              />
              <span>{song.title}</span>
              <small>{song.artist}</small>
            </label>
          ))}
          {existingSongs.length === 0 && (
            <div className={styles.emptyMessage}>No hay canciones existentes para relacionar</div>
          )}
        </div>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button onClick={handleSubmit} className={styles.submitButton}>
        ➕ Insertar canción (Trie + Grafo + Heap)
      </button>
    </div>
  );
};

export default AddSongForm;