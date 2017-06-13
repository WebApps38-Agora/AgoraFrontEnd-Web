import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import './Article.css';

var moment = require('moment');
var MediaQuery = require('react-responsive');

class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      active: props.active,
      article: props.article,
      text: props.text,
      article_resp: {},
      source_resp: {},
      isLoaded: false,
    };
  }

  componentDidMount() {
    if (this.state.article) {
      this.loadArticle();
    }
  }

  handleStepClick = (e, d) => {
    e.preventDefault();
    this.props.handleStepClick(e, d);
  }

  loadArticle = () => {
    const component = this;
    fetch(this.state.article).then(function(response) {
      return response.json();
    }).then(function (resp) {
      component.setState({article_resp: resp});
      component.loadSource();
    });
  }

  loadSource = () => {
    const component = this;
    fetch(this.state.article_resp.source).then(function(response) {
      return response.json();
    }).then(function(resp) {
      component.setState({source_resp: resp, isLoaded: true});
    });
  }

  render() {
    let card;
    let article = this.state.article_resp;
    let source  = this.state.source_resp;

    if(this.state.isLoaded ){
      card = (<a href={article.url} target="_blank" rel="noopener noreferrer">
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
              </a>);
    } else {
      card = (<Card id={-1} fluid>
              <Card.Content>
                <Card.Header style={{textAlign: "center", width: "100%"}}>
                  {this.state.text}
                </Card.Header>
              </Card.Content>
            </Card>);
    }

    return card;
  }
}

export default ArticleCard
