import React, {Component} from 'react';
import moment from 'moment';
import '../styles/Run.scss';

const twentyfour = moment.duration(24, 'hours');
const NOW = moment().month(6).date(5);

console.log(NOW.format('L'))

export default class Run extends Component {
  render() {
    let {name, timestamp, duration, day, start, end, runner} = this.props;
    let startedYesterday = timestamp != start;
    let endsTomorrow = start.date() != end.date();

    let positionPercentage = 100 * start.diff(day) / twentyfour;
    let lengthPercentage = 100 * end.diff(start) / twentyfour;

    let status = null;

    if (timestamp < NOW) {
      status = 'inactive';

      if (NOW < moment(timestamp).add(duration)) {
        status = 'highlight';
      }
    }

    return (<div className={`run${startedYesterday ? ' run--continuing' : ''}${endsTomorrow ? ' run--ending' : ''}${status ? ' run--' + status : ''}`}
                 style={{top: positionPercentage + '%', height: `calc(${lengthPercentage}% - 10px)`}}>
      <div className="run__time">
        <span className="run__starttime">{timestamp.format('LT')}</span>
        <span className="run__duration">~{duration.humanize()}</span>
      </div>
      <div className="run__content">
        <div className="run__title">{name}</div>
        <div className="run__runner">{runner}</div>
      </div>
    </div>);
  }
}
