import React, { Component } from 'react';
import { Card, Icon, Button, Form, Modal, Header } from 'semantic-ui-react';

export default class Facts extends Component {
  render() {
    console.log(this.props)

    const facts = this.props.facts.map((fact, index) =>
        <Card key={index} header={fact.content} fluid />
    );

    return (
      <div>
        {facts}

        <Modal dimmer={false} trigger={
            <Button content='Add Fact' labelPosition='left' icon='edit' primary/>
          }>
          <Modal.Header>Add a fact</Modal.Header>
          <Modal.Content>
            hi
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
