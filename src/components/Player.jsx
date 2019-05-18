import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import IconButton from "@material-ui/core/IconButton"
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import YTSearch from "youtube-api-search"
import YouTube from "react-youtube"
const API_KEY = "AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA"

const styles = (theme) => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  },
  pauseIcon: {
    height: 38,
    width: 38
  }
})

function Player(props) {
  // todo: look at changing artist data from array to object. in a couple
  // places it is reduces to an object for quick look. perhaps the main data
  // type should be an object, then for rendering an array.
  const { classes, theme, selected = {}, artists } = props
  const { name } = selected
  const artistsMap = artists.reduce(
    (acc, curr) => Object.assign(acc, { [curr.id]: curr }),
    {}
  )

  const [videos, setVideos] = useState()
  const [selectedVideoIndex, setSelectedVideosIndex] = useState()
  const [artist, setArtist] = useState()
  const [playing, setPlaying] = useState(false)

  const togglePlaying = () => setPlaying(!playing)

  const nextVideo = () => {
    if (selectedVideoIndex + 1 < videos.length) {
      setSelectedVideosIndex(selectedVideoIndex + 1)
    }
  }

  const prevVideo = () => {
    if (selectedVideoIndex - 1 >= 0) {
      setSelectedVideosIndex(selectedVideoIndex - 1)
    }
  }

  const getVideoToPlay = () => {
    if (videos && videos.length) {
      const {
        id: { videoId }
      } = videos[selectedVideoIndex]

      return videoId
    }

    return ""
  }

  if (artist !== name) {
    if (name) {
      YTSearch({ key: API_KEY, term: name }, (vids) => {
        setVideos(vids)
        console.log(vids)

        setSelectedVideosIndex(0)
      })
    }
    setArtist(name)
  }

  return (
    <Fragment>
      <Card className={classes.card}>
        <div className={classes.details}>
          <div className={classes.controls}>
            <IconButton aria-label="Previous" onClick={prevVideo}>
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            {!playing ? (
              <IconButton aria-label="Play" onClick={togglePlaying}>
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
            ) : (
              <IconButton aria-label="Pause" onClick={togglePlaying}>
                <PauseIcon className={classes.pauseIcon} />
              </IconButton>
            )}
            <IconButton aria-label="Next" onClick={nextVideo}>
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </div>
        </div>
      </Card>
      {name || "no artist selected"}
      {selectedVideoIndex}
      {playing && (
        <YouTube
          videoId={getVideoToPlay()}
          opts={{ height: "0", width: "0", playerVars: { autoplay: 1 } }}
        />
      )}
    </Fragment>
  )
}

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  // todo: shape
  selected: PropTypes.object
}

export default withStyles(styles, { withTheme: true })(Player)
