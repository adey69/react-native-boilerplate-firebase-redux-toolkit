import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logout } from '../../../redux/slices/authSlice';
import { authSelector } from '../../../redux/selectors';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const dispatch = useAppDispatch();
  const { isLoading, user } = useAppSelector(authSelector);
  const navigation = useNavigation();
  const onSignOutPressed = useCallback(async () => {
    dispatch(logout());
  }, [dispatch]);
  return {
    user,
    isLoading,
    navigation,
    onSignOutPressed,
  };
};
