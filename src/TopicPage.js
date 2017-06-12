import React, { Component } from 'react';
import { Grid, Step, Segment } from 'semantic-ui-react'
import TopicViews from './TopicViews'
import ArticleStep from './ArticleStep'
import './Card.css'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      isLoaded: false,
      topics: {},
    };
  }

  componentDidMount() {
    this.loadTopic();
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

  render() {
    let steps;
    if (this.state.isLoaded){
      steps = this.state.articles.map((article, index) =>
      <ArticleStep key={index} id={index} article={article} handleStepClick={this.handleStepClick}/>
    );
    } else {
      steps = <Step>Loading</Step>;
    }

    return (
      <div className="app-shell" style={{ marginTop: 6 + "rem" }}>
        <Grid padded={false} relaxed={false} columns={2}>
          <Grid.Column style={{padding:0}} className="Grid-column" width={10}>
            <TopicViews />
          </Grid.Column>

          <Grid.Column style={{padding:0}} className="Grid-column" width={6}>
            <Step.Group fluid vertical>
              {steps}
            </Step.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default TopicPage
