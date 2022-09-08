import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import UserService from '../services/user.service';



const Notification = (props) => {
    const info = props.info;
    const length = info.length;
    const handleDelete = (e,id) =>{
        UserService.deleteNotif(id).then((response)=>{
            console.log(response.data);
            length-=1;
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
    <div className='containerN'>
        {info ? <div className='notifs-count'><div className='count-num'>{length}</div></div> : null}
        {info ? <DropdownButton className='bell-icon' title={<i className="fa fa-bell" style={{ color: 'white' }}></i>}>
            {info.map((item) => {
                return(
                <Dropdown.Item eventKey={item.id}>
                    <div className="notif-content">{item.notification}
                    <button onClick={(e)=>handleDelete(e,item.id)} className='notif-delete-button'>X</button>
                    </div>
                </Dropdown.Item>
            )
            })}
        </DropdownButton> : null}
    </div>
    )
}
export default Notification;
