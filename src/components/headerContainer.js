import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import { Button, Col, DatePicker, Dropdown, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { fetchMenuDates, userDetailsSelector, userHasAuthenticated } from '../slices/userDetails';
import { changeDate, fetchMenuByDate, menuSelector } from '../slices/menu';
import NavBar from './navBar';

const { RangePicker } = DatePicker;

const HeaderContainer = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { date } = useSelector(menuSelector)
  const { menuDates } = useSelector(userDetailsSelector)
  const [actionsMenuVisible, setActionsVisibility] = useState(false)

  const handleDateChange = (newDate) => {
    menuDates.includes(newDate)
      ? dispatch(fetchMenuByDate(newDate))
      : dispatch(changeDate({ date: newDate }))
  }

  const screens = useBreakpoint()

  return (

    <Row justify="start">
      <Col span={4}>
        <Dropdown
          overlay={<NavBar onMenuClick={() => setActionsVisibility(false)} />}
          visible={actionsMenuVisible}
          onVisibleChange={(flag) => setActionsVisibility(flag)}
          placement="bottomRight"
          trigger={['click', 'hover']}
        >
          <Button size="large" style={{ float: 'right' }}>
            {screens.xs ? <>🍔</> : <>🍔 פעולות</> }
          </Button>
        </Dropdown>
      </Col>
    </Row>
      
  )
}
export default HeaderContainer
