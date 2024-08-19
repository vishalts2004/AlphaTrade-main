import { combineReducers } from 'redux';
import balanceReducer from './balanceReducer';

const rootReducer = combineReducers({
  balance: balanceReducer,
});

export default rootReducer;
