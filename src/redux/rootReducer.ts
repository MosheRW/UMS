import { combineReducers } from '@reduxjs/toolkit';
import userData from './features/userData/userDataSlice';
import  syncStatus  from './features/syncStatus/syncStatusSlice';

const rootReducer = combineReducers({
  userData: userData,
  syncStatus,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
