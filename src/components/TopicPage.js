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

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      height: 0,
      titleHeight: 112
    };
    this.getTitleHeight = this.getTitleHeight.bind(this);
    this.updateTitleHeight = this.updateTitleHeight.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateTitleHeight);
  }

  componentWillMount() {
    this.props.dispatch(selectTopic(this.state.id))
    this.props.dispatch(fetchTopic(this.state.id))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateTitleHeight);
  }

  getTitleHeight() {
    return this.state.titleHeight;
  }

  updateTitleHeight() {
    if (this.title !== null) {
      console.log(this.title.clientHeight);
      this.setState({titleHeight: this.title.clientHeight})
    }
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
      return (<Infinite className="inf-list" timeScrollStateLastsForAfterUserScrolls={200}
                        containerHeight={this.state.height}
                        elementHeight={51}>
                <List relaxed >
                  {cards}
                </List>
              </Infinite>);
    }
  }

  render() {
    if (!this.props.isFetching) {

      let cards = this.props.topic.article_set.map((article, index) => {
          // TODO: REMOVE BELOW
          if (index < 10) {
            return (<List.Item key={index}>
              <ArticleCard topic={this.props.topic} id={index} article={article} handleStepClick={this.handleStepClick}/>
            </List.Item>);
          }
        }
      )

      let card_list = this.getCardList(cards);

      return (
        <Grid className="app-shell" id="topic-page">
          {/* <Row> */}
            <Col id="topic-views" xs={12} sm={8} mdOffset={1} md={7}>
              <div className="title-card" ref={(e)=> this.title = e}>
                <ReactHeight onHeightReady={ height => this.setState({ titleHeight: height }) }>
                  <ArticleCard id="title-card-card" article={null} title={this.props.topic.title}
                             right_subtitle={moment(this.props.topic.published_at).format("dddd, MMMM Do YYYY")}
                             left_subtitle={moment(this.props.topic.published_at).fromNow()} />
                </ReactHeight>
              </div>
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
