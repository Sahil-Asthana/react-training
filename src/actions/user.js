import UserService from "../services/user.service";
import { SET_MESSAGE, UPDATE, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS } from "./type";
export const updateMe = (name, email) => (dispatch) => {
    return UserService.updateMe(name, email).then((data) => {
        dispatch({
            type: UPDATE,
            payload: { user: data }
        });
        // dispatch({
        //     type: LOGIN_SUCCESS,
        //     payload: { user: data }
        // })
        return Promise.resolve(data);
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    }
    );
};
export const getAllUsers = (sortMethod, filterMethod, searchParam, currentPage) => (dispatch) => {
    return UserService.getAllUsers(sortMethod, filterMethod, searchParam, currentPage).then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: response.data
        });
        return response;
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    }
    );
};
export const deleteUser = (id) => (dispatch) => {
    return UserService.deleteUser(id).then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: response.data
        });
        Promise.resolve();
        return JSON.stringify(response.data);
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: JSON.stringify(error.response.data)
        });
        Promise.reject();
        return error.response.data;
    })
};

export const bulkDeleteUser = (arrayId) => (dispatch) => {
    return UserService.bulkDeleteUser(arrayId).then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: response.data
        });
        return Promise.resolve();
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: JSON.stringify(error.response.data)
        });
        return Promise.reject();
    })
}
export const createUser = (name, email, password, password_confirmation, role) => (dispatch) => {
    return UserService.createUser(name, email, password, password_confirmation, role).then((response) => {
        dispatch({
            type: REGISTER_SUCCESS
        });
        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message
        });
        return Promise.resolve(response.data);
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: REGISTER_FAIL
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject(error);
    })
}

export const updateUser = (id, role) => (dispatch) => {
    return UserService.updateUser(id, role).then((response) => {
        dispatch({
            type: UPDATE,
            payload: { user: response.data }
        })
        return response.data
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return message;
    })
}
////////////////////////////////////////////////////
//Below handles tasks

export const createTask = (title, description, assignee, due_date) => (dispatch) => {
    return UserService.createTask(title, description, assignee, due_date).then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: { task: response.data }
        })
        return response.data;
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}

export const showAllTasks = (sortMethod, filterMethod, searchParam, currentPage, id) => (dispatch) => {
    return UserService.showAllTasks(sortMethod, filterMethod, searchParam, currentPage, id).then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: response.data
        });
        return response;
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}

export const getUserTask = (id) => (dispatch) => {
    return UserService.getUserTask(id).then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: response.data
        });
        return response;
    })
        .catch((error) => {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
            return Promise.reject();
        })
}

export const updateStatus = (id, status) => (dispatch) => {
    return UserService.updateStatus(id, status).then((response) => {
        dispatch({
            type: UPDATE,
            payload: response.data
        })
        return response.data;
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return message;
    });
}

export const deleteTask = (id) => (dispatch) => {
    return UserService.deleteTask(id).then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: response.data
        });
        Promise.resolve();
        return JSON.stringify(response.data);
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: (message)
        });
        Promise.reject();
        return error.response.data;
    })
};

export const bulkDeleteTask = (arrayId) => (dispatch) => {
    return UserService.bulkDeleteTask(arrayId).then((response) => {
        dispatch({
            type: SET_MESSAGE,
            payload: response.data
        });
         return response.data;
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: JSON.stringify(error.response.data)
        });
        return Promise.reject();
    })
}

export const editTask = (id, title, description, due_date) => (dispatch) => {
    return UserService.editTask(id, title, description, due_date).then((response) => {
        dispatch({
            type: UPDATE,
            payload: response.data
        })
        return response.data;
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: (message)
        });
        //  Promise.reject();
        return error.response.data;
    })
}