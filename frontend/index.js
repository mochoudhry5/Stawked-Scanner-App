/**
 * @format
 */
import 'react-native-get-random-values'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
  //this function is called when the notificatio is clicked
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
    requestPermissions: Platform.OS === 'ios',
    
});
AppRegistry.registerComponent(appName, () => App);
