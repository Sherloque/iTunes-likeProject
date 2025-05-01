const SERVER_URL = "http://localhost:4000";

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${SERVER_URL}/api/auth/login`,
    SIGNUP: `${SERVER_URL}/api/auth/signup`,
    PROFILE_UPDATE: `${SERVER_URL}/api/auth/profile`,
  },

  TRACKS: {
    SEARCH: (value) =>
      `${SERVER_URL}/api/tracks/search?value=${encodeURIComponent(value)}`,
    RECENT_UPLOADS: `${SERVER_URL}/api/tracks/recentuploads`,
    UPLOAD: `${SERVER_URL}/api/tracks/upload`,
    UPLOADED: `${SERVER_URL}/api/tracks/peruploads`,
  },

  PLAYLISTS: {
    USER_PLAYLIST: (userId, type) =>
      `${SERVER_URL}/api/playlists?owner=${userId}&type=${type}`,
    ADD_TRACK: (playlistId) => `${SERVER_URL}/api/playlists/${playlistId}/add`,
    FAVORITES: {
      ADD: `${SERVER_URL}/api/playlists/favor`,
      GET: `${SERVER_URL}/api/playlists/perfavor`,
    },
  },

  EXTERNAL: {
    HOT_CHART: `${SERVER_URL}/api/external/hotchart`,
  },
};
