import React, { Component } from 'react';
import Day from './Day';
import Timeline from './Timeline';
import moment from "moment";
import '../styles/Scheduler.scss';

export default class Scheduler extends Component {
  render() {
    let {runs} = this.props;
    let days = [];
    let currentDay = null;

    // Build array of days
    runs.forEach((run) => {
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
    });

    return (<div className="scheduler">
      <header className="scheduler__header">
        Header
      </header>
      <main className="scheduler__container">
        <div className="scheduler__content">
          <Timeline />
          {days.map((day) => <Day key={day.moment} date={day.moment} runs={day.runs} />)}
        </div>
      </main>
    </div>);
  }
}