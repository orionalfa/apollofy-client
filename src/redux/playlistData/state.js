// const history = JSON.parse(localStorage.getItem("trackHistory"));
// let initialHistoryPosition = 0;

// if (history) {
//   initialHistoryPosition = history.length - 2;
//   if (initialHistoryPosition < 0) {
//     initialHistoryPosition = 0;
//   }
// }

const initialPlaylistState = {
  playlistObject: {
    title: "",
    description: "",
    tracks: [],
    genres: "",
    private: "",
    urlImage: "",
    owner: "object id",
    totalLikes: 0,
  },
  reloadPlaylistFetch: true,
};
export default initialPlaylistState;
