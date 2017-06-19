import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopicsIfNeeded, fetchMoreTopics, fetchTopics } from '../actions/RootActions'
import { fetchTags, filterByTag, fetchTopicsForTag, hideTags } from '../actions/TagActions'
import { Visibility, Button, Segment, List } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import { makeTile } from './MakeTile'
import Missing from './Missing'
import Globals from '../globals'

class TopicIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tag: props.match.params.tag || false,
      curTagName: ""
    }
    this.handleScrollBottom = this.handleScrollBottom.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchTopicsIfNeeded())
    this.props.dispatch(fetchTags())
    if (this.state.tag) {
      this.props.dispatch(fetchTopicsForTag(this.state.tag))
      this.props.dispatch(filterByTag(this.state.tag))
    }
  }

  handleScrollBottom() {
    if (!this.props.tags.currentFilter)
      this.props.dispatch(fetchMoreTopics());
  }

  handleTagClick(e, tag) {
    if (this.props.tags.currentFilter !== tag.id) {
      this.props.dispatch(fetchTopicsForTag(tag.id))
      this.props.dispatch(filterByTag(tag.id))
    } else {
      this.props.dispatch(hideTags())
      this.props.dispatch(fetchTopics(Globals.BACKEND_URL + "/topics/"))
      this.props.dispatch(filterByTag(false))
    }
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
    let result = []
    Object.keys(this.props.tags.items).forEach((id) => {
      const tag = this.props.tags.items[id]
      result.push(
      <Button key={id} active={this.props.tags.currentFilter === id}
              onClick={(e) => this.handleTagClick(e, tag)}>
        {tag.name}
      </Button>)
    })
    return result
  }

  render() {
    let grid = <span display="none"></span>;
    let footerText = "Loading more topics...";

    if (this.props.loaded) {
      let topics = this.filterTopics()
      let rows = this.makeTileGrid(topics)
      grid = <Grid id="topic-index">
        {this.props.tags.currentFilter &&
            <Row style={{padding: "2rem", fontSize: "6rem"}}>
              <Col xs={12}> <h1>{this.props.tags.items[this.props.tags.currentFilter].name}</h1></Col>
            </Row>}
        {rows}</Grid>;
      footerText = "No topics left!"
    }

    let tags = (this.props.tags.isFetching) ? null : this.makeTagGrid()
    let tags_style = (this.props.tags.showing) ? {display: "inline-block"} : {display: "none"}

    return (<div className="app-shell">
            <Segment id="tag-drawer" style={tags_style} raised>
              {/* <Grid>
                 <Row> */}
                {/* <List horizontal> */}
                <div id="tag-drawer-inner">
                  {tags}
                </div>
                {/* </List> */}
                {/* </Row>
              </Grid> */}
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
