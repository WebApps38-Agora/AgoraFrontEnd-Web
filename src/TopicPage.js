import React, { Component } from 'react';
import { Grid, Card, Segment } from 'semantic-ui-react'
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
      console.log(response);
      return response.json();
    }).then(function(j) {
      component.setState({facts: j.results});
      console.log('Content: ' + component.state.facts[0].content);
    });
  }

  render() {
    let cards;
    if(this.state.isLoaded){
      cards = this.state.articles.map((article, index) =>
      <ArticleCard key={index} id={index} article={article} handleStepClick={this.handleStepClick}/>
    );
    } else {
      cards = <Card>Loading</Card>;
    }

    return (
      <div className="app-shell" style={{ marginTop: 6 + "rem" }}>
        <Grid padded={false} relaxed={false} columns={2}>
          <Grid.Column style={{padding:0}} className="Grid-column" width={10}>
            <TopicViews facts={this.state.facts}/>
          </Grid.Column>

          <Grid.Column style={{padding:0}} className="Grid-column" width={6}>
            <Card.Group>
              {cards}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default TopicPage
