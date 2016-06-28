import React, { Component } from 'react';
import Run from './Run';
import '../styles/Day.scss';

export default class Day extends Component {
  render() {
    let {date, runs} = this.props;

    return (<div className="day">
      <header className="day__header">
        {date.format('dddd Do')}
      </header>
      {runs.map((run) => <Run
        key={run.timestamp}
        name={run.name}
        runner={run.runner}
        timestamp={run.timestamp}
        start={run.start}
        end={run.end}
        duration={run.duration}
        displayDuration={run.displayDuration}
        day={date}
      />)}
    </div>);
  }
}
