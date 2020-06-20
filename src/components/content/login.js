import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import { Button, Checkbox, Divider, Form, Input, Row } from 'antd';
import { userDetailsSelector, userHasAuthenticated, userIsAuthenticating } from '../../slices/userDetails';
import FacebookButton from '../navigation/facebookButton';
import { loginError } from '../../utils/utilitiesFuncs';

const LoginForm = () => {
  const dispatch = useDispatch()
  const { isAuthenticating } = useSelector(userDetailsSelector)
  const history = useHistory()

  const handleSuccessfulLogin = () => {
    dispatch(userHasAuthenticated(true))
    history.push('/')
  }

  const handleLogin = async (e) => {
    dispatch(userIsAuthenticating(true))
    try {
      await Auth.signIn(e.Email, e.password);
      handleSuccessfulLogin()
    } catch (error) {
      loginError();
    }
    dispatch(userIsAuthenticating(false))
  }

  return (
    <>
      <Row justify="center" align="middle">
        <img alt="logo" src="https://res.cloudinary.com/dgmvbx86i/image/upload/v1592314657/%D7%9C%D7%95%D7%92%D7%95_%D7%A2%D7%95%D7%9E%D7%A8%D7%99_ft6jkj.png" />

      </Row>
      <h2>משתמש קיים</h2>
      <Row justify="center" align="middle">
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          style={{ maxWidth: '30em' }}
        >
          <Form.Item
            name="Email"
            rules={[{ required: true, message: 'שדה חובה' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="הכנס מייל..." />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'שדה חובה' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="הזן סיסמה..."
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={isAuthenticating}>
              התחברות
            </Button>
          </Form.Item>
          <h2>או</h2>
          <FacebookButton onLogin={() => handleSuccessfulLogin()} />
        </Form>
      </Row>
      <br />
      <Row justify="center" align="middle">
        <h4 style={{ margin: '0px' }}>פעם ראשונה? &nbsp;</h4>
        <Link to="/#signup">הירשם</Link>
      </Row>
    </>
  )
}

export default LoginForm
