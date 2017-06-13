import React, { Component } from 'react';
import TopicIndexTile from './TopicIndexTile';
import { Grid, Row, Col } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css';
import '../style/TopicIndexTile.css';

//var MediaQuery = require('react-responsive');

class Topics extends Component {

  render() {
    const topics = this.props.topics
    const numTopics = Object.keys(topics).length

    const makeTile = (index) => {
      const topic = topics[Object.keys(topics)[index]]
      return topic &&
             <TopicIndexTile
               to={"/topic/" + topic.id}
               src={topic.images[0]}
               title={topic.title}
               published_at={topic.published_at}
               views={topic.views}
             />
    }

    let rows = [];
    for (var i = 0; i < numTopics; i += 5) {
      rows.push(<Row className="show-grid tall-row" key={i}>
                  <Col className="grid-tile" xs={12} sm={8}> {makeTile(i)} </Col>
                  <Col className="grid-tile" xs={12} sm={4}>  {makeTile(i + 1)} </Col>
                </Row>);
      rows.push(<Row className="show-grid" key={i + 1}>
                  <Col className="grid-tile" xs={12} sm={4}> {makeTile(i + 2)} </Col>
                  <Col className="grid-tile" xs={12} sm={4}> {makeTile(i + 3)} </Col>
                  <Col className="grid-tile" xs={12} sm={4}> {makeTile(i + 4)} </Col>
                </Row>);
    }

    return <Grid className="app-shell">{rows}</Grid>;
  }
}

export default Topics;
