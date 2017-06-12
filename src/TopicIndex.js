import React, { Component } from 'react';
import { Image, Loader, Dimmer, Segment } from 'semantic-ui-react'
import TopicIndexTile from './TopicIndexTile';
import { Grid, Row, Col } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css';
import './Card.css';


class TopicIndex extends Component {

  render() {
    const makeTile = (index) => {
      return <TopicIndexTile to={"/topic/" + this.props.topics[index].id}
                       src={this.props.topics[index].article_images[0]}
                       title={this.props.topics[index].title}
                       published_at={this.props.topics[index].published_at}
                       views={this.props.topics[index].views}/>
    }

    let rows = [];
    for (var i = 0; i < this.props.topics.length; i += 5) {
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

    if(this.props.isLoaded) {
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
