import { PAGE_LOAD_ERROR, PAGE_SUCCESS } from "../../types/page";


export interface IPage {
    name: string;
    tags: any[];
    description: string;
    followers: any[];
    follow_requests: any[];
    owner: string;
    id: number;
}

export interface PageState {
    pages?: IPage[];
    error?: string;
}

interface Action {
    type: string,
    payload: {
        pages?: [];
        error?: string | null;
    }
}

const initialState: PageState = {
    pages: []

}


export const pageReducer = (state = initialState, action: Action): PageState => {
    switch (action.type) {
        case PAGE_SUCCESS:
            return { 
                pages: action.payload.pages
            }
        case PAGE_LOAD_ERROR:
            return { error: action.payload.error! }
        default:
            return state

    }
}