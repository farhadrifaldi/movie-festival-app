export interface movie {
  id?: string;
  title: string;
  image: string;
  description: string;
  duration: number; // in seconds
  genres: string;
  artists: string;
  url: string;
  created_at: string;
  release_date?: string;
}

export const SAMPLE_DATA: movie = {
  title: "CAGE-FACE CASE 1: THE MINE - Alur Cerita Game (Alex Olinkiewicz)",
  image: '/thumbnail.jpg',
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duration: 100000,
  genres: "Horor, Adventure, Games",
  artists: "Droomp A, Droomp R",
  url: "https://www.youtube.com/watch?v=video_id",
  release_date: "2022-01-01T00:00:00.000Z",
  created_at: "2022-01-01T00:00:00.000Z"
}

export const SAMPLE_DATA_COLLECTIONS: movie[] = [0, 1, 2, 3, 4].map((id) => {
  return {
    ...SAMPLE_DATA, id: id.toString()
  }
})
