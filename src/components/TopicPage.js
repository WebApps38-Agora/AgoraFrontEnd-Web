import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Card, List } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'

import TopicViews from './TopicViews'
import ArticleCard from './ArticleCard'
import '../style/TopicIndexTile.css'

import { selectTopic } from '../actions/TopicIndex'
import { fetchTopic } from '../actions/TopicPage'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    };
  }

  componentWillMount() {
    this.props.dispatch(selectTopic(this.state.id))
    this.props.dispatch(fetchTopic(this.state.id))
  }

  render() {
    if (!this.props.isFetching) {
      let cards = this.props.topic.article_set.map((article, index) =>
        <List.Item key={index}>
          <ArticleCard id={index} article={article} handleStepClick={this.handleStepClick}/>
        </List.Item>
      )

      return (
        <div className="app-shell">
          <Grid>
            <Row>
              <Col style={{padding:0}} className="Grid-column" xs={9} md={7} mdOffset={1}>
                <TopicViews />
              </Col>

              <Col style={{padding:0}} className="Grid-column" xs={3} md={3} mdOffset={1}>
                <List relaxed>
                  <Card id={this.props.id} className="article" raised fluid >
                    <Card.Content>
                        <Card.Header>
                          HEADLINES
                        </Card.Header>
                    </Card.Content>
                  </Card>
                  {cards}
                </List>
              </Col>
            </Row>
          </Grid>
        </div>
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
    topic: state.topics.items[state.selectedTopic] || {}
  }
}

export default connect(mapStateToProps)(TopicPage)
