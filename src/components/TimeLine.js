import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import moment from 'moment'

const TimeLine = (props) => {
    const info = props.info;
    console.log(info);
    return (
        (info && <VerticalTimeline >
            {info.map((item) => {
                return [
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(33, 150, 243)', color: 'black' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date={moment(item.due_date).format('MMMM Do, YYYY, hh:mma')}
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<i className='far fa-calendar-solid' />} >
                        <p className="vertical-timeline-element-title tml-text">{item.title}</p>
                    </VerticalTimelineElement>
                ]
            })
            }
        </VerticalTimeline> )
    )
};

export default TimeLine;