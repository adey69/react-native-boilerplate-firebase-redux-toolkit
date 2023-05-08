import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

async function fetchUser({email, password}: IFetchUserPayload) {
  await auth().signInWithEmailAndPassword(email, password);
  const snapshot = await firestore()
    .collection('Users')
    .where('email', '==', email)
    .get();
  return snapshot.docs[0].data() as IUser;
}

async function signOut() {
  await auth().signOut();
}
export {fetchUser, signOut};
