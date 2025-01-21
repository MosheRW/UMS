import { combineReducers } from '@reduxjs/toolkit';
import userData from './features/userData/userDataSlice';

const rootReducer = combineReducers({
  userData: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
