const storageKey = "letitroll:"

export default {
  getArtists,
  saveArtist
}

function getArtists() {
  return (
    JSON.parse(localStorage.getItem(storageKey)) || {
      artists: []
    }
  )
}

function saveArtist(artist) {
  const { util } = artist
  const { artists } = getArtists()
  // we have a new artist, it either exists in existing data or needs to be added.
  const index = artists.findIndex((a) => a.id === artist.id)

  if (index > -1) {
    artists.splice(index, 1, util.toDb())
  } else {
    artists.push(util.toDb())
  }

  localStorage.setItem(storageKey, JSON.stringify({ artists }))
}
