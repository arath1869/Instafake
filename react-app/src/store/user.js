const LOAD = 'user/LOAD';
const UPDATE_ONE = 'user/UPDATE_ONE'

const load = ({ users }) => ({
    type: LOAD,
    payload: users
})

const update = (user) => ({
    type: UPDATE_ONE,
    payload: user,
})

export const get_users = () => async (dispatch) => {
    const response = await fetch(`/api/users`);
    if (response.ok) {
        const list = await response.json()
        dispatch(load(list))
    }
}

export const update_user = (id, profileImgUrl) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({profileImgUrl})
    })
    if(response.ok) {
        const user = await response.json()
        dispatch(update(user))
        return user
    }
}

const initialState = {
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allUsers = {}
            for (let user of action.payload) {
                allUsers[user.id] = user;
            }
            return {
                ...allUsers,
                ...state,
            }
        }
        case UPDATE_ONE: {
            return {
                ...state,
                [action.payload.user.id]: action.payload.user,
            }
        }
        default:
            return state;
    }
}

export default reducer