import React, { Component} from 'react';
import { Segment } from 'semantic-ui-react'
import ChartTile from './ChartTile'

let grid = []

export default class PoliticalChart extends Component {
  componentWillMount() {
    const makeRow = (c1, c2, y) => {
      let rows = []
      for (var x = 0; x < 16; x++) {
        let c = x < 8 ? c1 : c2
        let _x = x
        rows.push(<ChartTile x={_x} y={y} c={c}/>)
      }
      return <div key={y} style={{display: 'flex', flexWrap: 'nowrap'}}>
              {rows}
             </div>
    }

    for (var y = 0; y < 10; y++) {
      let c1 = y < 5 ? '#4286f4' : '#9af441'
      let c2 = y < 5 ? '#f44162' : '#f441d6'
      grid.push(makeRow(c1, c2, y))
    }
  }

  render() {

    return (
      <div className="political-chart-container">
        <div className="political-chart-column">
          <div className="full-height">
            Authoritarian
          </div>
          <div className="display-bottom-text">
            Libertarian
          </div>
        </div>
        <div className="full-width">
          { grid }
          <div className="flex-no-wrap">
            <div className="full-width-center">
              Left
            </div>
            <div className="full-width-center">
              Center
            </div>
            <div className="full-width-center">
              Right
            </div>
          </div>
        </div>
      </div>
    );
  }
}
