import React, { Component} from 'react';
import ChartTile from './ChartTile'

let grid = []

export default class PoliticalChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      unselectTile: null,
      profile_x: -1,
      profile_y: -1
    }
  }

  componentWillMount() {
    const makeRow = (c1, c2, y) => {
      let rows = []
      for (var x = 0; x < 10; x++) {
        let c = x < 5 ? c1 : c2
        let _x = x
        rows.push(<ChartTile handleSelect={this.handleSelect}
                             key={x + ", " + y} x={_x} y={y} c={c}/>)
      }
      return <div key={y} style={{display: 'flex', flexWrap: 'nowrap'}}>
              {rows}
             </div>
    }

    for (var y = 0; y < 10; y++) {
      let c1 = y < 5 ? '#3498db' : '#ACECA1'
      let c2 = y < 5 ? '#F76C5E' : '#858AE3'
      grid.push(makeRow(c1, c2, y))
    }
  }

  handleSelect = (unselectTile, x, y) => {
    if (this.state.unselectTile) {
      this.state.unselectTile()
    }
    this.setState({ unselectTile: unselectTile, profile_x: x, profile_y: y })
  }

  render() {

    return (
      <div className="political-chart-container">
        <div className="political-text political-top">
          Authoritarian
        </div>
        <div className="political-grid-container">
          <div className="political-text political-side">
            Right
          </div>
          <div className="political-grid">
            { grid }
          </div>
          <div className="political-text political-side">
            Left
          </div>
        </div>
        <div className="political-text political-top">
          Libertarian
        </div>
      </div>
    );
  }
}
