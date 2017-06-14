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
      title: props.title,
      left_subtitle: props.left_subtitle,
      right_subtitle: props.right_subtitle,
      center: props.center,
      isLoaded: true
    };
  }

  render() {
    if (this.props.article && this.state.isLoaded) {
      let article = this.props.article;
      let source  = this.props.article.source;

      return (
       <a href={article.url} target="_blank" rel="noopener noreferrer">
        <Card id={this.props.id} className="article" raised link fluid >
          <Card.Content>
              <Image floated='left' src={source.url_logo} />
              <Card.Header>
                {/* <MediaQuery minWidth={800}> */}
                  {article.headline}
                  <Card.Meta>
                    {moment(article.published_at).fromNow()}
                  </Card.Meta>
                {/* </MediaQuery> */}
              </Card.Header>
          </Card.Content>
        </Card>
      </a>)
    } else {
      var style;
      if (this.state.center) {
        var style = { textAlign: "center" };
      } else {
        var style = {
          display: "block",
          padding: 2 +"rem"
        };
      }
      return (
      <Card id={-1} raised fluid>
        <Card.Content style={style}>
          <Card.Header className="non-article">
            {this.state.title}
          </Card.Header>
          <Card.Description>
            <div style={{float: "right"}}>{this.state.right_subtitle}</div>
            {this.state.left_subtitle}
          </Card.Description>
        </Card.Content>
      </Card>)
    }
  }
}

export default connect()(ArticleCard)
