import React, { Component } from 'react';
import '../styles/Timeline.scss';
import moment from 'moment';

export default class Timeline extends Component {
  constructor() {
    super();

    this.hours = [];
    for (let i = 0; i < 24; i++) {
      this.hours.push({
        label: moment(i, 'H').format('LT'),
        percentage: 100 * i / 24
      });
    }
  }

  render() {
    return (<div className="timeline">
      <header className="timeline__header"></header>
      <div className="timeline__content">
        {this.hours.map((hour) => <div className="timeline__hour" key={hour.percentage} style={{top: hour.percentage + '%'}}>
          <div className="timeline__label">
               {hour.label}
          </div>
        </div>)}
      </div>
    </div>);
  }
}
