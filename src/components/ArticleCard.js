import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import '../style/Article.css';

var moment = require('moment');
var MediaQuery = require('react-responsive');

class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      text: props.text,
      isLoaded: true
    };
  }

  render() {
    let article = this.props.article;
    let source  = this.props.article.source;

    if (this.state.isLoaded) {
      return (
       <a href={article.url} target="_blank" rel="noopener noreferrer">
        <Card id={this.props.id} className="article" raised link fluid >
          <Card.Content>
              <Image floated='left' src={source.url_logo} />
              <Card.Header>
                <MediaQuery minWidth={800}>
                  {article.headline}
                  <Card.Meta>
                    {moment(article.published_at).fromNow()}
                  </Card.Meta>
                </MediaQuery>
              </Card.Header>
          </Card.Content>
        </Card>
      </a>)
    } else {
      return (
      <Card id={-1} fluid>
        <Card.Content>
          <Card.Header style={{textAlign: "center", width: "100%"}}>
            {this.state.text}
          </Card.Header>
        </Card.Content>
      </Card>)
    }
  }
}

export default connect()(ArticleCard)
