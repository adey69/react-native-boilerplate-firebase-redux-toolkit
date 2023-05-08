import AsyncStorage from '@react-native-async-storage/async-storage';
import { createWhitelistFilter } from 'redux-persist-transform-filter';

const authReduxWhitelist = createWhitelistFilter('auth');

export const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  transforms: [authReduxWhitelist],
  whitelist: ['auth'],
};
