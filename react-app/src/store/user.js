const LOAD = 'user/LOAD';

const load = ({ users }) => ({
    type: LOAD,
    payload: users
})

export const get_users = () => async (dispatch) => {
    const response = await fetch(`/api/users`);
    if (response.ok) {
        const list = await response.json()
        dispatch(load(list))
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
        default:
            return state;
    }
}

export default reducer