import axios from 'axios';
import {
    LIST_WEBSITE_FAILURE,
    LIST_WEBSITE_SUCCESS,
    READ_WEBISTE_SUCCESS,
    READ_WEBSITE_FAILURE,
    DELETE_WEBSITE_FAILURE,
    DELETE_WEBSITE_SUCCESS,
    SAVE_WEBSITE_FAILURE,
    SAVE_WEBSITE_SUCCESS
} from "./types";

axios.defaults.baseURL = "http://localhost:6060"

export const save_website = url => async dispatch => {
    try {
        const res = await axios.post("/save");
        dispatch({
            type : SAVE_WEBSITE_SUCCESS,
            payload : res.data
        })
    }

    catch (err) {
        console.log(err);
        dispatch({
            type : SAVE_WEBSITE_FAILURE
        })
    }
}

export const list_websites = () => async dispatch => {
    try {
        const res = await axios.get("/list");
        dispatch({
            type : LIST_WEBSITE_SUCCESS,
            payload : res.data
        });
    }

    catch (err) {
        console.log(err)
        dispatch({
            type : LIST_WEBSITE_FAILURE
        });
    }
}

// The other two requests later