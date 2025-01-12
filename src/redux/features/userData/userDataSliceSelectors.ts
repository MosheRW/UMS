import { RootState } from '../../store';

export const selectUserId = (state: RootState) => state.userData.id;
export const selectIsLogedIn = (state: RootState) => state.userData.token?.length > 10;
