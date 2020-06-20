import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Amplify } from 'aws-amplify';
import { GlobalStyles } from './styles/global'
import App from './App';
import rootReducer from './slices';
import config from './config'
import Home from './components/layouts/home';
import LoginForm from './components/content/login';
import SignUp from './components/content/signup';
import 'antd/dist/antd.css';

const store = configureStore({ reducer: rootReducer })

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: 'nutri-app',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

render((
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <GlobalStyles />
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>
), document.getElementById('root'))
