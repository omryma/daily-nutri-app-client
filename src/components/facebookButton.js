import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { userDetailsSelector, userIsAuthenticating } from '../slices/userDetails';
import onError from '../utils/onError';
import LoaderButton from './loaderButton';

const waitForInit = () => new Promise((res, rej) => {
  const hasFbLoaded = () => {
    if (window.FB) {
      res();
    } else {
      setTimeout(hasFbLoaded, 300);
    }
  };
  hasFbLoaded();
})

const FacebookButton = (props) => {
  const { isAuthenticating } = useSelector(userDetailsSelector)
  const dispatch = useDispatch()

  const onLoad = async () => {
    await waitForInit()
    dispatch(userIsAuthenticating(false))
  }

  useEffect(() => {
    dispatch(userIsAuthenticating(true))
    onLoad()
  }, [])

  const handleResponse = async (data) => {
    const { email, accessToken: token, expiresIn } = data;
    // eslint-disable-next-line camelcase
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { email };

    dispatch(userIsAuthenticating(true))

    try {
      const response = await Auth.federatedSignIn(
        'facebook',
        { token, expires_at },
        user
      );
      dispatch(userIsAuthenticating(false))
      props.onLogin(response);
    } catch (e) {
      dispatch(userIsAuthenticating(false))
      onError(e);
    }
  }

  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      handleResponse(response.authResponse);
    } else {
      onError(response);
    }
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus(statusChangeCallback);
  };

  const handleClick = () => {
    window.FB.login(checkLoginState, { scope: 'public_profile,email' });
  };

  return (
    <Button
      onClick={() => handleClick()}
      disabled={isAuthenticating}
      loading={isAuthenticating}
      style={{ background: '#3b5598' }}
    >
      התחבר באמצעות פייסבוק
    </Button>

  );
}

export default FacebookButton;
