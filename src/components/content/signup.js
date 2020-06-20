import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useHistory, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Form, Input, Row } from 'antd';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import { userHasAuthenticated, userIsAuthenticating } from '../../slices/userDetails';
import { onError } from '../../utils/utilitiesFuncs';
import FacebookButton from '../navigation/facebookButton';

const SignUp = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [resendedCode, resendCode] = useState(false)

  const handleSignup = async (e) => {
    dispatch(userIsAuthenticating(true))
    try {
      const { email, password } = e
      await Auth.signUp({
        username: email,
        password
      })
      localStorage.userHasSignedUp = JSON.stringify({ email, password })
    } catch (error) {
      if (error.message !== 'An account with the given email already exists.') onError(error)
    }
    dispatch(userIsAuthenticating(false))
  }

  const handleSuccessfulSign = () => {
    localStorage.removeItem('userHasSignedUp')
    dispatch(userHasAuthenticated(true))
    history.push('/')
  }

  const handleConfirmationCode = async (e) => {
    dispatch(userIsAuthenticating(true))
    try {
      const { email, password } = JSON.parse(localStorage.userHasSignedUp)
      await Auth.confirmSignUp(email, e.confirmationCode);
      await Auth.signIn(email, password);
      handleSuccessfulSign()
    } catch (error) {
      onError(error)
    }
    dispatch(userIsAuthenticating(false))
  }

  const resendConfirmationCode = async () => {
    try {
      const { email } = JSON.parse(localStorage.userHasSignedUp)
      await Auth.resendSignUp(email);
      resendCode(true)
    } catch (error) {
      onError(error)
    }
  }

  return (

    <>
      <Row justify="center" align="middle">
        <img alt="logo" src="https://res.cloudinary.com/dgmvbx86i/image/upload/v1592314657/%D7%9C%D7%95%D7%92%D7%95_%D7%A2%D7%95%D7%9E%D7%A8%D7%99_ft6jkj.png" />
      </Row>
      { localStorage.userHasSignedUp ? (
        <>
          <h2>הזן קוד אימות שנשלח אליך במייל</h2>
          <Row justify="center" align="middle">
            <Form
              name="confirmation"
              onFinish={handleConfirmationCode}
              style={{ maxWidth: '30em' }}
            >
              <Form.Item
                name="confirmationCode"
                rules={[{ required: true, message: 'שדה חובה' }]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="confirmation"
                  placeholder="הזן קוד אימות..."
                />
              </Form.Item>
              <Form.Item>
                <Button onClick={resendConfirmationCode}>
                  שלח קוד מחדש
                </Button>
                { resendedCode && <h4>הקוד נשלח מחדש</h4>}
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">
                  סיים
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </>
      ) : (
        <>
          <h2>הירשם</h2>
          <Row justify="center" align="middle">
            <Form
              name="signup"
              onFinish={handleSignup}
              style={{ maxWidth: '30em' }}
            >
              <Form.Item
                name="email"
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
              <Form.Item
                name="אשר סיסמה"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'נא אשר סיסמה שנית',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      // eslint-disable-next-line prefer-promise-reject-errors
                      return Promise.reject('הסיסמאות לא תואמות');
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="הזן סיסמה שנית..."
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">
                  הירשם
                </Button>
              </Form.Item>
              <h2>או</h2>
              <FacebookButton onLogin={() => handleSuccessfulSign()} />
            </Form>
          </Row>
          <br />
          <Row justify="center" align="middle">
            <h4 style={{ margin: '0px' }}>כבר רשום? &nbsp;</h4>
            <Link to="/#login">התחבר</Link>
          </Row>
        </>
      )}

    </>
  )
}

export default SignUp;
