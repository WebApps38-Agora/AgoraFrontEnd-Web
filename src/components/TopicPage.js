import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Card, List } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'

import TopicViews from './TopicViews'
import ArticleCard from './ArticleCard'

import { selectTopic } from '../actions/TopicIndex'
import { fetchTopic } from '../actions/TopicPage'

import ReactHeight from 'react-height'
var moment = require('moment');

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      height: 0
    };
    this.getHeight = this.getHeight.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(selectTopic(this.state.id))
    this.props.dispatch(fetchTopic(this.state.id))
  }

  componentDidMount() {
    console.log(this.props.children);
  }

  setHeight(height) {
    if (height) {
      this.setState({height: height});
    }
  }

  getHeight() {
    return this.state.height;
  }

  render() {
    if (!this.props.isFetching) {
      let cards = this.props.topic.article_set.map((article, index) =>
        <List.Item key={index}>
          <ArticleCard id={index} article={article} handleStepClick={this.handleStepClick}/>
        </List.Item>
      )

      return (
        <Grid id="topic-page">
          {/* <Row> */}
            <Col id="topic-headlines" xs={12} sm={4} smPush={8} md={3} mdPush={9}>
              <List relaxed>
                <ArticleCard article={null} title="Headlines" center/>
                {cards}
              </List>
            </Col>

            <Col id="topic-views" xs={12} sm={8} smPull={4} md={7} mdPull={2}>
              <ReactHeight className="title-card" onHeightReady={ height => this.setHeight(height) }>
                <ArticleCard article={null} title={this.props.topic.title}
                           right_subtitle={moment(this.props.topic.published_at).format("dddd, MMMM Do YYYY")}
                           left_subtitle={moment(this.props.topic.published_at).fromNow()} />
              </ReactHeight>
              <TopicViews titleHeight={this.state.height} />
            </Col>
          {/* </Row> */}
        </Grid>
      )
    } else {
      return <div></div>
    }
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching:    Object.keys(state.topics.items).length === 0
                || !(state.selectedTopic in state.topics.items)
                || state.topics.items[state.selectedTopic].isFetching,
    topic: state.topics.items[state.selectedTopic] || {},
    nextPage: state.topics.nextPage
  }
}

export default connect(mapStateToProps)(TopicPage)
