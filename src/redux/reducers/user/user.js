import { ADDSV, DELETE, EDIT_SV, SEARCH } from "./action/constant";

const initialState = {
    SVList: [{
    }],
    editSV: null,
    keyWord: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDSV: {
            let SVList = [...state.SVList];
            if (action.payload.maSV) {
                const index = SVList.findIndex(sv => sv.maSV === action.payload.maSV);
                if (index !== -1) {
                    SVList[index] = action.payload;
                    state.SVList = SVList;
                    return { ...state };
                };
                const svNew = { ...action.payload };
                state.SVList = [...SVList, svNew];
            };
            return { ...state };
        };
        case DELETE: {
            // Tạo listSV để không bị tham chiếu để setState
            let SVList = [...state.SVList];
            const index = SVList.findIndex((sv) => sv.maSV === action.payload);

            if (index !== -1) {
                SVList.splice(index, 1);
            }
            state.SVList = SVList;
            return { ...state };

        }
        case EDIT_SV:
            state.editSV = action.payload;
            return { ...state };

        case SEARCH:
            console.log(action)
            state.keyWord = action.payload;
            return { ...state };
        default: return { ...state };

    }
};

export default userReducer;
