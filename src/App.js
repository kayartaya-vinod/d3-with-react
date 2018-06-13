import React, { Component } from 'react';
import './App.css';
import DensityContours from './DensityContours';
import HistogramChart from './HistogramChart';

class App extends Component {

  state = {
    diamonds: [],
    homicides: []
  }

  componentWillMount() {
    const me = this;
    fetch("http://localhost:4000/diamonds")
      .then(res => res.json())
      .then(diamonds => me.setState({ diamonds }));

    fetch("http://localhost:4000/homicides")
      .then(resp => resp.json())
      .then(homicides => me.setState({ homicides }));
  }

  render() {

    return (
      <div className="App" width="960" height="500" >


        <HistogramChart homicides={this.state.homicides} />
        <DensityContours diamonds={this.state.diamonds} />

      </div>
    );
  }
}

export default App;
