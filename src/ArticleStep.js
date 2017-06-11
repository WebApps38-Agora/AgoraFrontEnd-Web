
import React, { Component } from 'react';
import { Step, Segment } from 'semantic-ui-react'

class ArticleStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      response: {},
      active: props.active,
      article: props.article,
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.loadArticle();
  }

  handleStepClick = (e, d) => {
    e.preventDefault();
    console.log('click2');
    this.props.handleStepClick(e, d);
  }

  loadArticle = () => {
    const component = this;
    fetch(this.state.article).then(function(response) {
      return response.json();
    }).then(function(j) {
      console.log(j);
      component.setState({response: j, isLoaded: true});
    });
  }

  render() {
    let step;
    let resp = this.state.response;

    if(this.state.isLoaded){
      step = <Segment as={Step} id={this.props.id}
               active={this.state.active === this.state.id} link completed
               {...resp} icon='truck' onClick={this.handleStepClick}/>;
    } else {
      step = <h1>Loading...</h1>;
    }

    return step;
  }
}

export default ArticleStep
