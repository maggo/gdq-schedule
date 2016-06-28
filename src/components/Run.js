import React, {Component} from 'react';
import moment from 'moment';
import '../styles/Run.scss';

const twentyfour = moment.duration(24, 'hours');

export default class Run extends Component {
  render() {
    let {name, timestamp, duration, day, start, end} = this.props;
    let startedYesterday = timestamp != start;

    let positionPercentage = 100 * start.diff(day) / twentyfour;
    let lengthPercentage = 100 * end.diff(start) / twentyfour;

    return (<div className="run" style={{top: positionPercentage + '%', height: lengthPercentage + '%'}}>
      <div className="run__time">{timestamp.format('LT')}</div>
      <div className="run__title">{name}</div>
      <div className="run__duration">~{duration.humanize()}</div>
    </div>);
  }
}
