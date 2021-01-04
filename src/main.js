import React from 'react';
import { render } from 'react-dom';
import Scheduler from './components/Scheduler';
import moment from 'moment';
import jsonp from './utils/jsonp';

let runs = [];

const resolve = data => {
  for (let i = 0; i < data.data.items.length; i++) {
    let runData = data.data.items[i];
    let nextRunData = data.data.items[i + 1];

    let nextRunStart = nextRunData && nextRunData.scheduled;

    let timestamp = moment(runData.scheduled);
    let duration = moment.duration(runData.length);

    let run = {
      timestamp: timestamp,
      name: runData.data[0],
      runner: runData.data[1],
      estimate: runData.data[2],
      setup: runData.data[5],
      start: timestamp,
      duration: duration,
      end: moment(timestamp).add(duration)
    };

    // Nicer duration display
    if (nextRunStart) {
      run.end = moment(nextRunStart);
    }

    runs.push(run);
  }

  // Finale (hardcoded because it's not in the api)
  runs.push({
    timestamp: moment(runs[runs.length - 1].end),
    name: 'Finale',
    runner: 'Everyone still awake!',
    setup: null,
    estimate: null,
    duration: moment.duration(30, 'minutes'),
    start: moment(runs[runs.length - 1].end),
    end: moment(runs[runs.length - 1].end).add(30, 'minutes')
  });

  render(<Scheduler runs={runs} />, document.getElementById('app-container'));
};

const getData = () => {
  jsonp('https://horaro.org/-/api/v1/schedules/6611avc8loc6is7ab6', data => {
    resolve(data);
  });
};

getData();
