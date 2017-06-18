import React from 'react';
import { Statistic, Icon } from 'semantic-ui-react'
import { Grid, Col } from 'react-bootstrap'

// const square = { width: 175, height: 175 }

const StatsSection = ({ props }) => {
return (
  <div>

          <Grid>
          <Col className="grid-tile" xs={12} sm={4}>
            <Statistic.Group widths={1}>
              <Statistic>
                <Statistic.Value>
                  <Icon name='eye outline' />
                </Statistic.Value>
                <Statistic.Label>0 Views</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Col>
          <Col className="grid-tile" xs={12} sm={4}>
            <Statistic.Group widths={1}>
              <Statistic>
                <Statistic.Value>
                  <Icon name='comments outline' />
                </Statistic.Value>
                <Statistic.Label>0 Comments</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Col>
          <Col className="grid-tile" xs={12} sm={4}>
            <Statistic.Group widths={1}>
              <Statistic>
                <Statistic.Value>
                  <Icon name='checkmark box' />
                </Statistic.Value>
                <Statistic.Label>0 Facts</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Col>
        </Grid>
  </div>
);
}

export default StatsSection;
