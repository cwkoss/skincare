import { db } from './firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from './firebase-config';

export const saveUserToFirestore = async (user) => {
  if (!user) return;

  const { uid, email, displayName, photoURL } = user;

  // Create a user document with non-sensitive data
  const userDoc = {
    uid,
    displayName,
    photoURL,
    createdAt: new Date(),
    lastLogin: new Date()
  };

  // Save the main user document
  await setDoc(doc(db, 'users', uid), userDoc, { merge: true });

  // Save sensitive data in a separate, more restricted collection
  await setDoc(doc(db, 'usersPII', uid), {
    email
  }, { merge: true });
};
