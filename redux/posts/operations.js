import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { formatDate } from "../utils/utils";
import { getRealPhotoURL } from "../utils/utils";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      //Отримання постів із Firebase
      const posts = await getDocs(collection(db, "posts"));
      const array = [];
      posts.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      return array;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, thunkAPI) => {
    try {
      //Підготовка фото до завантаження
      const { photo, ...rest } = post;

      //Отримання реального шляху для фото та запис у Redux

      const realPhotoURL = await getRealPhotoURL(photo);
      post = { photo: realPhotoURL, ...rest };

      //Додавання посту в Firebase
      const docRef = await addDoc(collection(db, "posts"), post);

      return { id: docRef.id, ...post };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (comment, thunkAPI) => {
    try {
      const { idPost, date, ...restCommentData } = comment;
      const dateString = formatDate(date);
      const postRef = doc(db, "posts", idPost);
      await updateDoc(postRef, {
        comments: arrayUnion({ date: dateString, ...restCommentData }),
      });

      return { idPost, date: dateString, ...restCommentData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addLike = createAsyncThunk(
  "posts/addLike",
  async ({ idPost, idUser }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const posts = state.posts.items;
      const post = posts.find((post) => post.id === idPost);
      if (!post.likes.find((id) => idUser === id)) {
        const postRef = doc(db, "posts", idPost);
        await updateDoc(postRef, {
          likes: arrayUnion(idUser),
        });
        return { idPost, idUser, typeOfDoing: "increase" };
      } else {
        const postRef = doc(db, "posts", idPost);
        await updateDoc(postRef, {
          likes: arrayRemove(idUser),
        });
        return { idPost, idUser, typeOfDoing: "reduce" };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
