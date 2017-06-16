import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMoreTopics, fetchTopicsIfNeeded } from '../actions/RootActions'
import { Visibility, Menu, Button, Segment, Icon, Sidebar, Loader, Dimmer } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import { makeTile } from './MakeTile'
import SearchTags from './SearchTags'
import Missing from './Missing'

class TopicIndex extends Component {

  constructor(props) {
    super(props);
    this.handleScrollBottom = this.handleScrollBottom.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchTopicsIfNeeded())
  }

  handleScrollBottom() {
    this.props.dispatch(fetchMoreTopics());
  }

  render() {
    let grid = <span display="none"></span>;
    let footer = <Missing full icon="newspaper" icon_size="massive"
                    header="No topics left!" />

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
        if (i + 2 < numTopics) {
          rows.push(
            <Row className="show-grid" key={i + 1}>
              <Col className="grid-tile" xs={12} sm={4}> {makeTile(topics, i + 2)} </Col>
              <Col className="grid-tile" xs={12} sm={4}> {makeTile(topics, i + 3)} </Col>
              <Col className="grid-tile" xs={12} sm={4}> {makeTile(topics, i + 4)} </Col>
            </Row>);
        }
      }

      grid = <Grid className="app-shell" id="topic-index">{rows}</Grid>;
      footer = <Missing icon="newspaper" icon_size="massive"
               header="Loading more topics..." />;
    }

    return (<div>
      {grid}
      <Visibility className="topic-index-bottom" onOnScreen={this.handleScrollBottom} once={false}>
        {footer}
      </Visibility>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    loaded: state.topics.loaded,
    topics: state.topics || [],
    nextPage: state.topics.nextPage,
    noMoreTopics: state.noMoreTopics
  }
}

export default connect(mapStateToProps)(TopicIndex)
