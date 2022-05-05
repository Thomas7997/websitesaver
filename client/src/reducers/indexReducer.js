import {
    LIST_WEBSITE_SUCCESS,
    LIST_WEBSITE_FAILURE
} from '../actions/types';

const initialState = {
    success : null,
    isLoading : true,
    website : {},
    websites : []
};

export default (state = initialState, action) => {
    const { payload } = action;
    console.log(payload, action.type);
    switch (action.type) {
        case LIST_WEBSITE_SUCCESS :
            return {
                ...state,
                success : true,
                websites : payload.data
            };
        case LIST_WEBSITE_FAILURE :
            return {
                ...state,
                success : false,
                websites : []
            };
        default :
            return state;
    }
}