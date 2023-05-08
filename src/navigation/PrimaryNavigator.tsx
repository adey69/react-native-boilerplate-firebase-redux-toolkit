import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from '../screens';
import { View } from 'react-native';
import styles from './styles';
import { theme } from '../core/theme';

const Stack = createNativeStackNavigator();

const PrimaryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerBackground: () => <View style={styles.homeHeader} />,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            color: theme.colors.white,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default PrimaryNavigator;
