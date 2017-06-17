import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react'

import * as actions from '../actions/FactActions';
import '../style/Views.css'

import Infinite from 'react-infinite'
import ReactHeight from 'react-height'
import Missing from './Missing'

class FactSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fact_content: '',
      factListHeight: 0
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch(actions.sendAddFactRequest(this.props.topic.id, this.state.fact_content))
    this.setState({fact_content: ''});
  }

  checkInputEmpty() {
    return this.state.fact_content === "";
  }

  getFactList(facts) {
    if (this.state.factListHeight) {
      if (!facts.length) {
        return (<Missing icon="inbox"
                         icon_size="massive"
                         header="No facts on this topic."
                         description="Be the first person to add an unbiased fact to this topic." />)
      }
      return (<Infinite className="inf-list" containerHeight={this.state.factListHeight} elementHeight={51}>
                <Segment.Group style={{padding:0}}>
                  {facts}
                </Segment.Group>
              </Infinite>);
    }
  }

  render() {
      let facts = this.props.topic.fact_set.map((fact, index) =>
          <Segment key={index}>{fact.content}</Segment>
      );

      let fact_list = this.getFactList(facts);

      return (
        <div className="section" id="fact-section">
          <ReactHeight className="section-height" onHeightReady={ height => this.setState({factListHeight: height}) }>
            <Segment vertical className="section-content" id="facts">
              {fact_list}
            </Segment>
          </ReactHeight>
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
