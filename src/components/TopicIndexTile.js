import React from 'react';
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react';
import '../style/TopicIndexTile.css';

var moment = require('moment');

const TopicIndexTile = (props) => (
    <Link to={props.to}>
      <div className="topic-card" style={{backgroundImage: 'url(' + props.src + ')'}}>
        <div className='topic-card-title'>
          <h3>{props.title}</h3>
          <span className='topic-card-date'>
            {moment(props.published_at).format("dddd, MMMM Do YYYY")}
          </span>
          <span style={{float: "right"}} className='topic-card-view'>
            <Icon name='unhide' />
            {props.views}
          </span>
        </div>
      </div>
    </Link>
)

export default TopicIndexTile
