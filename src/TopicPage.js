import React, { Component } from 'react';
import { Grid, Card, Segment } from 'semantic-ui-react'
import TopicViews from './TopicViews'
import ArticleCard from './ArticleCard'
import './Card.css'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      id: props.match.params.id,
      isLoaded: false,
      topics: {},
    };
  }

  componentDidMount() {
    this.loadSources();
  }

  loadSources = () => {
    const component = this;
    fetch('https://agora-be.herokuapp.com/topics/' + this.state.id).then(function(response) {
      return response.json();
    }).then(function(j) {
      console.log(j);
      component.setState({title: j.title, articles: j.article_set, published_at: j.published_at,
        views: j.views, article_images: j.article_images, isLoaded: true});
      console.log(component.state.isLoaded);
    });
  }

  handleStepClick = (event, data) => {
    console.log('data', data);
    console.log('event', data);
    let key = data['id'];
    this.setState({active: [key]});
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
          <Grid.Column style={{padding:0}} className="Grid-column" width={6}>
            <Card.Group fluid vertical>
              {cards}
            </Card.Group>
          </Grid.Column>

          <Grid.Column style={{padding:0}} className="Grid-column" width={10}>
            <TopicViews />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default TopicPage
