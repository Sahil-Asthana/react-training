import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Modal from 'react-bootstrap/Modal';
import { logout } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser, createUser, updateUser, createTask } from "../actions/user";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const User = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const form = useRef();
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [assignee, setAssignee] = useState(null);
  const [createFlag, setCreateFlag] = useState(false);
  const [createTaskFlag, setCreateTaskFlag] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [sortMethod, setSortMethod] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  //for task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const dispatch = useDispatch();
  const navigates = useNavigate();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  }
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  }
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  }
  const onChangePasswordConfirmation = (e) => {
    const password_confirmation = e.target.value;
    setPasswordConfirmation(password_confirmation);
  }
  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  }

  //for task
  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  }
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  }

  const onChangeDueDate = (e) => {
    const due_date = e.target.value;
    setDueDate(due_date);
  }

  // For sorting
  const handleSort = (e) => {
    setSortMethod(e.target.value);
    dispatch(getAllUsers(e.target.value, filterMethod, searchParam)).then((response) => {
      console.log(response.data);
      setCreateFlag(false);
      setInfo(response.data);
    })
      .catch((error) => {
        console.log(error);
      })
  }
  //for filtering
  const handleFilter = (e) => {
    console.log(e.target.value);
    // if(e.target.value === 'Apply filter') e.target.value = null;
    setFilterMethod(e.target.value);
    dispatch(getAllUsers(sortMethod, e.target.value, searchParam)).then((response) => {
      console.log(response.data);
      setCreateFlag(false);
      setInfo(response.data);
    })
      .catch((error) => {
        console.log(error);
      })
  }
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(sortMethod, filterMethod, searchParam)).then((response) => {
      console.log(response.data);
      setCreateFlag(false);
      setInfo(response.data);
    })
      .catch((error) => {
        console.log(error);
      })
  }
  // assigning task to user
  const handleCreateTaskForm = (e, id) => {
    e.preventDefault();
    setAssignee(id);
    setCreateTaskFlag(!createTaskFlag);
  }

  const handleTaskCreation = (e) => {
    e.preventDefault();
    dispatch(createTask(title, description, assignee, due_date)).then((response) => {
      console.log(response.data);
      setCreateTaskFlag(false);
      window.location.reload(true);
    })
      .catch((error) => {
        console.log(error);
      })
  }

  // Get all users
  useEffect(() => {
    UserService.getAllUsers().then((response) => {
      console.log(response.data);
      setCreateFlag(false);
      setInfo(response.data);
    })
      .catch((error) => {
        if(error.response && error.response.status){
          console.log("Token is not valid");
          return dispatch(logout(navigates));
        }
      })
  }, [dispatch, navigates])

  const handleClose = (e) => {
    setCreateFlag(false);
    setCreateTaskFlag(false);
  }

  //Show create form
  const handleCreateForm = (e) => {
    e.preventDefault();
    setCreateFlag(!createFlag);
  }
  // create a user 
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createUser(name, email, password, password_confirmation, role)).then((response) => {
      console.log(response);
      setCreateFlag(false);
      window.location.reload(true);
    })
      .catch((error) => {
        console.log(error);
      })
  }
  // delete a user
  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteUser(id)).then((response) => {
      console.log(response);
      setCreateFlag(false);
      window.location.reload(true);
    })
      .catch((error) => {
        console.log(error);
      })
  }
  // update role of user
  const handleUpdate = (e, id) => {
    dispatch(updateUser(id, e.target.value)).then((response) => {
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <div className="board">{currentUser.user.name} , You have Admin Privileges</div>
      </div>
      <button className="btn btn-primary" onClick={handleCreateForm}>Create User</button>
      <Modal show={createFlag} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate} ref={form}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onChangeName}
                validation={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validation={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validation={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <Input
                type="password"
                className="form-control"
                name="password_confirmation"
                value={password_confirmation}
                onChange={onChangePasswordConfirmation}
                validation={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <Input
                type="text"
                className="form-control"
                name="role"
                value={role}
                onChange={onChangeRole}
                validation={[required]}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Submit</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={createTaskFlag} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaskCreation} ref={form}>
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
        </Modal.Body>
      </Modal>

      {/* Above is for creating user by admin */}

      <div>
        <div className="div-button">
        {/* <button><i className="fa fa-cog" aria-hidden="true"></i></button>  */}
          <div>
            <select className="form-select selected-form" aria-label="size 3 select example" onChange={handleSort}>
              <option defaultValue>Sort By</option>
              <option value='name'>Name</option>
              <option value='email'> Email</option>
              <option value='created_at'> Recent</option>
            </select>
          </div>
          <div>
            <select className="form-select selected-form" aria-label="size 3 select example" onChange={handleFilter}>
              <option defaultValue>Apply filter</option>
              <option value='admin'> Admin User</option>
              <option value='normal'> Normal User</option>
              <option value='deleted_at'> Deleted User</option>
            </select>
          </div>
          <div className="searchItem">
            <input className="searchBox" value={searchParam} onChange={(event) => setSearchParam(event.target.value)} placeholder="Search here" />
            <button className="btn btn-success" onClick={handleSearch}>Search</button>
          </div>
        </div>
        <table className="table table-hover table-primary">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created By</th>
              <th>Deleted By</th>
              <th>Assign Task</th>
              <th>Action</th>
            </tr>
          </thead>
          {info ? <tbody>
            {info.map((item) => {
              return [
                <tr key={item}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <select className="form-select" aria-label="size 3 select example" onChange={(e) => handleUpdate(e, item.id)}>
                      <option defaultValue>{item.role}</option>
                      <option value="admin">admin</option>
                      <option value="normal">normal</option>

                    </select>
                  </td>
                  <td>{item.created_by}</td>
                  <td>{item.deleted_by}</td>
                  <td><button className="btn btn-secondary task-button" onClick={(e) => handleCreateTaskForm(e, item.id)}>+</button></td>
                  <td><button className="btn btn-danger" onClick={(e) => handleDelete(e, item.id)}>Delete</button></td>
                </tr>
              ]
            })}
          </tbody> : null}
        </table>
      </div>
    </div>
  );
};
export default User;