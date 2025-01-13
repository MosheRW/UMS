import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SyncStatusState {
    isSyncing: boolean
};

const initialState: SyncStatusState = {
    isSyncing: false
};

export const syncStatusSlice = createSlice({
    name: "syncStatus",
    initialState,
    reducers: {
        setIsSyncing: (state, action: PayloadAction<boolean>) => {
            state.isSyncing = action.payload;
        }
    }
});
export const { setIsSyncing } = syncStatusSlice.actions;
export default syncStatusSlice.reducer;
