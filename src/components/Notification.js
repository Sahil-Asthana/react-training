import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import UserService from '../services/user.service';



const Notification = (props) => {

    const info = props.info;
    let length = info.length;

    const handleDelete = (e, id) => {
        UserService.deleteNotif(id).then((response) => {
            console.log(response.data);
            length -= 1;
        })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteAll=(e) =>{
        UserService.clearNotif().then().catch();
    }

    return (
        <div className='containerN'>
            {length ? <div className='notifs-count'><div className='count-num'>{length}</div></div> : null}
            {info ? <DropdownButton className='bell-icon' title={<i className="fa fa-bell" style={{ color: 'white' }}></i>}>
                <DropdownItem>
                    <div className='clear-all-div'>
                        <button onClick = {deleteAll} className ='clear-all-notif-btn'>Clear all</button>
                    </div>
                </DropdownItem>
                {info.map((item) => {
                    return (
                        <div key={item.id}> 
                        <Dropdown.Item eventKey={item.id}>
                            <div className="notif-content">{item.notification}
                                <button onClick={(e) => handleDelete(e, item.id)} className='notif-delete-button'>X</button>
                            </div>
                        </Dropdown.Item>
                        </div>
                    )
                })}
            </DropdownButton> : null}
        </div>
    )
}
export default Notification;
