import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Menu, Drawer } from 'antd'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import CreateNewFood from '../content/createNewFood';
import { userHasAuthenticated } from '../../slices/userDetails';

const NavBar = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [drawerOpen, setDrawer] = useState(false)
  const { onMenuClick } = props

  const handleLogout = async () => {
    await Auth.signOut();
    dispatch(userHasAuthenticated(false))
    localStorage.removeItem('userHasSignedUp')
    localStorage.removeItem('meals')
    history.push('/login')
  }

  const handleClick = ({ key }) => {
    onMenuClick()
    if (key === '1') setDrawer(true)
    if (key === '3') handleLogout()
  }

  const screens = useBreakpoint()

  return (
    <>
      <Menu mode="inline" onClick={(e) => handleClick(e)} style={{ direction: 'rtl' }}>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <Menu.Item key="1">
          הוסף מאכל 👩‍🍳
        </Menu.Item>
        <Menu.Item key="2">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=omrymauer@gmail.com" target="_blank" rel="noopener noreferrer">צור קשר 💌</a>
        </Menu.Item>
        <Menu.Item key="3">
          התנתק 🙅‍♂️
        </Menu.Item>
      </Menu>

      <Drawer
        title="הוסף פריט חדש"
        width={screens.xs ? '85%' : '75%'}
        onClose={() => setDrawer(false)}
        visible={drawerOpen}
        style={{ direction: 'rtl' }}
      >
        <CreateNewFood />
      </Drawer>
    </>
  )
}

export default NavBar;
