import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { API, Auth } from 'aws-amplify';
import { Button, Col, Collapse, DatePicker, Divider, message, Spin } from 'antd';
import Tabs from 'antd/lib/tabs';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { fetchMenuDates, userDetailsSelector, userHasAuthenticated } from '../slices/userDetails';
import MealPanel from './mealPanel';
import { meals, mealsDict, error, localStorageEmpty } from '../utils/utilitiesFuncs';
import { asyncActionFulfilled, asyncActionPending, changeDate, fetchMenuByDate, menuSelector } from '../slices/menu';
import { StyledTabs, StyledTabsPane } from '../styles/styledTabs';
import HeaderContainer from './headerContainer';

const { Panel } = Collapse
const { TabPane } = Tabs

const MenuContainer = () => {
  const { breakfast, lunch, dinner, inBetween, date, isLoading } = useSelector(menuSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (breakfast.length || lunch.length || dinner.length || inBetween.length) {
      localStorage.setItem('meals', JSON.stringify({ breakfast, lunch, dinner, inBetween, date }))
    }
  }, [breakfast, lunch, dinner, inBetween])

  const success = () => {
    message.success('התפריט נשמר בהצלחה 🥳');
  };

  const saveMenu = async (e) => {
    e.preventDefault()

    dispatch(asyncActionPending())
    try {
      await API.post('nutri-app', '/menu', {
        body: { foods: { breakfast, lunch, dinner, inBetween }, date, time: moment().format('YYYY-MM-DD, HH:mm:ss ZZ') }
      })
      success()
    } catch (err) {
      console.log(err)
      error()
    }
    dispatch(asyncActionFulfilled())
    dispatch(fetchMenuDates())
  }

  const history = useHistory()
  const { menuDates } = useSelector(userDetailsSelector)

  const handleDateChange = (newDate) => {
    menuDates.includes(newDate)
      ? dispatch(fetchMenuByDate(newDate))
      : dispatch(changeDate({ date: newDate }))
  }

  useEffect(() => {
    if (menuDates.includes(date) && localStorageEmpty()) dispatch(fetchMenuByDate(date))
  }, [menuDates])

  const screens = useBreakpoint()

  return (
    <>
      <HeaderContainer />
      <img alt="logo" src="https://res.cloudinary.com/dgmvbx86i/image/upload/v1592314657/%D7%9C%D7%95%D7%92%D7%95_%D7%A2%D7%95%D7%9E%D7%A8%D7%99_ft6jkj.png" />
      <h2>בחר תאריך</h2>
      <DatePicker
        dropdowmClassName="ant-picker-dropdown-placement-bottom"
        style={{ fontSize: '2em' }}
        defaultValue={moment(date, 'DD/MM/YYYY')}
        format="DD/MM/YYYY"
        allowClear={false}
        onChange={(time, title) => handleDateChange(title)}
        dateRender={(current) => {
          const day = current.format('DD/MM/YYYY')
          return menuDates.includes(day)
            ? (
              <div style={{ border: '1px solid #1890ff', borderRadius: '50%' }}>
                {current.date()} <br /> 🍽️
              </div>
            )
            : (
              <div>
                {current.date()} <br />
              </div>
            );
        }}
      />
      <StyledTabs tabPosition={screens.xs ? 'top' : 'left'} type="card-container" defaultActiveKey="breakfast" tabBarStyle={{ backgroundColor: '#C2D7D0' }}>
        {meals.map((meal) => (
          <StyledTabsPane key={meal} tab={mealsDict[meal]}>
            <MealPanel meal={meal} />
          </StyledTabsPane>
        ))}
      </StyledTabs>
      <br />
      <Button
        size="large"
        onClick={(e) => saveMenu(e)}
      >
        שמור תפריט יומי 💾
      </Button>
      {!screens.lg && (screens.xs || screens.sm) && <Divider />}
    </>
  )
}
export default MenuContainer;
