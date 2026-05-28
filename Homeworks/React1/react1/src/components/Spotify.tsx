import { useState } from 'react';
import { useMusicData } from '../hooks/useMusicData';
import SearchBar from './SearchBar';
import SuggestionsList from './SuggestionsList';
import RankingList from './RankingList';
import RecommendationPanel from './RecommendationPanel';
import AddSongForm from './AddSongForm';
import styles from '../App.module.scss';

export default function Spotify() {
    const {
        songs,
        addSong,
        incrementPlayCount,
        getTopSongs,
        searchSuggestions,
        getRelatedSongs,
        songExists,
    } = useMusicData();

    const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
    const [searchPrefix, setSearchPrefix] = useState<string>('');
    const suggestions = searchPrefix ? searchSuggestions(searchPrefix) : [];

    const handleSelectSong = (songId: number) => {
        setSelectedSongId(songId);
        incrementPlayCount(songId);
    };

    const handleSearchChange = (prefix: string) => {
        setSearchPrefix(prefix);
    };

    const topSongs = getTopSongs(5);

    const relatedSongs = selectedSongId 
        ? getRelatedSongs(selectedSongId).map(id => songs.find(s => s.id === id)).filter(Boolean)
        : [];

    const selectedSong = selectedSongId 
        ? songs.find(s => s.id === selectedSongId)
        : null;

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
            <h1>🎵 Spotify Educativo</h1>
            <p>Plataforma musical con estructuras de datos avanzadas</p>
            </header>
            <div className={styles.grid}>
                <section className={styles.card}>
                <h2>🔍 Buscador Predictivo (Trie)</h2>
                <SearchBar onSearchChange={handleSearchChange} />
                <SuggestionsList 
                    suggestions={suggestions} 
                    songs={songs}
                    onSelectSong={handleSelectSong}
                />
                <div className={styles.info}>
                <small>✅ Búsqueda exacta: {searchPrefix && (songExists(searchPrefix) ? 'Canción existe' : 'No encontrada')}</small>
                </div>
                </section>
                <section className={styles.card}>
                <h2>🏆 Top 5 Popular (Max Heap)</h2>
                <RankingList 
                    songs={topSongs} 
                    onSelectSong={handleSelectSong}
                />
                </section>
                <section className={styles.card}>
                <h2>🎧 Recomendaciones (Grafo)</h2>
                <RecommendationPanel 
                    selectedSong={selectedSong}
                    relatedSongs={relatedSongs}
                    onSelectSong={handleSelectSong}
                />
                </section>
                <section className={styles.card}>
                <h2>➕ Insertar Nueva Canción</h2>
                <AddSongForm 
                    existingSongs={songs}
                    onAddSong={addSong}
                />
                </section>
            </div>
        </div>
    );
};
