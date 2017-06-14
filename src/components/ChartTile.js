import React, { Component} from 'react';
import { Spring } from 'react-motion'

export default class ChartTile extends Component {
  render() {
    return (
        <div>
          {/* <Spring defaultValue={0} endValue={360}>
                  {val =>{
                    let style = {
                      width: '100%',
                      height: '20px',
                      backgroundColor: this.props.c,
                      border: '1px solid black',
                      transform: `rotate(${val}deg)`
                    }
                    return <div key={this.props.x}
                               onClick={(e) => this.handleclick(e, this.props.x, this.props.y)}
                               style={style}>
                               {val}
                           </div>
                    }}                  }
          </Spring> */}
        </div>
    )
  }
}
