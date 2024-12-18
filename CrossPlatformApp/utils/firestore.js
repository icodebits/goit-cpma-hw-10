import { collection, addDoc, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import { db, storage } from '../config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Функція для додавання документа до колекції
export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), userData, { merge: true });
    console.log('User added:', userId);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const addPost = async (userId, post) => {
  try {
    await addDoc(collection(db, 'posts', userId, 'posts'), post);
    console.log('Post added:', userId);
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

export const getPosts = async (userId) => {
  const docRef = collection(db, 'posts', userId, 'posts');
  const docSnap = await getDocs(docRef);

  const posts = docSnap.docs.map((doc) => ({ postId: doc.id, data: doc.data() }));
  
  if (posts) {
    //console.log('Posts from getPosts:', posts);
    return posts;
  } else {
    console.log('No documents for user!');
    return null;
  }
};

export const getPost = async (userId, postId) => {
  const docRef = doc(db, 'posts', userId, 'posts', postId);
  const docSnap = await getDoc(docRef);

  const post = { postId: docSnap.id, data: docSnap.data() };
  
  if (post) {
    //console.log('Post from getPost:', post);
    return post;
  } else {
    console.log('No documents for user!');
    return null;
  }
};

export const updatePostInFirestore = async (uid, postId, post) => {
  try {
    await setDoc(doc(db, 'posts', uid, 'posts', postId), post, { merge: true }); // merge: true - для оновлення існуючого документа або створення нового
    console.log('Post data updated to Firestore:', uid, postId);
  } catch (error) {
    console.error('Error saving user data to Firestore:', error);
  }
};

// Функція для отримання документа з колекції
export const getUser = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //console.log('User data from getUser:', docSnap.data());
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

// Функція для запису даних користувача у Firestore
export const updateUserInFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true }); // merge: true - для оновлення існуючого документа або створення нового
    console.log('User data updated to Firestore:', uid);
  } catch (error) {
    console.error('Error saving user data to Firestore:', error);
  }
};

// Функція для завантаження зображення
export const uploadImage = async (
  userId,
  file,
  fileName,
) => {
  try {
    const imageRef = ref(storage, `profilePhotos/${userId}/${fileName}`);
    const result = await uploadBytes(imageRef, file);

    const imageUrl = await getImageUrl(imageRef);
    console.log('Upload result:', result);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


// Функція для отримання URL завантаженого зображення
export const getImageUrl = async (imageRef) => {
  const url = await getDownloadURL(imageRef);
  return url;
};