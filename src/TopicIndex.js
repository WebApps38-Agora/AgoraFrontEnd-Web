import React, { Component } from 'react';
import { Image, Loader, Dimmer, Segment } from 'semantic-ui-react'
import TopicIndexTile from './TopicIndexTile';
import { Grid, Row, Col } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css';
import './Card.css';


class TopicIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {topics: [], isLoaded: false};
  }

  componentWillMount() {
    console.log("Bouta mount");
    console.log(this.state);
  }

  componentDidMount() {
    console.log("Loading sources");
    console.log(this.state);
    this.loadTopics();
  }

  loadTopics = () => {
    const component = this;
    fetch('https://agora-be.herokuapp.com/topics').then(function(response) {
      return response.json();
    }).then(function(j) {
      component.setState({topics: j.results, isLoaded: true});
    });
  }

  render() {
    const makeTile = (index) => {
      return <TopicIndexTile to={"/summary/" + this.state.topics[index].id}
                       src={this.state.topics[index].article_images[0]}
                       title={this.state.topics[index].title}
                       published_at={this.state.topics[index].published_at}
                       views={this.state.topics[index].views}/>
    }

    let rows = [];
    for (var i = 0; i < this.state.topics.length; i += 5) {
      rows.push(<Row className="show-grid tall-row" key={i}>
                  <Col className="grid-tile" xs={12} md={8}> {makeTile(i)} </Col>
                  <Col className="grid-tile" xs={6} md={4}>  {makeTile(i + 1)} </Col>
                </Row>);
      rows.push(<Row className="show-grid" key={i + 1}>
                  <Col className="grid-tile" xs={6} md={4}> {makeTile(i + 2)} </Col>
                  <Col className="grid-tile" xs={6} md={4}> {makeTile(i + 3)} </Col>
                  <Col className="grid-tile" xs={6} md={4}> {makeTile(i + 4)} </Col>
                </Row>);
    }

    if(this.state.isLoaded) {
      return <Grid className="app-shell">
              {rows}
            </Grid>;
      } else {
      return <Dimmer active>
              <Loader>Loading the latest topics</Loader>
            </Dimmer>;
    }
  }
}

export default TopicIndex;
