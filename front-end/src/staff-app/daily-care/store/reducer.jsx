import { actions } from "./action";

const initialState={

    studentsArr:[]
}

const DailyActivityReducer=(state=initialState,payload={})=>{

switch (payload.type) {
    case actions.SET_NEW_STUDENT_ARR:
        
        return {...state,studentsArr:payload.data};

    default:
    	return state;
}

}

export {DailyActivityReducer}