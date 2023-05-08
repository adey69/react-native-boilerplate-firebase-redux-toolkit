import React, { useEffect, useMemo } from 'react';
import { useDashboard } from './Hooks';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Images } from '../../assets';
import styles from './styles';
import { CommonStyles } from '../../core';

const Dashboard = () => {
  const { navigation, user, onSignOutPressed } = useDashboard();
  const LogoutButton = useMemo(() => {
    return (
      <TouchableOpacity onPress={onSignOutPressed}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    );
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: user?.name ?? '',
      headerRight: () => LogoutButton,
    });
  }, [user]);

  console.log({ user });

  return (
    <SafeAreaView style={CommonStyles.flex}>
      <ImageBackground
        source={Images.homeBg}
        style={CommonStyles.flex}></ImageBackground>
    </SafeAreaView>
  );
};

export default React.memo(Dashboard);
