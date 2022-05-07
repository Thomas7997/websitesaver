import {
    LIST_WEBSITE_SUCCESS,
    LIST_WEBSITE_FAILURE,
    WEBSITE_CONTENT_SUCCESS,
    WEBSITE_CONTENT_FAILURE
} from '../actions/types';

const initialState = {
    success : null,
    isLoading : true,
    website : {},
    websites : [],
    content : "",
    title : "" // URL
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
        case WEBSITE_CONTENT_SUCCESS :
            return {
                ...state,
                success : true,
                content : payload.data,
                title : payload.url,
                isLoading : false
            };
        case WEBSITE_CONTENT_FAILURE :
            return {
                ...state,
                success : false,
                isLoading : false
            };
        default :
            return state;
    }
}