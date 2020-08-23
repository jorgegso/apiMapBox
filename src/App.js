import React, { Component, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFqb3JnZSIsImEiOiJja2U2amZkeXgxZGFwMnVueTEzYThieThnIn0.FgPJitNFqiImp9WsRKQTvQ';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 2,
      lng: 0,
      lat: 0,
      currentMarkers: []
    };
  }


  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/hajorge/ckd4gt4fn0gxb1jnzj1hk4cfm',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    const addinAllMarket = (market) => {
      this.setState({
        currentMarkers: [...this.state.currentMarkers, market]
      });
    };


    map.on('click', function (e) {
      let on = true;
      map.on('mousemove', function (a) {
        const lng = JSON.stringify(a.lngLat.wrap().lng);
        const lat = JSON.stringify(a.lngLat.wrap().lat);
        if (on) {
          const market = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
          addinAllMarket(market);
          on = false;
        } else {
          return;
        }
      });
    });
  }
  deleteAllMarket = () => {
    const list = this.state.currentMarkers;
    return list.map(point => (
      point.remove()
    ));
  };

  deleteTheLastOne = () => {
    let list = this.state.currentMarkers;
    let point = this.state.currentMarkers[list.length - 1];
    point.remove();
  };

  render() {
    return (
      <Fragment>
        <div className="menu">
          <div ref={el => this.mapContainer = el} className="mapContainer" />
        </div>
        <div className="sidebar">
          <div className="btns">
            <button className="btn " onClick={this.deleteAllMarket}>Delete All</button>
            <button className="btn " onClick={this.deleteTheLastOne}>Delete last one</button>
          </div>
        </div>
      </Fragment >
    );
  }
};
export default App;
