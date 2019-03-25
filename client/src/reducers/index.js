import { combineReducers } from 'redux';
import TempReducer from './reducer_temp';

const rootReducer = combineReducers({
    temp: TempReducer
});

export default rootReducer;
