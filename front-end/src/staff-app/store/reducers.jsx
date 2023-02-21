import { combineReducers } from 'redux';
import { DailyActivityReducer } from 'staff-app/daily-care/store/reducer';


const combinedAppReducers=combineReducers({DailyActivityReducer:DailyActivityReducer})

export default combinedAppReducers