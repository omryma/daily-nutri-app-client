import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from 'styled-components';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/global'
import App from './App';
import rootReducer from './slices';
import config from './config'
import Home from './components/home';
import LoginForm from './components/login';
import SignUp from './components/signup';
import CreateNewFood from './components/createNewFood';
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
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignUp} />
            {/*<Route exact path="/createNewFood" component={CreateNewFood} />*/}
            {/*<ModalRoute path="/createNewFood" parentPath="/" component={CreateNewFood} />*/}
            {/*<ModalContainer />*/}
          </Switch>
          {/* eslint-disable-next-line react/no-children-prop */}
          {/*<Route path="/createNewFood" children={<CreateNewFood />} />*/}
        </App>
      </ThemeProvider>
    </HashRouter>
  </Provider>
), document.getElementById('root'))
