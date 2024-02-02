import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase-config'; // Ensure this path is correct for your setup

// Function to get a cookie's value by its name
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const setCookie = (name, value) => {
    let expires = "";
    const date = new Date();
    date.setTime(date.getTime() + (365*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
};

export const pushFirstPageLoadInfo = async () => {
    const sessionId = getCookie("sessionId");
  
    if (!sessionId) {
      // No session ID cookie found, so create a new session document
      const userAgent = navigator.userAgent;
      const { innerWidth: width, innerHeight: height } = window;
  
      try {
        const docRef = await addDoc(collection(db, "sessions"), {
          firstDatetime: new Date(),
          lastDateTime: new Date(),
          userAgent: userAgent,
          resolution: `${width}x${height}`
        });
        console.log("Session info added to Firestore with ID: ", docRef.id);
  
        // Save the document ID as a cookie
        setCookie("sessionId", docRef.id, 365); // Set the cookie to expire in 365 days
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      // Session ID exists, update the lastDateTime
      try {
        const sessionRef = doc(db, "sessions", sessionId);
        await updateDoc(sessionRef, {
          lastDateTime: new Date() // Update lastDateTime to now
        });
        console.log("Session lastDateTime updated in Firestore");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

// Function to update session information in Firestore
export const updateSession = async (newData) => {
  const sessionId = getCookie("sessionId"); // Directly retrieve the sessionId cookie here
  if (!sessionId) {
    console.error("Session ID cookie not found.");
    return; // Exit if no sessionId is provided
  }

  const updatedData = { ...newData, lastDateTime: new Date() }; // Always include lastDateTime in the update

  try {
    const sessionRef = doc(db, "sessions", sessionId);
    await updateDoc(sessionRef, updatedData);
    console.log("Session updated successfully");
  } catch (error) {
    console.error("Error updating session: ", error);
  }
};
