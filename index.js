/**
 * @format
 */

import App from './App';
import {Navigation} from 'react-native-navigation';
import Buttons from './components/buttons/Buttons';
import Main from './screens/Main';
import Login from './screens/Login';
import Register from './screens/Register';
import Chat from './screens/Chat';

Navigation.registerComponent('Home', () => App);
Navigation.registerComponent('Main', () => Main);
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Register', () => Register);
Navigation.registerComponent('Chat', () => Chat);
Navigation.registerComponent('Buttons', () => Buttons);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 1,
      visible: false,
      drawBehind: false,
      animate: false,
      borderHeight: 1,
      backButton:{
        color: 'white'
      },
      rightButtons: [
        {
          id: 'buttons',
          component: {
            id: 'buttons',
            name: 'Buttons',
          },
        },
      ],
      background: {
        color: '#222831',
      },
    },
  });

  Navigation.setRoot({
    root: {
      sideMenu: {
        center: {
          stack: {
            id: 'MAIN_STACK',
            children: [
              {
                component: {
                  id: 'homeScreen',
                  name: 'Login'
                },
              },
            ],
          },
        },
      },
    },
  }).then()

});
