import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  DocumentData,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Post, User } from '../types';

export function useFirestore() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const newPosts = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as Post[];
        
        setPosts(newPosts);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const ensureUser = async (user: User) => {
    const userRef = doc(db, 'users', user.id);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        ...user,
        createdAt: serverTimestamp(),
        lastLoginDate: serverTimestamp()
      });
    }
    return userRef;
  };

  const addPost = async (post: Omit<Post, 'id'>) => {
    try {
      // Ensure user exists before adding post
      await ensureUser(post.user);
      
      const docRef = await addDoc(collection(db, 'posts'), {
        ...post,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.error('Error adding post:', err);
      throw new Error('Failed to add post');
    }
  };

  const updatePost = async (postId: string, data: Partial<Post>) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        ...data,
        updatedAt: serverTimestamp()
      } as DocumentData);
    } catch (err) {
      console.error('Error updating post:', err);
      throw new Error('Failed to update post');
    }
  };

  const updateUser = async (userId: string, data: Partial<User>) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
      } as DocumentData);
    } catch (err) {
      console.error('Error updating user:', err);
      throw new Error('Failed to update user');
    }
  };

  return {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    updateUser,
    ensureUser
  };
}