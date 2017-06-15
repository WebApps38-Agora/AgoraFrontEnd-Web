import React, { Component} from 'react';
import { Motion, spring } from 'react-motion'

export default class ChartTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: '20px',
      backgroundColor: props.c,
      border: '1px solid black',
      transition: 'all .1s ease-in-out'
    }
  }

  handleClick = (e, x, y) => {
    console.log(x, y)
    this.setState({
      transform: 'scale(2)',
      border: '2px solid white'
    })
  }

  render() {
    let chart = this
    return (
        <div style={{width: '100%'}}>
          <div className="chart-tile" key={this.props.x}
               onClick={(e) => chart.handleClick(e, this.props.x, this.props.y)}
               style={{...this.state}}>
          </div>
        </div>
    )
  }
}
