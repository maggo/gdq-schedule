import React, { Component } from 'react';
import moment from 'moment';
import '../styles/Run.scss';

const twentyfour = moment.duration(24, 'hours');
const NOW = moment();

export default class Run extends Component {
  componentDidMount() {
    if (this.currentRun) {
      const container = document.querySelector('.scheduler__container');
      const position = this.currentRun.getBoundingClientRect();
      container.scrollTo(position.left - 68, this.currentRun.offsetTop - 48);
    }
  }

  render() {
    let {
      name,
      timestamp,
      duration,
      day,
      start,
      end,
      runner,
      favorite,
      originalEnd
    } = this.props;
    let startedYesterday = timestamp != start;
    let endsTomorrow = start.date() != end.date();

    let positionPercentage = 100 * start.diff(day) / twentyfour;
    let lengthPercentage =
      100 * (startedYesterday ? originalEnd : end).diff(start) / twentyfour;

    let status = null;
    let current = false;

    if (this.props.displayFavorites) {
      status = favorite ? 'highlight' : 'inactive';
    } else {
      if (timestamp < NOW) {
        status = 'inactive';

        if (NOW < moment(timestamp).add(duration)) {
          status = 'highlight';
          current = true;
        }
      }
    }

    if (favorite) status = 'favorite';

    return (
      <div
        className={`run${startedYesterday ? ' run--continuing' : ''}${
          endsTomorrow ? ' run--ending' : ''
        }${status ? ' run--' + status : ''}`}
        style={{
          top: positionPercentage + '%',
          height: `calc(${lengthPercentage}% - 10px)`
        }}
        onClick={this.props.onClick}
        ref={ref => (this.currentRun = current && ref)}
      >
        <div className="run__time">
          <span className="run__starttime">{timestamp.format('LT')}</span>
          <span className="run__duration">~{duration.humanize()}</span>
        </div>
        <div className="run__content">
          <div className="run__title">{name}</div>
          <div className="run__runner">{runner}</div>
        </div>
      </div>
    );
  }
}
