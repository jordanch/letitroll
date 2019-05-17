import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Rating from "material-ui-rating"

const styles = (theme) => ({
  card: {
    display: "inline-flex"
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

function MediaControlCard(props) {
  const {
    classes,
    artist,
    updateArtistRating,
    rating,
    changeSelectedArtist
  } = props
  const { id, name, pictureURL } = artist

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Rating
            value={rating}
            max={3}
            onChange={(value) => updateArtistRating(value)}
          />
        </div>
      </div>
      <CardMedia
        onClick={() => changeSelectedArtist(artist)}
        className={classes.cover}
        image={pictureURL}
        title="Live from space album cover"
      />
    </Card>
  )
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pictureURL: PropTypes.string.isRequired
  }).isRequired,
  rating: PropTypes.number.isRequired,
  updateArtistRating: PropTypes.func.isRequired,
  changeSelectedArtist: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(MediaControlCard)
