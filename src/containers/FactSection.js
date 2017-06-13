import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Button, Form, Segment } from 'semantic-ui-react'

import Facts from '../presentational/Facts';
import * as actions from '../actions/FactSection';
import '../style/FactSection.css'

class FactSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fact_content: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch(actions.sendAddFactRequest(this.props.topic.url, this.state.fact_content))
  }

  render() {
    const { isFetching, topic } = this.props

    return !isFetching &&
    <div id="fact-section">
      <Segment vertical id="facts">
      <Facts facts={topic.fact_set}/>
      </Segment>
      <Segment vertical>
        <Form success={false}>
          <Form.Group>
            <Form.Input value={this.state.fact_content}
                        onChange={(e, {name, value}) => this.setState({fact_content: value})}
                        width={12}
                        placeholder='Write an unbiased, objective fact about this news topic' />

            <Button onClick={this.handleSubmit}
                    width={4}
                    content='Add Fact'
                    labelPosition='left'
                    icon='edit'
                    primary />
          </Form.Group>
        </Form>
      </Segment>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching:    Object.keys(state.topics.items).length == 0
                || !(state.selectedTopic in state.topics.items)
                || state.topics.items[state.selectedTopic].isFetching,
    topic: state.topics.items[state.selectedTopic] || [],
  }
}

export default connect(
  mapStateToProps
)(FactSection)
