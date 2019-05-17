import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import IconButton from "@material-ui/core/IconButton"
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import YTSearch from "youtube-api-search"
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
  }
})

function Player(props) {
  // todo: look at changing artist data from array to object. in a couple
  // places it is reduces to an object for quick look. perhaps the main data
  // type should be an object, then for rendering an array.
  const NONE_SELECTED_KEY = "no artist selected"
  const { classes, theme, selected = {}, artists } = props
  const { name = NONE_SELECTED_KEY } = selected
  const artistsMap = artists.reduce(
    (acc, curr) => Object.assign(acc, { [curr.id]: curr }),
    {}
  )

  const [videos, setVideos] = useState()
  // maintain component internal state to diff the selected artist
  const [artist, setArtist] = useState()

  debugger
  if (!artist || artist !== name) {
    debugger
    return setArtist(name)
  }

  debugger
  if (artist !== NONE_SELECTED_KEY && artist !== name) {
    YTSearch({ key: API_KEY, term: name || "" }, (vids) => {
      debugger
      setVideos(vids)
      console.log(vids)
    })
  }

  return (
    <Fragment>
      <Card className={classes.card}>
        <div className={classes.details}>
          <div className={classes.controls}>
            <IconButton aria-label="Previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="Next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </div>
        </div>
      </Card>
      {name}
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
