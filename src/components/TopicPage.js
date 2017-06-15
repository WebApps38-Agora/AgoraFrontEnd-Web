import React, { Component } from 'react';
import { connect } from 'react-redux'

import { List, Icon } from 'semantic-ui-react'
import { Grid, Col } from 'react-bootstrap'

import TopicViews from './TopicViews'
import ArticleCard from './ArticleCard'

import { selectTopic } from '../actions/TopicActions'
import { fetchTopic } from '../actions/TopicActions'

import ReactHeight from 'react-height'
import Infinite from 'react-infinite'

var moment = require('moment');
var MediaQuery = require('react-responsive');

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      height: 0,
      titleHeight: 0
    };
    this.getTitleHeight = this.getTitleHeight.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(selectTopic(this.state.id))
    this.props.dispatch(fetchTopic(this.state.id))
  }

  setTitleHeight(titleHeight) {
    console.log(titleHeight);
    this.setState({titleHeight: titleHeight});
  }

  getTitleHeight() {
    return this.state.titleHeight;
  }

  getCardList(cards) {
    if (!cards.length) {
      return (<div className="missing">
                <div className="missing-inner">
                  <Icon name="newspaper" size="big" />
                  <h1>No headlines on this topic!</h1>
                </div>
              </div>);
    }

    if (this.state.height) {
      return (<Infinite className="inf-list" containerHeight={this.state.height} elementHeight={51}>
                <List relaxed >
                  {cards}
                </List>
              </Infinite>);
    }
  }

  render() {
    if (!this.props.isFetching) {
      console.log(this.props.topic)
      let cards = this.props.topic.article_set.map((article, index) =>
        <List.Item key={index}>
          <ArticleCard id={index} article={article} handleStepClick={this.handleStepClick}/>
        </List.Item>
      )

      let card_list = this.getCardList(cards);

      return (
        <Grid className="app-shell" id="topic-page">
          {/* <Row> */}
            <Col id="topic-views" xs={12} sm={8} mdOffset={1} md={7}>
                <ReactHeight className="title-card" onHeightReady={ height => this.setState({ titleHeight: height}) }>
                  <ArticleCard id="title-card-card"
                             article={null} title={this.props.topic.title}
                             right_subtitle={moment(this.props.topic.published_at).format("dddd, MMMM Do YYYY")}
                             left_subtitle={moment(this.props.topic.published_at).fromNow()} />
                </ReactHeight>
              <TopicViews isFetching={this.props.isFetching} topic={this.props.topic} titleHeight={this.state.titleHeight} />
            </Col>

            <ReactHeight style={{height: "calc(100% - 51px - 2rem)"}} onHeightReady={ height => this.setState({ height: height }) }>
              <Col id="topic-headlines" xsHidden sm={4} md={3} mdOffset={1}>
                  <ArticleCard article={null} title="Headlines" center/>
                  {card_list}
              </Col>
            </ReactHeight>
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
