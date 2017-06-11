import React, { Component } from 'react';
import { Grid, Image, Loader, Dimmer, Segment } from 'semantic-ui-react'
import LandingGridTile from './LandingGridTile';
import 'semantic-ui-css/semantic.min.css';
import './Card.css'


class LandingGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {topics: [], isLoaded: false};
  }

  componentDidMount() {
    this.loadTopics();
  }

  loadTopics = () => {
    const component = this;
    fetch('https://agora-be.herokuapp.com/topics').then(function(response) {
      console.log('mua');
      return response.json();
    }).then(function(j) {
      console.log(j.results);
      console.log(j.results[0].title);
      component.setState({topics: j.results, isLoaded: true});
      console.log(component.state.isLoaded);
    });
  }

  render() {
    const isThirdElem = (i) =>  i % 3 === 0 ? 16 : 8;
    let cols = this.state.topics.map((topic, index) =>
                <Grid.Column className="Grid-column" key={topic.id} mobile={16} tablet={isThirdElem(index)} computer={8}>
                    <LandingGridTile to={"/summary/" + topic.id}
                                     src={topic.article_images[0]}
                                     title={topic.title}
                                     published_at={topic.published_at}
                                     views={topic.views}/>
                </Grid.Column>
              );

    if(this.state.isLoaded) {
      return <Grid padded={false} relaxed={false}>
                {cols}
              </Grid>;
      } else {
      return <Dimmer active>
              <Loader>Loading the latest topics</Loader>
            </Dimmer>;
    }
  }
}

export default LandingGrid;
