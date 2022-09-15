import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';




const AssignedChart = (props) =>{
    let pendingTask= 0;
    let completedTask = 0;
    let deletedTask = 0;
    let inProgressTask=0;
    let overdue =0;
    let flag = true;
    const data = props.info ? props.info : null;
    if(data){
        data.map((item)=>{
            if(item.status === 'pending') pendingTask+=1;
            else if(item.status === 'deleted' ) deletedTask+=1;
            else if(item.status === 'completed' ) completedTask+=1;
            else if(item.status === 'in-progress') inProgressTask+=1;
            else if(item.status === 'overdue') overdue+=1;
            return flag;
        })
    }

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tasks Analytics for Selected User'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Status',
            colorByPoint: true,
            data: [{
                name: 'Pending',
                y: pendingTask,
                sliced: true,
                selected: true
            }, {
                name: 'Completed',
                y: completedTask
            },  {
                name: 'Deleted',
                y: deletedTask
            }, {
                name: 'In-Progress',
                y: inProgressTask
            }, {
                name: 'OverDue',
                y: overdue
            },
        ]
        }],
        accessibility: {
            enabled: false,
        }
    };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default AssignedChart;