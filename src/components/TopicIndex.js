import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopicsIfNeeded } from '../actions/RootActions'
import { Menu, Button, Segment, Icon, Sidebar, Loader, Dimmer } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import { makeTile } from './MakeTile'
import SearchTags from './SearchTags'

class TopicIndex extends Component {

  componentWillMount() {
    this.props.dispatch(fetchTopicsIfNeeded())
  }

  render() {
    if (this.props.loaded) {
      const topics = this.props.topics.items
      const numTopics = Object.keys(topics).length

      let rows = [];
      for (var i = 0; i < numTopics; i += 5) {
        rows.push(
          <Row className="show-grid tall-row" key={i}>
            <Col className="grid-tile" xs={12} sm={8}> {makeTile(topics, i)} </Col>
            <Col className="grid-tile" xs={12} sm={4}>  {makeTile(topics, i + 1)} </Col>
          </Row>);
        rows.push(
          <Row className="show-grid" key={i + 1}>
            <Col className="grid-tile" xs={12} sm={4}> {makeTile(topics, i + 2)} </Col>
            <Col className="grid-tile" xs={12} sm={4}> {makeTile(topics, i + 3)} </Col>
            <Col className="grid-tile" xs={12} sm={4}> {makeTile(topics, i + 4)} </Col>
          </Row>);
      }

      return <div>
               <SearchTags />
               <Grid className="app-shell" id="topic-index">{rows}</Grid>;
             </div>
    } else {
      return <Dimmer active><Loader>Loading the latest topics</Loader></Dimmer>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loaded: state.topics.loaded,
    topics: state.topics || [],
    nextPage: state.topics.nextPage
  }
}

export default connect(mapStateToProps)(TopicIndex)
