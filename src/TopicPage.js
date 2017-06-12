import React, { Component } from 'react';
import { Card, Header, List } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import TopicViews from './TopicViews'
import ArticleCard from './ArticleCard'
import './Card.css'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      isLoaded: false,
      topics: {},
      facts: []
    };
  }

  componentDidMount() {
    this.loadTopic();
    this.loadFacts();
  }

  loadTopic = () => {
    const component = this
    fetch('https://agora-be.herokuapp.com/topics/' + this.state.id).then(function(response) {
      return response.json();
    }).then(function(j) {
      component.setState({title: j.title,
                          articles: j.article_set,
                          published_at: j.published_at,
                          views: j.views,
                          article_images: j.article_images,
                          isLoaded: true});
    });
  }

  loadFacts = () => {
    const component = this;
    fetch('https://agora-be.herokuapp.com/facts/topic/' + this.state.id + '/').then(function(response) {
      return response.json();
    }).then(function(j) {
      component.setState({facts: j.results});
    });
  }

  render() {
    let cards;
    if(this.state.isLoaded){
      cards = this.state.articles.map((article, index) =>
      <List.Item key={index}>
        <ArticleCard id={index} article={article} handleStepClick={this.handleStepClick}/>
      </List.Item>
    );
    } else {
      cards = <Card>Loading</Card>;
    }

    return (
      <div style={{ marginTop: 6 + "rem", padding: "0 1rem" }}>
        <Grid>
          <Row>
            <Col style={{padding:0}} className="Grid-column" xs={9} md={7} mdOffset={1}>
              <TopicViews facts={this.state.facts}/>
            </Col>

            <Col style={{padding:0}} className="Grid-column" xs={3} md={3} mdOffset={1}>
              <List relaxed>
                <ArticleCard key={-1} id={-1} article={null} text="HEADLINES" />
                {cards}
              </List>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TopicPage
