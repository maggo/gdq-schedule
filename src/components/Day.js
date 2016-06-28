import React, { Component } from 'react';
import Run from './Run';
import '../styles/Day.scss';

export default class Day extends Component {
  render() {
    let {date, runs} = this.props;

    return (<div className="day">
      {date.format('dddd Do')}
      {runs.map((run) => <Run key={run.timestamp} name={run.name} timestamp={run.timestamp} duration={run.duration} />)}
    </div>);
  }
}
