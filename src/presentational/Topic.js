import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, List } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import TopicViews from './TopicViews'
import ArticleCard from './ArticleCard'
import '../style/TopicIndexTile.css'

class Topic extends Component {
  render() {
    let cards = this.props.topic.article_set.map((article, index) =>
      <List.Item key={index}>
        <ArticleCard id={index} article={article} handleStepClick={this.handleStepClick}/>
      </List.Item>
    );

    return (
      <div style={{ marginTop: 6 + "rem", padding: "0 1rem" }}>
        <Grid>
          <Row>
            <Col style={{padding:0}} className="Grid-column" xs={9} md={7} mdOffset={1}>
              <TopicViews />
            </Col>

            <Col style={{padding:0}} className="Grid-column" xs={3} md={3} mdOffset={1}>
              <List relaxed>
                <Card id={this.props.id} className="article" raised fluid >
                  <Card.Content>
                      <Card.Header>
                        HEADLINES
                      </Card.Header>
                  </Card.Content>
                </Card>
                {cards}
              </List>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect()(Topic)
