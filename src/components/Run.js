import React, {Component} from 'react';
import moment from 'moment';
import '../styles/Run.scss';

const twentyfour = moment.duration(24, 'hours');

export default class Run extends Component {
  render() {
    let {name, timestamp, duration, displayDuration} = this.props;
    let time = moment(timestamp);

    let positionPercentage = 100 * moment.duration(time.format('H:mm')) / twentyfour;
    let lengthPercentage = 100 * (displayDuration || duration) / twentyfour;

    return (<div className="run" style={{top: positionPercentage + '%', height: lengthPercentage + '%'}}>
      <div className="run__time">{time.format('LT')}</div>
      <div className="run__title">{name}</div>
      <div className="run__duration">~{duration.humanize()}</div>
    </div>);
  }
}
