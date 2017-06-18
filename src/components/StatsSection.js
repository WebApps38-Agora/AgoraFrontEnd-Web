import React, { Component } from 'react';
import { Statistic, Icon } from 'semantic-ui-react'
import { Grid, Col } from 'react-bootstrap'
import { Motion, spring } from 'react-motion'
import Map from '../map/Map'

// const square = { width: 175, height: 175 }

class StatsSection extends Component {

  render () {
    let topic = this.props.topic
    let views = topic.views
    let comments = Object.keys(topic.comment_set).length
    let facts = topic.fact_set.length
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Grid>
            <Col className="grid-tile" xs={12} sm={4}>
              <Statistic.Group  color='orange' widths={1}>
                <Statistic>
                  <Statistic.Value>
                    <Motion defaultStyle={{vs: 0}}
                            style={{vs: spring(views, { stiffness: 65, damping: 30 })}}>
                      {({vs}) => <div>{Math.floor(vs)}</div>}
                    </Motion>
                  </Statistic.Value>
                  <Statistic.Label>
                    <Icon name='eye' />
                    Views
                  </Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Col>
            <Col className="grid-tile" xs={12} sm={4}>
              <Statistic.Group color='orange' widths={1}>
                <Statistic>
                  <Statistic.Value>
                    <Motion defaultStyle={{vs: 0}}
                            style={{vs: spring(comments, { stiffness: 65, damping: 30 })}}>
                      {({vs}) => <div>{Math.floor(vs)}</div>}
                    </Motion>
                  </Statistic.Value>
                  <Statistic.Label>
                    <Icon name='comments outline' /> Comments
                  </Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Col>
            <Col className="grid-tile" xs={12} sm={4}>
              <Statistic.Group color='orange' widths={1}>
                <Statistic>
                  <Statistic.Value>
                    <Motion defaultStyle={{vs: 0}}
                            style={{vs: spring(facts, { stiffness: 65, damping: 30 })}}>
                      {({vs}) => <div>{Math.floor(vs)}</div>}
                    </Motion>
                  </Statistic.Value>
                  <Statistic.Label>
                    <Icon name='checkmark box' /> Facts
                  </Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Col>
          </Grid>
          <div style={{width: '100%', height: '70%'}}>
            <Map />
          </div>
    </div>)
  }
}

export default StatsSection
