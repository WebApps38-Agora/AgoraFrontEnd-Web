import React, { Component } from 'react';
import { Statistic, Icon } from 'semantic-ui-react'
import { Grid, Col, Row } from 'react-bootstrap'
import MapApp from '../map/Map2'
import ReactDOM from 'react-dom'


export default class StatsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapWidth: 0,
      mapHeight: 0
    };

  }
  componentWillMount() {
    //var width = ReactDOM.findDOMNode(this).offsetWidth;
    // console.log(width);
  }

  getMapSize(ref, that) {
    that.setState({
      mapWidth: ref.offsetWidth,
      mapHeight: ref.offsetHeight
    })
  }

  render () {

    return (
      <div style={{height:'100%', width:'100%'}}>
        <Grid>
          <Row>
              <Col className="grid-tile" xs={4}>
                <Statistic.Group widths={1}>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name='eye' />
                    </Statistic.Value>
                    <Statistic.Label>0 Views</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Col>
              <Col className="grid-tile" xs={4}>
                <Statistic.Group widths={1}>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name='comments outline' />
                    </Statistic.Value>
                    <Statistic.Label>0 Comments</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Col>
              <Col className="grid-tile" xs={4}>
                <Statistic.Group widths={1}>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name='checkmark box' />
                    </Statistic.Value>
                    <Statistic.Label>0 Facts</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Col>
            </Row>
            </Grid>

            <div style={{width:'100%', height:'80%'}}>
              <MapApp />
            </div>
          </div>)
  }
}
