import React, { Component } from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Image, Item, Icon, Statistic } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import { sendLogin } from '../actions/TopicIndex'
import { connect } from 'react-redux'
import { fetchTopicsIfNeeded } from '../actions/TopicIndex'
import { makeTile } from './MakeTile'
import { Motion, spring } from 'react-motion'
import PoliticalChart from './PoliticalChart'

const commented = [
  1,2,3,4,5
]

const items = [
  {
    image: '/assets/images/wireframe/image.png',
    header: 'Name',
    description: 'Description',
    meta: 'Joined since ...',
    extra: <Button floated='right'> Edit </Button>,
  },
]

class ProfilePage extends Component {
  componentWillMount() {
    this.props.dispatch(fetchTopicsIfNeeded())
  }

  handleResponse = (data) => {
    console.log(data);

    fetch('https://graph.facebook.com/'+data.profile.id+'/picture')
  	.then(function(response) {
  	  return response.blob();
  	})
  	.then(function(imageBlob) {
  	  document.querySelector('img').src = URL.createObjectURL(imageBlob);
  	});

    this.props.dispatch(sendLogin(data.tokenDetail.accessToken))
  }


  handleError = (error) => {
    console.log(error)
    this.setState({ error });
  }

  handleclick = (e,x,y) => {
    console.log(x);
    console.log(y);
  }

  render() {
    const topics = this.props.topics.items
    // const numTopics = Object.keys(topics).length

    const commentedOn = commented.map((id, index) =>
      <Row className="show-grid tall-row" key={index}>
        <Col className="grid-tile" xs={12}>  {makeTile(topics, id)} </Col>
      </Row>
    )

    return (

      <div>
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1, {stiffness:5, damping: 15}) }}>
          { (style) => <h1 style={style}>Profile Page</h1> }
        </Motion>
        <Grid>
          <Col xs={12} sm={6}>
            <Item.Group items={items} />
          </Col>
          <Col xs={12} sm={6}>
            <PoliticalChart />
          </Col>
        </Grid>
        <Divider horizontal></Divider>
        <Grid>
          <Col className="grid-tile" xs={12} sm={4}>
            <Statistic.Group widths={1}>
              <Statistic>
                <Statistic.Value>
                  <Icon name='eye' />
                </Statistic.Value>
                <Statistic.Label>0 Views</Statistic.Label>
              </Statistic>
            </Statistic.Group>
              {commentedOn}
          </Col>
          <Col className="grid-tile" xs={12} sm={4}>
            <Statistic.Group widths={1}>
              <Statistic>
                <Statistic.Value>
                  <Icon name='comments outline' />
                </Statistic.Value>
                <Statistic.Label>0 Comments</Statistic.Label>
              </Statistic>
            </Statistic.Group>
              {commentedOn}
          </Col>
          <Col className="grid-tile" xs={12} sm={4}>
            <Statistic.Group widths={1}>
              <Statistic>
                <Statistic.Value>
                  <Icon name='checkmark box'/>
                </Statistic.Value>
                <Statistic.Label>0 Facts</Statistic.Label>
              </Statistic>
            </Statistic.Group>
              {commentedOn}
          </Col>
        </Grid>

    </div>
  )}
}

const mapStateToProps = (state, ownProps) => {
  return {
    loaded: state.topics.loaded,
    loginKey: state.loginKey,
    id: state.facebookId,
    topics: state.topics || []
  }
}
export default connect(mapStateToProps)(ProfilePage)
