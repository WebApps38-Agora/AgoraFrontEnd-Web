import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopicsIfNeeded, fetchMoreTopics } from '../actions/RootActions'
import { Visibility } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import TopicIndexTile from './TopicIndexTile'
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


      const makeTile = (index) => {
        const topic = topics[Object.keys(topics)[index]]
        return topic &&
          <TopicIndexTile
            to={"/topic/" + topic.id}
            src={topic.images[0]}
            title={topic.title}
            published_at={topic.published_at}
            views={topic.views}
          />
      }

      let rows = [];
      for (var i = 0; i < numTopics; i += 5) {
        rows.push(
          <Row className="show-grid tall-row" key={i}>
            <Col className="grid-tile" xs={12} sm={8}> {makeTile(i)} </Col>
            <Col className="grid-tile" xs={12} sm={4}>  {makeTile(i + 1)} </Col>
          </Row>);
        if (i + 2 < numTopics) {
          rows.push(
            <Row className="show-grid" key={i + 1}>
              <Col className="grid-tile" xs={12} sm={4}> {makeTile(i + 2)} </Col>
              <Col className="grid-tile" xs={12} sm={4}> {makeTile(i + 3)} </Col>
              <Col className="grid-tile" xs={12} sm={4}> {makeTile(i + 4)} </Col>
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
