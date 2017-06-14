import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment, Card, Icon } from 'semantic-ui-react'

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
    return this.state.fact_content === "";
  }

  render() {
    let facts = this.props.topic.fact_set.map((fact, index) =>
        <Card key={index} header={fact.content} fluid />
    );

    if (!facts.length) {
      facts = (<div className="missing">
                <div className="missing-inner">
                  <Icon name="inbox" size="massive" />
                  <h1>No facts on this topic!</h1>
                  <p>Be the first person to add an unbiased fact to this topic.</p>
                </div>
               </div>);
    }

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

export default connect()(FactSection)
