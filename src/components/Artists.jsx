import React, { useState } from "react"
import PropTypes from "prop-types"
import Artist from "./Artist"

export default function(props) {
  const { artists: artistsData, changeSelectedArtist } = props

  const [artists, updateArtist] = useState(artistsData)

  const artistsMap = artists.reduce(
    (acc, curr) => Object.assign(acc, { [curr.id]: curr }),
    {}
  )

  const updateArtistRating = function({ id, rating }) {
    const artist = artistsMap[id]

    artist.util.updateRating(rating)

    updateArtist(
      artists.map((artist) => {
        if (artist.id === id) {
          return { ...artist, rating }
        }

        return artist
      })
    )
  }

  if (artists.length === 0) {
    return "No artists!"
  }

  return artists.map((artist) => (
    <Artist
      key={artist.id}
      artist={artist}
      rating={artistsMap[artist.id].rating}
      changeSelectedArtist={changeSelectedArtist}
      updateArtistRating={(value) =>
        updateArtistRating({ id: artist.id, rating: value })
      }
    />
  ))
}
