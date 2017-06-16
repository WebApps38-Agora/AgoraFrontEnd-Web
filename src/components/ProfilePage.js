import React, { Component } from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Card, Image, Item, Icon, Statistic } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import { sendLogin, fetchTopicsIfNeeded } from '../actions/TopicIndex'
import { connect } from 'react-redux'
import { makeTile } from './MakeTile'
import { Motion, spring } from 'react-motion'
import { addProfileWarning, fetchProfile } from '../actions/ProfileActions'
import PoliticalChart from './PoliticalChart'
import ArticleCard from './ArticleCard'

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
    if (this.props.loginKey) {
      // this.props.dispatch(fetchTopicsIfNeeded())
      this.props.dispatch(fetchProfile())
    }
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
    if(!this.props.loginKey) {
      this.props.dispatch(addProfileWarning())
      return <Redirect to='/login' />
    }

    let profile =  {
                      image: this.props.myProfile.profile_picture,
                      header: this.props.myProfile.first_name + " " + this.props.myProfile.last_name,
                      extra: <Button floated='right'> Edit </Button>,
                   }

    const topics = this.props.topics.items

    const commentedOn = commented.map((id, index) =>
      <Row className="show-grid tall-row" key={index}>
        <Col className="grid-tile" xs={12}>  {makeTile(topics, id)} </Col>
      </Row>
    )


    return (
      <div>
        <ArticleCard style={{padding: "3rem", }} article={null} title={profile.header} left_subtitle="Joined a week ago" right_subtitle="Level 1"/>
        <Grid style={{padding: "3rem", }}>
          <Col className="grid-tile" xs={12} sm={4}>
            <Statistic.Group widths={1}>
              <Statistic>
                <Statistic.Value>
                  <Icon name='eye' />
                </Statistic.Value>
                <Statistic.Label>0 Views</Statistic.Label>
              </Statistic>
            </Statistic.Group>
              {/* {commentedOn} */}
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
              {/* {commentedOn} */}
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
              {/* {commentedOn} */}
          </Col>
        </Grid>
        <PoliticalChart />
    </div>
  )}
}

const mapStateToProps = (state) => {
  return {
    loginKey: state.loginKey,
    profileWarnings: state.profileWarnings,
    topics: state.topics || [],
    myProfile: state.myProfile
  }
}

export default connect(mapStateToProps)(ProfilePage)
