import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../../helpers/validators';
export default () => {
  const navigation = useNavigation();

  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [isLoading, setIsLoading] = useState(false);

  const validate = useCallback(() => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return false;
    }
    return true;
  }, [email, password, name]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    const isValidInput = validate();
    if (isValidInput) {
      try {
        await auth().createUserWithEmailAndPassword(
          email.value,
          password.value,
        );
        const user: IUser = {
          email: email.value,
          name: name.value,
        };
        await firestore().collection('Users').add(user);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        console.log('error', error);
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [email.value, password.value, name.value, validate]);
  return {
    navigation,
    email,
    name,
    password,
    isLoading,
    setName,
    setEmail,
    setPassword,
    onSubmit,
  };
};
