import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import Layout from 'antd/lib/layout';
import config from './config';
import { userHasAuthenticated, userIsAuthenticating } from './slices/userDetails';
import onError from './utils/onError';
import NavBar from './components/navBar';
import HeaderContainer from './components/headerContainer';

const { Header, Content, Footer, Sider } = Layout;

const App = (props) => {
  const { children } = props
  const dispatch = useDispatch()
  const history = useHistory()

  const loadFacebookSDK = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
      });
    };

    (function (d, s, id) {
      // eslint-disable-next-line prefer-const
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      // eslint-disable-next-line prefer-const
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  const onLoad = async () => {
    dispatch(userIsAuthenticating(true))
    loadFacebookSDK()
    try {
      await Auth.currentAuthenticatedUser()
      dispatch(userHasAuthenticated(true))
    } catch (e) {
      if (e !== 'No current user' && e !== 'not authenticated') {
        onError(e)
      }
      // else history.push('/login')
    }
    dispatch(userIsAuthenticating(false))
  }

  useEffect(() => {
    onLoad()
  }, [])

  const [siderCollapsed, setCollapse] = useState(false)

  return (
    <Layout style={{ direction: 'rtl' }}>
      {/*<Header style={{ minHeight: '3em', padding: '0px' }}><HeaderContainer /></Header>*/}
      <Content style={{ minHeight: '90vh' }}>{children}</Content>
    </Layout>
  )
}

export default App;
