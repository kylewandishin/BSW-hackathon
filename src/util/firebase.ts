import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// eslint-disable-next-line
export const createUserDocument = async (user: any, data: any) => {
  if (!user || Object.keys(user).length === 0) return;
  console.log('Creating user document...');
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    try {
      await setDoc(userRef, data);
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  }
  console.log('User document created!');
};
