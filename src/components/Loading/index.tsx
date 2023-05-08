import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';
import {theme} from '../../core/theme';

interface IProps {
  animating: boolean;
}
const Loading = ({animating}: IProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        size={'large'}
        color={theme.colors.primary}
      />
    </View>
  );
};

export default React.memo(Loading);
