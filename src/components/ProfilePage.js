import React, { Component } from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Image, Item, Icon, Form, Message } from 'semantic-ui-react'
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
      <Divider>
      <Row className="show-grid tall-row" key={index}>
        <Col className="grid-tile" xs={12}>  {makeTile(topics, id)} </Col>
      </Row>
    </Divider>
    )

    const makeRow = (c1, c2, y) => {
      let rows = []
      for (var x = 0; x < 20; x++) {
        let c = x < 10 ? c1 : c2
        let _x = x
        rows.push(<div key={`$(x)`+`$(y)`}
                       onClick={(e) => this.handleclick(e,_x,y)}
                       style={{width: '100%', height: '20px', backgroundColor: c, border: 'solid black'}}></div>)
      }
      return <div style={{display: 'flex', flexWrap: 'nowrap'}}>
              {rows}
             </div>
    }

    let grid = []
    for (var y = 0; y < 10; y++) {
      let c1 = y < 5 ? '#4286f4' : '#9af441'
      let c2 = y < 5 ? '#f44162' : '#f441d6'
      grid.push(<div key={y + 'row'}>makeRow(c1, c2, y)</div>)
    }

    return (

      <div>
        <PoliticalChart />
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1, {stiffness:5, damping: 15}) }}>
          { (style) => <h1 style={style}>Profile Page</h1> }
        </Motion>
        <Segment loading>
          <Image src='/assets/images/wireframe/image.png' size='small' />
        </Segment>
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            We are fetching that content for you.
          </Message.Content>
        </Message>
        <Item.Group items={items} />
        <Divider horizontal>Recent Activity</Divider>
        <Grid>
          <Col className="grid-tile" xs={12} sm={4}>
              <h3> Viewed </h3>
              {commentedOn}
          </Col>
          <Col className="grid-tile" xs={12} sm={4}>
              <h3> Commented </h3>
              {commentedOn}
          </Col>
          <Col className="grid-tile" xs={12} sm={4}>
              <h3> Proposed Facts </h3>
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
