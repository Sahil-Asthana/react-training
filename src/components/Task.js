import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { showAllTasks, updateStatus, deleteTask, editTask, createTask } from "../actions/user";
import { EMAIL_SENT_FAIL } from "../actions/type";
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Task = () => {
    const { user: currentUser } = useSelector(state => state.auth);
    const role = currentUser.user.role;
    const form = useRef();
    const [info, setInfo] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState("");
    const [due_date, setDueDate] = useState("");
    const [searchParam, setSearchParam] = useState("");
    const [sortMethod, setSortMethod] = useState("");
    const [filterMethod, setFilterMethod] = useState("");
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null });

    useEffect(() => {
        UserService.showMyTasks().then(
            (response) => {
                //console.log(response.data);
                setInfo((response.data));
            },
            (error) => {
                console.log(error.data);
            }
        );
    }, []);

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    }
    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    }
    const onChangeAssignee = (e) => {
        const assignee = e.target.value;
        setAssignee(assignee);
    }
    const onChangeStatus = (e) => {
        const status = e.target.value;
        setStatus(status);
    }
    const onChangeDueDate = (e) => {
        const due_date = e.target.value;
        setDueDate(due_date);
    }
    // filter tasks
    const handleFilter = (e) => {
        console.log(e.target.value);
        setFilterMethod(e.target.value);
            dispatch(showAllTasks(sortMethod,e.target.value,searchParam)).then((response)=>{
            console.log(response.data);
            setShowForm(false);
            setInfo(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    //sort the tasks
    const handleSort = (e) => {
        console.log(e.target.value);
        setSortMethod(e.target.value);
        dispatch(showAllTasks(e.target.value,filterMethod,searchParam)).then((response)=>{
         console.log(response.data);
        setShowForm(false);
        setInfo(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    // search a param
    const handleSearch=(e) =>{
        e.preventDefault();
        dispatch(showAllTasks(sortMethod,filterMethod,searchParam)).then((response)=>{
            console.log(response.data);
           setShowForm(false);
           setInfo(response.data);
           })
           .catch((error)=>{
               console.log(error);
           })
    }



    const handleCreate = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    }
    // to get all tasks for user
    const handleTasks = (e) => {
        console.log(e.target.value);
        if (e.target.value === "yourTask") {
            UserService.showMyTasks().then(
                (response) => {
                    setInfo((response.data));
                },
                (error) => {
                    console.log(error.data);
                })
        }
        else if (e.target.value === "allTasks") {
            dispatch(showAllTasks(sortMethod,filterMethod,searchParam)).then((response) => {
                console.log(response.data);
                setInfo(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    // to create task
    const handleCreateTask = (e) => {
        e.preventDefault();
        dispatch(createTask(title,description,assignee,due_date)).then((response)=>{
            console.log(response.data);
            setShowForm(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    //delete a task
    const handleDelete = (e, id) => {
        dispatch(deleteTask(id)).then((response) => {
            console.log(response);
        })
            .catch((error) => {
                console.log(error);
            })
    }

    // update status
    const handleUpdate = (e, id) => {
        console.log(e.target.value);
        dispatch(updateStatus(id, e.target.value)).then((response) => {
            console.log(response);
        })
            .catch((error) => {
                console.log(error);
            })
    }
    //edit task

    const onEdit = ({ id, current_date, current_title, current_description }) => {
        setInEditMode({
        status: true, rowKey: id})
        setDueDate(current_date);
        setTitle(current_title);
        setDescription(current_description);
    }
    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        setDueDate("");
        setTitle("");
        setDescription("");
    }
    // save the edit 
    const onSave = ({ id, new_date , new_title, new_description}) => {
        console.log(new_description);
        dispatch(editTask(id,new_title,new_description,new_date)).then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error);
        })
        onCancel();

    }
    // to handle clicking of different button
    const handleClick =(e)=>{
        handleCreate(e);
        onCancel();
    }

    return (
        <div>

            <div className='drop-menu'>
                <button className="btn btn-primary" onClick={handleClick}>Create Task</button>
            </div>
            {showForm &&
                <Form onSubmit={handleCreateTask} ref={form}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="title"
                            value={title}
                            onChange={onChangeTitle}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="assignee">Assignee</label>
                        <Input
                            type="number"
                            className="form-control"
                            name="assignee"
                            value={assignee}
                            onChange={onChangeAssignee}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due_date">Due Date</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="due_date"
                            value={due_date}
                            onChange={onChangeDueDate}
                            placeholder="YYYY/MM/DD h:m:S"
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Submit</button>
                    </div>
                </Form>
            }
            <hr />
            <h3>{currentUser.user.name} Tasks</h3>
            <h4><strong>id : </strong>{currentUser.user.id}</h4>
            <div className="drop-menu">
                <div>
                    <select className="form-select selected-form" aria-label="size 3 select example" onChange={handleSort}>
                        <option defaultValue>Sort By</option>
                        <option value='title'> Title</option>
                        <option value='created_at'> Recent</option>
                    </select>
                </div>
                <div>
                    <select className="form-select selected-form" aria-label="size 3 select example" onChange={handleFilter}>
                        <option defaultValue>Apply filter</option>
                        <option value='pending'> Pending</option>
                        <option value='in-progress'> In Progress</option>
                        <option value='deleted_at'> Deleted Tasks</option>
                    </select>
                </div>
                <div>
                    <input value={searchParam} onChange={(event)=>setSearchParam(event.target.value)} placeholder="Search here"/>
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>
                {(role === 'admin') && <div>
                    <select className="form-select  selected-form" aria-label="size 3 select example" onChange={handleTasks}>
                        <option value="yourTask">Your Tasks</option>
                        <option value='allTasks'> All Tasks</option>
                    </select>
                </div>}
            </div>
            <table className="table table-hover table-primary">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Creator</th>
                        <th>Assignee</th>
                        <th>Due Date</th>
                        <th>Delete</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {info ?
                    <tbody>
                        {info.map((item) => {
                            return [
                                <tr key={item}>
                                    {/* <td>{item.title}</td> */}
                                    <td> {inEditMode.status && inEditMode.rowKey == item.id ? (
                                        <input value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                            />
                                    ) : (item.title)
                                    }
                                    </td>
                                    <td> {inEditMode.status && inEditMode.rowKey == item.id ? (
                                        <input value={description}
                                            onChange={(event) => setDescription(event.target.value)} 
                                             />
                                    ) : (item.description)
                                    }
                                    </td>
                                    <td>
                                        {(currentUser.user.id === item.assignee && item.deleted_by === 'active') ? <select className="form-select" aria-label="size 12 select example" onChange={(e) => handleUpdate(e, item.id)}>
                                            <option defaultValue>{item.status}</option>
                                            <option value="in-progress">in-progress</option>
                                            <option value="completed">completed</option>
                                            <option value="deleted">deleted</option>
                                        </select> : item.status}
                                    </td>
                                    <td>{item.creator}</td>
                                    <td>{item.assignee}</td>
                                    <td> {inEditMode.status && inEditMode.rowKey == item.id ? (
                                        <input value={due_date}
                                            onChange={(event) => setDueDate(event.target.value)} 
                                            />
                                    ) : (item.due_date)
                                    }
                                    </td>
                                    <td>     {(currentUser.user.id == item.creator && item.status != 'deleted') ? (
                                        inEditMode.status && inEditMode.rowKey === item.id ? (
                                            <React.Fragment>
                                                 <button 
                                                    className={"btn-success btn"}
                                                    onClick={() => onSave({ id: item.id, new_date: due_date, 
                                                                            new_title : title , new_description : description })}>
                                                    Save
                                                </button>
                                                <button
                                                    className={"btn-secondary btn"}
                                                    style={{ marginLeft: 8 }}
                                                    onClick={() => onCancel()}>
                                                    Cancel
                                                </button>
                                            </React.Fragment>
                                        ) : (
                                            <button
                                                className={"btn-primary btn"}
                                                onClick={() => onEdit({ id: item.id, current_date: item.due_date, 
                                                                    current_title : item.title , current_description : item.description })}>
                                                Edit
                                            </button>
                                        )) : (<button disabled={true} className="btn btn-primary">Edit</button>)
                                    }
                                    </td>
                                    <td>{(currentUser.user.id == item.creator && item.deleted_by == 'active') ? <button className="btn btn-secondary" onClick={(e) => handleDelete(e, item.id)}>Delete</button> :
                                        <button disabled={true} className="btn btn-secondary">Delete</button>}</td>
                                </tr>
                            ]
                        })}
                    </tbody> : null}
            </table>
        </div>
    )
}
export default Task;
