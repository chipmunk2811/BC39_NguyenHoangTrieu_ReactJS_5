import { ADDSV, DELETE, EDIT_SV, SEARCH } from "./constant";

export const actADDSV = (sv) => {
    return {
        type: ADDSV,
        payload: sv,
    };
};

export const actDelete = (maSV) => {
    return {
        type: DELETE,
        payload: maSV,
    };
};

export const actSVUser = (sv) => {
    return {
        type: EDIT_SV,
        payload: sv,
    };
};

export const actKeyWord = (keyword) => {
    return {
        type: SEARCH,
        payload: keyword,
    };
};