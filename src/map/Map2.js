/* global window,document */
import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';
import Dimensions from 'react-dimensions'

const MAPBOX_TOKEN = "pk.eyJ1IjoiY2hhd2ttIiwiYSI6ImNqM3o3emRzbzAwY28zMW41NnJkcnlyc3oifQ.M_UwGN_kUOOScXtqTs6vSA"; // eslint-disable-line

const data = [
 [-0.056608, 51.530791],
 [-0.038268, 51.518076],
 [-0.050731, 51.509741],
 [-0.056639, 51.519910],
 [-0.035206, 51.525578],
 [-0.046324, 51.521807],
 [-0.034657, 51.524940],
 [-0.067766, 51.509033],
 [-0.023117, 51.518451],
 [-0.057017, 51.514431],
 [-0.066515, 51.514768],
 [-0.025773, 51.527039],
 [-0.018792, 51.521795],
 [-0.073811, 51.509223],
 [-0.078386, 51.520359],
 [-0.029726, 51.535648],
 [-0.044959, 51.516659],
 [-0.014278, 51.529452],
 [-0.026012, 51.501504],
 [-0.030334, 51.518213],
 [-0.030698, 51.529819],
 [-0.057632, 51.530448],
 [-0.011324, 51.411237],
 [-0.048506, 51.411232],
 [-0.063498, 51.411121],
 [-0.050251, 51.420973],
 [-0.065085, 51.417892],
 [-0.025275, 51.438541],
 [-0.074178, 51.424426],
 [0.000436,  51.413195],
 [-0.048189, 51.428763],
 [-0.031465, 51.428753],
 [-0.012624, 51.411169],
 [-0.051707, 51.520638],
 [-0.028709, 51.535811],
 [-0.067046, 51.512439],
 [-0.024831, 51.538803],
 [-0.014956, 51.507252],
 [-0.034793, 51.525122],
 [-0.032606, 51.512316],
 [-0.071836, 51.615035],
 [-0.015233, 51.624073],
 [-0.037495, 51.612577],
 [-0.019120, 51.610920],
 [-0.039561, 51.611443],
 [-0.020310, 51.620022],
 [-0.049211, 51.625093],
 [-0.075740, 51.628409],
 [-0.023261, 51.618453],
 [-0.068747, 51.616513],
 [-0.061827, 51.626741],
 [-0.023300, 51.627537]]

class MapApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: this.props.containerWidth,
        height: this.props.containerHeight
      },
      data: null
    };

  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this.setState({data});
    this._resize();
  }

  _resize() {
    this._onChangeViewport({
      width: this.props.containerWidth,
      height: this.props.containerHeight
    });
  }

  _onChangeViewport(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  render() {
    const {viewport, data} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        perspectiveEnabled={true}
        onChangeViewport={this._onChangeViewport.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay
          viewport={viewport}
          data={data || []}
        />
      </MapGL>
    );
  }
}

export default Dimensions()(MapApp)
