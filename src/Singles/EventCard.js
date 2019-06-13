import React from 'react';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



function EventCard (props) {
	const classes = useStyles();
		return (
			<React.Fragment>
			<Card className={classes.card} onClick={() => props.handleClick(props.id)}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={props.image_url}
						title="Event Image"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
				            {props.description}
				        </Typography>
						<Typography variant="h5" component="h1">
							Location: {props.location}
						</Typography>
				        <Typography variant="h5" component="h1">
							Looking for: {props.size}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			</React.Fragment>
		)
	
}


export default EventCard