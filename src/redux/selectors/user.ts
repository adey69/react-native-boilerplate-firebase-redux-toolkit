import {createSelector} from '@reduxjs/toolkit';

export const authSelector = createSelector(
  (state: IRootState) => state.auth,
  state => state,
);
