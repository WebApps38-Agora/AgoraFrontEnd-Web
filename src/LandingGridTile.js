import React from 'react';
import { Link } from 'react-router-dom'
import VisibilitySensor from 'react-visibility-sensor';
import { Icon } from 'semantic-ui-react';
import './Card.css';

var moment = require('moment');



const LandingGridTile = (props) => (
  <VisibilitySensor>
    <Link to={props.to}>
      <div className="card" style={{backgroundImage: 'url(' + props.src + ')'}}>
        <div className='card-title'>
          <h3>{props.title}</h3>
          <span className='card-date'>
            {moment(props.published_at).format("dddd, MMMM Do YYYY")}
          </span>
          <span style={{float: "right"}} className='card-view'>
            <Icon name='unhide' />
            {props.views}
          </span>
        </div>
      </div>
    </Link>
  </VisibilitySensor>
)

export default LandingGridTile
