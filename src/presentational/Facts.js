import React, { Component } from 'react';
import { Card, Button, Modal } from 'semantic-ui-react';

export default class Facts extends Component {
  render() {
    const facts = this.props.facts.map((fact, index) =>
        <Card key={index} header={fact.content} fluid />
    );

    return (
      <div>
        {facts}
      </div>
    );
  }
}
