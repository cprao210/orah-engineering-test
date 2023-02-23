import { actions } from "./action";

const initialState={

    studentsArr:[]
}

const StudentsList=(state=initialState,payload={})=>{

switch (payload.type) {
    case actions.SET_NEW_STUDENT_ARR:
        
        return {...state,studentsArr:[...payload.data]};
    case actions.UPDATE_STUDENT_ARR:
        
        return {...state,studentsArr:[...payload.data]};

    default:
    	return state;
}

}

export {StudentsList}