import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { API } from 'aws-amplify';
import { meals } from '../utils/texts';

const getInitialState = (attr) => (localStorage.meals ? JSON.parse(localStorage.meals)[attr] : [])

export const initialState = {
  breakfast: getInitialState('breakfast'),
  lunch: getInitialState('lunch'),
  dinner: getInitialState('dinner'),
  inBetween: getInitialState('inBetween'),
  date: localStorage.meals ? JSON.parse(localStorage.meals).date : moment().format('DD/MM/YYYY'),
  isLoading: false,
  isError: false
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addToMenu: (state, { payload }) => {
      const { meal, newFood } = payload
      state[meal] = state[meal].concat([newFood])
    },
    removeFromMenu: (state, { payload }) => {
      const { meal, removedValue } = payload
      state[meal] = state[meal].filter((item) => item.foodName !== removedValue)
    },
    asyncActionPending: (state) => {
      state.isLoading = true
    },
    asyncActionFulfilled: (state) => {
      state.isLoading = false
    },
    changeDate: (state, { payload }) => {
      state.isLoading = true
      const { date } = payload
      state.date = date
      meals.forEach((meal) => state[meal] = [])
      state.isLoading = false
    },
    fetchMenuFulfilled: (state, { payload }) => {
      const { date, foods } = payload
      state.date = date
      meals.forEach((meal) => state[meal] = foods[meal])
      state.isLoading = false
    },
    fetchMenuFailure: (state) => {
      state.isLoading = false
      state.isError = true
    }
  }
})

export const { addToMenu, removeFromMenu, asyncActionPending, asyncActionFulfilled, changeDate, fetchMenuFulfilled, fetchMenuFailure } = menuSlice.actions

export const menuSelector = (state) => state.menu

export default menuSlice.reducer

export const fetchMenuByDate = (date) => async dispatch => {
  dispatch(asyncActionPending())
  try {
    const menuRes = await API.get('nutri-app', `/menu/${encodeURIComponent(date)}`)
    const { foods } = menuRes
    dispatch(fetchMenuFulfilled({ date, foods }))
  } catch (e) {
    dispatch(fetchMenuFailure())
  }
}
