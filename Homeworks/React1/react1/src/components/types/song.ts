export interface Song {
  id: number;
  title: string;
  artist: string;
  playCount: number;
  relatedIds: number[];
}

export interface SongInput {
  title: string;
  artist: string;
  playCount: number;
  relatedIds: number[];
}