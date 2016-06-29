import sampleData from 'json!./misc/sample.json';
import Unescaper from './utils/unescaper';
import React from 'react';
import {render} from 'react-dom';
import Scheduler from './components/Scheduler';
import moment from 'moment';
import './styles/global.scss';

let runs = [];

const unescaper = new Unescaper();

const rows = sampleData.query.results.tr;

for (let i = 0; i < rows.length - 1; i += 2) {
  let row1 = rows[i].td;
  let row2 = rows[i+1].td;
  let nextRunStart = rows[i+2].td && rows[i+2].td[0].content;

  let timestamp = moment(row1[0].content.trim());
  let duration = moment.duration(row2[0].content.trim());

  if (row1[3].content) {
    let setupDuration = moment.duration(row1[3].content.trim());
    duration.add(setupDuration);
  }

  let run = {
    timestamp: timestamp,
    name: unescaper.unescape(row1[1].trim()),
    runner: unescaper.unescape(row1[2].content.trim()),
    setup: row1[3].content ? row1[3].content.trim() : null,
    estimate: row2[0].content.trim(),
    duration: duration,
    start: timestamp,
    end: moment(timestamp).add(duration)
  };

  // Nicer duration display
  if (nextRunStart) {
    run.end = moment(nextRunStart);
  }

  runs.push(run);
}

// Finale
let finale = rows[rows.length - 1].td;

let finaleTimestamp = moment(finale[0].content.trim())

runs.push({
  timestamp: finaleTimestamp,
  name: unescaper.unescape(finale[1].trim()),
  runner: unescaper.unescape(finale[2].trim()),
  setup: null,
  estimate: null,
  duration: moment.duration(30, 'minutes'),
  start: finaleTimestamp,
  end: moment(finale[0].content.trim()).add(30, 'minutes')
});

render(<Scheduler runs={runs} />, document.getElementById('app-container'));
