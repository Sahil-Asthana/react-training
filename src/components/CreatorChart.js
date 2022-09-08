import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';




const CreatorChart = (props) =>{
    const {user : currentUser} = useSelector(state=>state.auth)
    let pendingTask= 0;
    let completedTask = 0;
    let deletedTask = 0;
    let inProgressTask=0;
    let flag = true;
    const data = props.info ? props.info : null;
    if(data){
        data.map((item)=>{
            if(item.status === 'pending' && item.creator === JSON.stringify(currentUser.user.id)) pendingTask+=1;
            else if(item.status === 'deleted' && item.creator === JSON.stringify(currentUser.user.id)) deletedTask+=1;
            else if(item.status === 'completed' && item.creator === JSON.stringify(currentUser.user.id)) completedTask+=1;
            else if(item.status === 'in-progress' && item.creator === JSON.stringify(currentUser.user.id)) inProgressTask+=1;
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
            text: 'Tasks created by you'
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
            }
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

export default CreatorChart;