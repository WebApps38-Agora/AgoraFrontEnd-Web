import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMoreTopics, fetchTopicsIfNeeded } from '../actions/RootActions'
import { Visibility, Menu, Button, Label, Segment, Icon, Sidebar, Loader, Dimmer } from 'semantic-ui-react'
import { fetchTags, filterByTag } from '../actions/TagActions'
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
    // this.props.dispatch(fetchTags())
  }

  handleScrollBottom() {
    this.props.dispatch(fetchMoreTopics());
  }

  handleTagClick(e, tag) {
    // this.props.dispatch(filterByTag(tag))
  }

  render() {
    let grid = <span display="none"></span>;
    let footer = <Missing full icon="newspaper" icon_size="massive"
                    header="No topics left!" />

    if (this.props.loaded) {
      let topics = {}

      if (this.props.tags.currentFilter) {
        this.props.topics.items.forEach((topic, index) => {
          console.log("topics in current tag")
          console.log(topic.id)
          console.log(this.props.tags.items[this.props.tags.currentFilter].topics)
          if (this.props.tags.items[this.props.tags.currentFilter].topics.includes(topic.id)) {
            topics[topic.id] = topic
          }
        })
      } else {
        topics = this.props.topics.items
      }

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

      grid = <Grid className="app-shell" id="topic-index">{rows}</Grid>;
      footer = <Missing icon="newspaper" icon_size="massive"
               header="Loading more topics..." />;
    }
    //
    // let tags = null
    // if (!this.props.tags.isFetching) {
    //   tags = this.props.tags.items.map((tag, index) =>
    //     <a>
    //       <Label onClick={(e) => this.handleTagClick(e, tag.id)} key={index}>{tag.name}</Label>
    //     </a>
    //   )
    // }

    return (<div>
      {/* <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible icon='labeled' vertical>
            {tags}
          </Sidebar>
          <Sidebar.Pusher> */}
      {grid}
      <Visibility className="topic-index-bottom" onOnScreen={this.handleScrollBottom} once={false}>
        {footer}
      </Visibility>
          {/* </Sidebar.Pusher> */}
        {/* </Sidebar.Pushable> */}
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    loaded: state.topics.loaded,
    topics: state.topics || [],
    nextPage: state.topics.nextPage,
    noMoreTopics: state.noMoreTopics,
    tags: state.tags || [],
  }
}

export default connect(mapStateToProps)(TopicIndex)
