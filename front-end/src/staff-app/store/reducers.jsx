import { combineReducers } from 'redux';
import { StudentsList } from 'staff-app/daily-care/store/reducer';


const combinedAppReducers=combineReducers({StudentsList:StudentsList})

export default combinedAppReducers