import Unescaper from './utils/unescaper';
import React from 'react';
import { render } from 'react-dom';
import Scheduler from './components/Scheduler';
import moment from 'moment';

let runs = [];

const unescaper = new Unescaper();
const resolve = (data) => {
  const container = document.createElement('tbody');
  container.innerHTML = data.query.results.result;

  for (let i = 0; i < container.children.length - 1; i += 2) {
    let row1 = container.children[i].children;
    let row2 = container.children[i+1].children;
    let nextRunStart = container.children[i+2].children && container.children[i+2].children[0].textContent;

    let timestamp = moment(row1[0].textContent.trim());
    let duration = moment.duration(row2[0].textContent.trim());

    if (row1[3].textContent) {
      let setupDuration = moment.duration(row1[3].textContent.trim());
      duration.add(setupDuration);
    }

    let run = {
      timestamp: timestamp,
      name: unescaper.unescape(row1[1].textContent.trim()),
      runner: unescaper.unescape(row1[2].textContent.trim()),
      setup: row1[3].textContent ? row1[3].textContent.trim() : null,
      estimate: row2[0].textContent.trim(),
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
  let finale = container.children[container.children.length - 1].children;

  let finaleTimestamp = moment(finale[0].textContent.trim())

  runs.push({
    timestamp: finaleTimestamp,
    name: unescaper.unescape(finale[1].textContent.trim()),
    runner: unescaper.unescape(finale[2].textContent.trim()),
    setup: null,
    estimate: null,
    duration: moment.duration(30, 'minutes'),
    start: finaleTimestamp,
    end: moment(finale[0].textContent.trim()).add(30, 'minutes')
  });

  render(<Scheduler runs={runs} />, document.getElementById('app-container'));
};
const getData = () => {
  const request = new XMLHttpRequest();

  request.addEventListener('load', (e) => {
    var data = JSON.parse(e.target.responseText);
    resolve(data);
  });

  request.open("GET", "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring%20where%20url%3D%22https%3A%2F%2Fgamesdonequick.com%2Fschedule%22%20and%20xpath%3D%27%2F%2F*%5B%40id%3D%22runTable%22%5D%2Ftbody%2Ftr%27&format=json&callback=&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys");
  request.send();
};

getData();
