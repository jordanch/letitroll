export default function initArtistUtil({ artist, storage }) {
  const { name, id, pictureURL } = artist
  let { rating } = artist

  async function updateRating(value) {
    rating = value
    storage.saveArtist({ ...artist, rating: value })

    return value
  }

  function toDb() {
    return {
      name,
      id,
      pictureURL,
      rating
    }
  }

  return {
    updateRating,
    toDb
  }
}
