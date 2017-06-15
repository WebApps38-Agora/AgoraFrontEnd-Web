import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

import '../style/Views.css'

class Missing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: props.icon,
      icon_size: props.icon_size,
      header: props.header,
      description: props.description,
      full: props.full
    }
  }

  render() {
    let style = this.props.style
    if (this.state.full) {
      // style.height = "100%";
      // style.width = "100%";
    }

    return (
      <div className="missing" style={this.props.style}>
        <div className="missing-inner">
          <Icon name={this.state.icon} size={this.state.icon_size} />
          <h1>{this.state.header}</h1>
          <p>{this.state.description}</p>
        </div>
      </div>
    )
    }
}

export default connect()(Missing)
