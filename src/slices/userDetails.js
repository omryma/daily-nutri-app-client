import { createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

export const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  hasSignedUp: false,
  menuDates: [],
  isLoading: false,
  isError: false
}

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    userHasAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload
    },
    userIsAuthenticating: (state, { payload }) => {
      state.isAuthenticating = payload
    },
    asyncActionPending: (state) => {
      state.isLoading = true
    },
    fetchDatesFulfilled: (state, { payload }) => {
      const { dates } = payload
      state.menuDates = dates.map((date) => date.menuID)
      state.isLoading = false
    },
    fetchDatesFailure: (state) => {
      state.isLoading = false
      state.isError = true
    }
  }
})

export const { userHasAuthenticated, userIsAuthenticating, asyncActionPending, fetchDatesFulfilled, fetchDatesFailure } = userDetailsSlice.actions

export const userDetailsSelector = (state) => state.userDetails

export default userDetailsSlice.reducer

export const fetchMenuDates = () => async dispatch => {
  dispatch(asyncActionPending())
  try {
    const dates = await API.get('nutri-app', '/menus')
    dispatch(fetchDatesFulfilled({ dates }))
  } catch (e) {
    dispatch(fetchDatesFailure())
  }
}
