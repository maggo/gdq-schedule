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

  let duration = moment.duration(row2[0].content.trim());
  if (row1[3].content) {
    let setupDuration = moment.duration(row1[3].content.trim());
    duration.add(setupDuration);
  }

  runs.push({
    timestamp: Date.parse(row1[0].content.trim()),
    name: unescaper.unescape(row1[1].trim()),
    runner: unescaper.unescape(row1[2].content.trim()),
    setup: row1[3].content ? row1[3].content.trim() : null,
    estimate: row2[0].content.trim(),
    duration: duration
  });
}

// Finale
let finale = rows[rows.length - 1].td;

runs.push({
  timestamp: Date.parse(finale[0].content.trim()),
  name: unescaper.unescape(finale[1].trim()),
  runner: unescaper.unescape(finale[2].trim()),
  setup: null,
  estimate: null,
  duration: moment.duration(30, 'minutes')
});

render(<Scheduler runs={runs} />, document.getElementById('app-container'));
