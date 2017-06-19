import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopicsIfNeeded, fetchMoreTopics } from '../actions/RootActions'
import { fetchTags, filterByTag, fetchTopicsForTag, toggleTags } from '../actions/TagActions'
import { Visibility, Button, Segment } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import { makeTile } from './MakeTile'
import Missing from './Missing'

class TopicIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tag: props.match.params.tag || false
    }
    this.handleScrollBottom = this.handleScrollBottom.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchTopicsIfNeeded())
    this.props.dispatch(fetchTags())
    if (this.state.tag) {
      this.props.dispatch(toggleTags())
      this.props.dispatch(fetchTopicsForTag(Number(this.state.tag)))
      this.props.dispatch(filterByTag(Number(this.state.tag)))
    }
  }

  handleScrollBottom() {
    if (!this.props.tags.currentFilter)
      this.props.dispatch(fetchMoreTopics());
  }

  handleTagClick(e, tag) {
    if (this.props.tags.currentFilter !== tag) {
      this.props.dispatch(fetchTopicsForTag(tag))
      this.props.dispatch(filterByTag(tag))
      return
    }

    this.props.dispatch(filterByTag(false))
  }

  filterTopics() {
    let topics = {result: [], entities: {}}
    if (this.props.tags.currentFilter) {
      this.props.topics.items.result.forEach((topic_id, index) => {
        let topic = this.props.topics.items[topic_id]
        if (topic.tag_set.includes(this.props.tags.currentFilter)) {
          topics[topic.id] = topic
          topics.result.push(topic.id)
        }
      })
    } else {
      topics = this.props.topics.items
    }
    return topics
  }

  makeTileGrid(topics) {
    let rows = [];
    for (var i = 0; i < topics.result.length; i += 5) {
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
    return rows;
  }

  makeTagGrid() {
    return this.props.tags.items.map((tag, index) =>
      <Col key={index} className="tag-col" xs={12} sm={4} md={3}>
        <Button active={this.props.tags.currentFilter === tag.id}
                fluid onClick={(e) => this.handleTagClick(e, tag.id)}>
          {tag.name}
        </Button>
      </Col>
    )
  }

  render() {
    let grid = <span display="none"></span>;
    let footerText = "No topics left!"

    if (this.props.loaded) {
      let topics = this.filterTopics()
      let rows = this.makeTileGrid(topics)
      grid = <Grid id="topic-index">{rows}</Grid>;
      footerText = "Loading more topics...";
    }

    let tags = (this.props.tags.isFetching) ? null : this.makeTagGrid()
    let tags_style = (this.props.tags.showing) ? {display: "block"} : {display: "none"}

    return (<div className="app-shell">
            <Segment id="tag-drawer" style={tags_style} raised>
              <Grid>
                 <Row>
                  {tags}
                </Row>
              </Grid>
            </Segment>
            {grid}
            <Visibility className="topic-index-bottom" onOnScreen={this.handleScrollBottom} once={false}>
              <Missing full icon="newspaper" icon_size="massive"
                              header={footerText} />
            </Visibility>
          </div>
          );

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
