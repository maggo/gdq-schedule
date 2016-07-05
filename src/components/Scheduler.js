import React, { Component } from 'react';
import Day from './Day';
import Timeline from './Timeline';
import moment from "moment";
import '../styles/Scheduler.scss';

let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

export default class Scheduler extends Component {
  constructor(props) {
    super();

    this.state = {
      runs: props.runs
    }
  }

  onRunClick(run) {
    if (run.favorite) {
      run.favorite = false;
      favorites[run.name] = false;
    } else {
      run.favorite = true;
      favorites[run.name] = true;
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.setState({
      runs: this.state.runs
    })
  }

  render() {
    let {runs} = this.state;
    let days = [];
    let currentDay = null;

    // Build array of days
    runs.forEach((run) => {
      if (!run.originalEnd) run.originalEnd = moment(run.end);
      const runMoment = moment(run.timestamp).startOf('day');
      let day = runMoment.date();
      if (day === currentDay) {
        days[days.length - 1].runs.push(run);

        let runEndMoment = moment(run.timestamp).add(run.duration).startOf('day')
        let runEndDay = runEndMoment.date();

        // Copy run to next day if it's ending in the morning
        if (runEndDay != currentDay) {
          let newRun = Object.assign({}, run);
          newRun.start = runEndMoment;

          days.push({
            moment: runEndMoment,
            runs: [newRun]
          });

          currentDay = runEndDay;
          run.end = runEndMoment;
        }
      } else {
        days.push({
          moment: runMoment,
          runs: [run]
        });
        currentDay = day;
      }

      if (favorites[run.name]) {
        run.favorite = true;
      }
    });

    return (<div className="scheduler">
      <header className="scheduler__header">
        <button onClick={() => this.setState({displayFavorites: !this.state.displayFavorites})}>Show favorites</button>
      </header>
      <main className="scheduler__container">
        <div className="scheduler__content">
          <Timeline />
          {days.map((day) =>
            <Day
              key={day.moment}
              date={day.moment}
              runs={day.runs}
              onRunClick={this.onRunClick.bind(this)}
              displayFavorites={this.state.displayFavorites}
            />
          )}
        </div>
      </main>
    </div>);
  }
}
