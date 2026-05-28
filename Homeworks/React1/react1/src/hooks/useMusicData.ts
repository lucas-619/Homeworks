import { useState, useCallback, useRef } from 'react';
import { Trie } from '../structures/Trie';
import { MaxHeap } from '../structures/MaxHeap';
import { Graph } from '../structures/Graph';
import type { Song, SongInput } from '../components/types/song';

const INITIAL_SONGS: Song[] = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', playCount: 1245, relatedIds: [2, 3] },
  { id: 2, title: 'Imagine', artist: 'John Lennon', playCount: 982, relatedIds: [1, 4] },
  { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', playCount: 2150, relatedIds: [1, 5] },
  { id: 4, title: 'Hey Jude', artist: 'The Beatles', playCount: 876, relatedIds: [2, 6] },
  { id: 5, title: 'Rolling in the Deep', artist: 'Adele', playCount: 1100, relatedIds: [3, 7] },
  { id: 6, title: 'Stairway to Heaven', artist: 'Led Zeppelin', playCount: 745, relatedIds: [4, 8] },
  { id: 7, title: 'Blinding Lights', artist: 'The Weeknd', playCount: 1890, relatedIds: [5, 9] },
  { id: 8, title: 'Smells Like Teen Spirit', artist: 'Nirvana', playCount: 890, relatedIds: [6, 10] },
  { id: 9, title: 'Lose Yourself', artist: 'Eminem', playCount: 1090, relatedIds: [7] },
  { id: 10, title: 'Hallelujah', artist: 'Leonard Cohen', playCount: 670, relatedIds: [8] },
];

// Builds all three data structures from a songs array and returns them.
// Called synchronously so refs are always up-to-date before the next render.
function buildStructures(currentSongs: Song[]) {
  const trie = new Trie();
  const heap = new MaxHeap();
  const graph = new Graph();

  currentSongs.forEach(song => {
    trie.insert(song.title);
    heap.insert({ id: song.id, playCount: song.playCount });
    graph.addNode(song.id);
  });

  currentSongs.forEach(song => {
    song.relatedIds.forEach(relatedId => {
      if (currentSongs.some(s => s.id === relatedId)) {
        graph.addEdge(song.id, relatedId);
      }
    });
  });

  return { trie, heap, graph };
}

export const useMusicData = () => {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);

  // Initialise refs synchronously — no useEffect needed.
  const trieRef = useRef<Trie | null>(null);
  const heapRef = useRef<MaxHeap | null>(null);
  const graphRef = useRef<Graph | null>(null);
  const nextIdRef = useRef(INITIAL_SONGS.length + 1);

  // Lazy init on first render
  if (!trieRef.current) {
    const { trie, heap, graph } = buildStructures(INITIAL_SONGS);
    trieRef.current = trie;
    heapRef.current = heap;
    graphRef.current = graph;
  }

  const addSong = useCallback((songInput: SongInput) => {
    const newId = nextIdRef.current++;
    setSongs(prev => {
      const newSong: Song = {
        ...songInput,
        id: newId,
        relatedIds: songInput.relatedIds.filter(id => prev.some(s => s.id === id)),
      };
      const updated = [...prev, newSong];
      // Rebuild synchronously so refs are ready before next render
      const { trie, heap, graph } = buildStructures(updated);
      trieRef.current = trie;
      heapRef.current = heap;
      graphRef.current = graph;
      return updated;
    });
  }, []);

  const incrementPlayCount = useCallback((songId: number) => {
    setSongs(prev => {
      const updated = prev.map(song =>
        song.id === songId ? { ...song, playCount: song.playCount + 1 } : song
      );
      // Rebuild synchronously so getTopSongs always reads fresh playCount values
      const { trie, heap, graph } = buildStructures(updated);
      trieRef.current = trie;
      heapRef.current = heap;
      graphRef.current = graph;
      return updated;
    });
  }, []);

  const getTopSongs = useCallback((k: number): Song[] => {
    // heapRef is always up-to-date because we rebuild inside setSongs updaters
    const topHeapItems = heapRef.current!.getTopK(k);
    return topHeapItems
      .map(item => songs.find(song => song.id === item.id))
      .filter((song): song is Song => song !== undefined);
  }, [songs]);

  const searchSuggestions = useCallback((prefix: string): string[] => {
    if (!prefix.trim()) return [];
    return trieRef.current!.startsWith(prefix);
  }, []);

  const getRelatedSongs = useCallback((songId: number): number[] => {
    return graphRef.current!.getNeighbors(songId);
  }, []);

  const songExists = useCallback((title: string): boolean => {
    return trieRef.current!.search(title);
  }, []);

  return {
    songs,
    addSong,
    incrementPlayCount,
    getTopSongs,
    searchSuggestions,
    getRelatedSongs,
    songExists,
    trie: trieRef.current!,
    maxHeap: heapRef.current!,
    graph: graphRef.current!,
  };
};