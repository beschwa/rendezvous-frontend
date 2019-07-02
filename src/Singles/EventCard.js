import React from 'react';
// import Card from '@material-ui/core/Card';
import { Card, Icon } from 'semantic-ui-react'
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

	const extra = () => {
	  return <a>
	    <Icon name='user' />
	   	{props.space_left} space left.
	  </a>
	}

	const renderCard = () =>{
		return <Card
					onClick={() => props.handleClick(props.id)}
					image={props.image_url}
					header={props.name}
					description={props.description}
					extra={extra()}
				/>
	}



	const renderCardHTML = () => {
		return <div className="mycard" onClick={() => props.handleClick(props.id)}>
				<div className="img" style={{backgroundImage:`url(${props.image_url})`}}/>
				<h4>{props.name}</h4>
				<h5>Space Left: {props.space_left}</h5>
				<p>{props.description}</p>
				</div>
	}


	const classes = useStyles();
		return (
			<React.Fragment>
			{renderCard()}
			</React.Fragment>
		)
	
}


export default EventCard