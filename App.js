import React,{ Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import  reducers from './src/reducer';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';
import ReduxThunk from 'redux-thunk'
import Router from './src/Router'

class App extends Component{

  componentWillMount(){
    //use your firebase config below is wrong
    const firebaseConfig = {
      apiKey: "AIzaSyBvW66e2EltcuQFQfdgfdbfdsbdbvdsfbd8",
      authDomain: "manager-99c29.fbfdbdfbeapp.com",
      databaseURL: "https://manbdfbfdb.firebaseio.com",
      storageBucket: "manager-99c29.appspot.com",
      messagingSenderId: "70444294bdfbfdb",
    };
    firebase.initializeApp(firebaseConfig);
  }

  render(){
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return(
      <Provider store = {store}>
      <Router/>
      {/* <View  style={{paddingTop: 50}}>
        <LoginForm/>
      </View> */}
      </Provider>
    )
  }
}


export default App;


