import React from 'react';
import { Link } from 'react-router-dom'
import VisibilitySensor from 'react-visibility-sensor';
import { Icon } from 'semantic-ui-react';
import { Motion, spring } from 'react-motion'
import '../style/TopicIndexTile.css';

var moment = require('moment');

const TopicIndexTile = (props) => (
  <VisibilitySensor>
    <Link to={props.to}>
      <Motion defaultStyle={{
                o: 0
              }}
              style={{
                o: spring(1)
              }}>
                {style => {
                  const { o } = style
        return <div className="topic-card" style={{opacity: o, backgroundImage: 'url(' + props.src + ')'}}>
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
      }}
      </Motion>
    </Link>
  </VisibilitySensor>
)

export default TopicIndexTile
