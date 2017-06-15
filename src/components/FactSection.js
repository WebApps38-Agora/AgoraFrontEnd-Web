import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react'

import * as actions from '../actions/FactSection';
import '../style/Views.css'

import Infinite from 'react-infinite'
import ReactHeight from 'react-height'

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
  }

  checkInputEmpty() {
    console.log(this.state.fact_content);
    return this.state.fact_content === "";
  }

  componentDidMount() {

  }

  getFactList(facts) {
    if (this.state.factListHeight) {
      console.log(this.state.factListHeight);
      return (<Infinite displayBottomUpwards containerHeight={this.state.factListHeight} elementHeight={51}>
                {facts}
              </Infinite>);
    }
    // console.log(this.state.factListHeight);
    return <div></div>;
  }

  render() {
      let facts = this.props.topic.fact_set.map((fact, index) =>
          <Segment key={index}>{fact.content}</Segment>
      );

      let fact_list = this.getFactList(facts);

      return (
        <div className="section" id="fact-section">
          <ReactHeight style={{height: "calc(100% - 60px)"}} onHeightReady={ height => this.setState({factListHeight: height}) }>
            <Segment.Group className="section-content" id="facts">
              {fact_list}
            </Segment.Group>
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

export default connect(
)(FactSection)
