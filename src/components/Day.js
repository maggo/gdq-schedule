import React, { Component } from 'react';
import Run from './Run';
import moment from 'moment';
import '../styles/Day.scss';

const TWENTYFOUR = moment.duration(24, 'hours');
const NOW = moment();

export default class Day extends Component {
  render() {
    let { date, runs } = this.props;
    let now = false;

    if (NOW.date() == date.date()) {
      now = true;
    }

    return (
      <div className="day">
        <header className="day__header">{date.format('dddd Do')}</header>
        <div className="day__content">
          {now && (
            <div
              ref="now"
              className="day__now"
              style={{
                top: 100 * NOW.diff(date.startOf('day')) / TWENTYFOUR + '%'
              }}
            />
          )}
          {runs.map(run => (
            <Run
              key={run.timestamp}
              name={run.name}
              runner={run.runner}
              timestamp={run.timestamp}
              start={run.start}
              end={run.end}
              originalEnd={run.originalEnd}
              duration={run.duration}
              displayDuration={run.displayDuration}
              day={date}
              favorite={run.favorite}
              displayFavorites={this.props.displayFavorites}
              onClick={() => this.props.onRunClick.call(this, run)}
            />
          ))}
        </div>
      </div>
    );
  }
}
