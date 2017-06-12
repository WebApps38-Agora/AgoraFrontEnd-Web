import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

class FactSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic_url: 'https://agora-be.herokuapp.com/topics/404/'
    };
  }

  addFact = () => {
    const component = this;
    fetch('https://agora-be.herokuapp.com/facts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: this.state.topic_url,
        owner: 1,
        content: 'My fact',
      })
    }).then(function(response) {
      return response.json();
    }).then(function(j) {
      component.setState({facts: [j]});
    });
  }

  render() {
    const facts = this.props.facts.map((fact, index) =>
        <Card key={index} header={fact.content} fluid />
    );

    return (
      <div>
        {facts}

        <Button primary onClick={this.addFact}><Icon name='plus'/></Button>
      </div>
    );
  }
}

export default FactSection;
