import React, { Component } from 'react';
import Run from './Run';
import moment from 'moment';
import '../styles/Day.scss';

const TWENTYFOUR = moment.duration(24, 'hours');
const NOW = moment().month(6).date(5);

export default class Day extends Component {
  componentDidMount() {
    if (this.refs.now) {
      this.refs.now.scrollIntoView();
    }
  }

  render() {
    let {date, runs} = this.props;
    let now = false;

    if (NOW.date() == date.date()) {
      now = true;
    }

    return (<div className="day">
      <header className="day__header">
        {date.format('dddd Do')}
      </header>
      <div className="day__content">
        {now && <div ref="now" className="day__now" style={{top: 100 * NOW.diff(date.startOf('day')) / TWENTYFOUR + '%'}}></div>}
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
      </div>
    </div>);
  }
}
