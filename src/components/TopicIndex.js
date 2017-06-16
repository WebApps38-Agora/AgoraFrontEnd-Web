import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopicsIfNeeded, fetchMoreTopics } from '../actions/RootActions'
import { fetchTags, filterByTag, fetchTopicsForTag } from '../actions/TagActions'
import { Visibility, Sidebar, Segment, Label, Menu, List, Button } from 'semantic-ui-react'
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
    this.props.dispatch(fetchTags())
  }

  handleScrollBottom() {
    this.props.dispatch(fetchMoreTopics());
  }

  handleTagClick(e, tag) {
    this.props.dispatch(fetchTopicsForTag(tag))
    this.props.dispatch(filterByTag(tag))
  }

  render() {
    let grid = <span display="none"></span>;
    let footer = <Missing full icon="newspaper" icon_size="massive"
                    header="No topics left!" />

    if (this.props.loaded) {
      let topics = {}

      if (this.props.tags.currentFilter) {
        this.props.topics.items.forEach((topic, index) => {
          if (topic.tag_set.includes(this.props.tags.currentFilter)) {
            topics[topic.id] = topic
          }
        })
      } else {
        topics = this.props.topics.items
      }

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

    let tags = null
    if (!this.props.tags.isFetching) {
      tags = this.props.tags.items.map((tag, index) =>
        <List.Item>
          <List.Content>
            <Button onClick={(e) => this.handleTagClick(e, tag.id)} key={index}>{tag.name}</Button>
          </List.Content>
        </List.Item>
      )
    }

    return (<div>
      <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible icon='labeled' vertical>
            <List>
              {tags}
            </List>
          </Sidebar>
          <Sidebar.Pusher>
            {grid}
            <Visibility className="topic-index-bottom" onOnScreen={this.handleScrollBottom} once={false}>
              {footer}
            </Visibility>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
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
