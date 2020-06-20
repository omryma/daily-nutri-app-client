import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Col, DatePicker, Dropdown, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { userDetailsSelector } from '../../slices/userDetails';
import { changeDate, fetchMenuByDate, menuSelector } from '../../slices/menu';
import NavBar from './navBar';

const { RangePicker } = DatePicker;

const Header = (props) => {
  const dispatch = useDispatch()
  const { menuDates } = useSelector(userDetailsSelector)
  const [actionsMenuVisible, setActionsVisibility] = useState(false)

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
export default Header
