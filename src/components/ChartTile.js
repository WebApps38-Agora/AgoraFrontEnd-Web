import React, { Component} from 'react';
import { Motion, spring } from 'react-motion'
import '../style/Chart.css'

export default class ChartTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      handleSelect: props.handleSelect,
      isSelected: props.isSelected
    }
    this.unselectTile = this.unselectTile.bind(this)
  }

  handleClick(e, x, y) {
    this.setState({ selected: true })
    this.state.handleSelect(this.unselectTile, x, y)
  }

  unselectTile() {
    this.setState({ selected: false })
  }

  render() {
    let style = { backgroundColor: this.props.c,
                  transition: 'all .1s ease-in-out' }
    if (this.state.selected) {
      style.transform = "scale(1.2)"
      style.backgroundColor = "var(--app-main-color)"
      // style.border = "2px solid var(--app-light-color)"
    }
    return (
        <div className="chart-tile" key={this.props.x}
             onClick={(e) => this.handleClick(e, this.props.x, this.props.y)}
             style={style}>
        </div>
    )
  }
}
