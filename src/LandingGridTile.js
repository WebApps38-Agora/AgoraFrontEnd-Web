import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './Card.css'

const LandingGridTile = (props) => (
  <Card as={Link} to={props.to} className="Landing-grid-card" fluid={true}>
    <Image src={props.src} />
    <Card.Content>
      <Card.Header>
        {props.title}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {props.published_at}
        </span>
      </Card.Meta>
      <Card.Description>
        Views: {props.views}
      </Card.Description>
    </Card.Content>
    <Card.Content link extra>
        <Icon name='user' />
        22 Friends
    </Card.Content>
  </Card>
)

export default LandingGridTile
