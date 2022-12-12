import { useSelector } from "react-redux";
import { PAGE_LOAD_ERROR, PAGE_SUCCESS } from "../../types/page";


export interface IPage {
    name: string;
    tags: any[];
    description: string;
    followers: string[];
    follow_requests: string[];
    owner: string;
    id: number;
    button:  React.FC;
}

export interface PageState {
    pages?: IPage[];
    error?: string;
}

interface Action {
    type: string,
    payload: {
        pages?: IPage[];
        error?: string | null;
    }
}

const initialState: PageState = {
    pages: [],
}


export const pageReducer = (state = initialState, action: Action): PageState => {
    switch (action.type) {
        case PAGE_SUCCESS:
            return { 
                pages: action.payload.pages,
            }
        case PAGE_LOAD_ERROR:
            return { error: action.payload.error! }
        default:
            return state

    }
}