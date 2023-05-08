/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { AuthNavigator, PrimaryNavigator } from './navigation';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {!user ? <AuthNavigator /> : <PrimaryNavigator />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
