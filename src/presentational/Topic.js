import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, List } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'
import TopicViews from './TopicViews'
import ArticleCard from './ArticleCard'
import '../style/TopicIndexTile.css'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  render() {
    let cards;
    if (this.state.isLoaded) {
      cards = this.props.articles.map((article, index) =>
      <List.Item key={index}>
        <ArticleCard id={index} article={article} handleStepClick={this.handleStepClick}/>
      </List.Item>
    );
    } else {
      cards = <Card>Loading</Card>;
    }

    return (
      <div style={{ marginTop: 6 + "rem", padding: "0 1rem" }}>
        <Grid>
          <Row>
            <Col style={{padding:0}} className="Grid-column" xs={9} md={7} mdOffset={1}>
              <TopicViews />
            </Col>

            <Col style={{padding:0}} className="Grid-column" xs={3} md={3} mdOffset={1}>
              <List relaxed>
                <ArticleCard key={-1} id={-1} article={null} text="HEADLINES" />
                {cards}
              </List>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect()(TopicPage)
