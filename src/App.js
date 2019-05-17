import React, { useState } from "react"
import Artists from "./components/Artists"
import artists from "./data/artists.json"
import InitArtistUtil from "./util/artist.util"
import storageUtil from "./util/localstorage.util"
import Player from "./components/Player"

// data setup
const cached = storageUtil.getArtists()

const map = cached.artists.reduce(
  (acc, curr) => Object.assign(acc, { [curr.id]: curr }),
  {}
)

const artistData = artists.map((artist) =>
  Object.assign(artist, {
    util: InitArtistUtil({ artist, storage: storageUtil }),
    rating: map[artist.id] && map[artist.id].rating
  })
)

function App() {
  const [selectedArtist, changeSelectedArtist] = useState()

  return (
    <div className="App">
      <Artists
        artists={artistData}
        storageUtil={storageUtil}
        changeSelectedArtist={changeSelectedArtist}
      />
      <Player selected={selectedArtist} artists={artistData} />
    </div>
  )
}

export default App
