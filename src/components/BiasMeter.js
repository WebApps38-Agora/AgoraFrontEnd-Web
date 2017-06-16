import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { Container } from 'semantic-ui-react'
import '../style/BiasMeter.css'

import { sendRateBiasRequest } from '../actions/MetricsActions'

class BiasMeter extends Component {

  constructor(props) {

    super(props)
    this.state = {
      bias: this.props.article.metrics.bias
    }

  }

  handleMove(e) {
    const BIAS_LIMIT = 100

    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({
      bias: Math.min(BIAS_LIMIT, ((e.nativeEvent.clientX - rect.left) / rect.width) * 100)
    })
  }

  handleLeave(e) {
    this.setState({
      bias: this.props.article.metrics.bias
    })
  }

  handleClick(e) {
    this.props.dispatch(sendRateBiasRequest(this.props.article.id, this.state.bias))
    this.props.article.metrics.bias = this.state.bias
  }

  render() {
    const style = {
      width: this.state.bias + '%',
      backgroundColor: "orange",
      float: "left",
      marginRight: "10px",
      textAlign: "right",
      transition: "0.15s",
    }

    return (
      <Container className="bias-container"
                 onMouseLeave={(e) => this.handleLeave(e)}
                 onMouseMove={(e) => this.handleMove(e)}
                 onClick={(e) => this.handleClick(e)}
                 fluid>
        <div style={style} className="bias-meter">
          <div className="bias-text">{Math.round(this.state.bias) + "% biased"}</div>
        </div>
      </Container>
    )
  }
}

export default connect()(BiasMeter)
