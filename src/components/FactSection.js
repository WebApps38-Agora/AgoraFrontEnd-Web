import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment, Card } from 'semantic-ui-react'

import * as actions from '../actions/FactSection';
import '../style/Views.css'

class FactSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fact_content: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch(actions.sendAddFactRequest(this.props.topic.id, this.state.fact_content))
  }

  checkInputEmpty() {
    console.log(this.state.fact_content);
    return this.state.fact_content === "";
  }

  render() {
      const facts = this.props.topic.fact_set.map((fact, index) =>
          <Card key={index} header={fact.content} fluid />
      );

      return (
        <div className="section" id="fact-section">
          <Segment vertical className="section-content" id="facts">
            {facts}
          </Segment>
          <Segment vertical>
            <Form success={false}>
              <Form.Group className="section-form">
                <Form.Input style={{width: 100 + "%"}}
                            id="fact-input"
                            value={this.state.fact_content}
                            onChange={(e, {name, value}) => this.setState({fact_content: value})}
                            placeholder='Write an unbiased, objective fact about this news topic...' />

                <Button id="fact-button"
                        onClick={this.handleSubmit}
                        disabled={this.checkInputEmpty()}
                        content='Add Fact'
                        labelPosition='left'
                        icon='edit'
                        primary />
              </Form.Group>
            </Form>
          </Segment>
        </div>
      )
  }
}

export default connect(
)(FactSection)
