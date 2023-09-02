import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createPost, addComment, addLike, fetchPosts } from "./operations";

// Structure of state
// items = [
//   {
//     id: "Firebase id",
//     idUser: "user id",
//     photo: "https://firebasestorage.googleapis.com/...",
//     title: "post's title",
//     comments: [{ idUser: "user id", date: "date of comment's create", text: "comment's next" }, { ...}],
//     likes: [{ "user id", "user id", ...}],
//     coords: { latitude: number, longitude: number },
//     place: "post's location"
//   },
//   {...},
// ];

const STATUS = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};

const actionGenerators = [fetchPosts, createPost, addComment, addLike];

const getActionGeneratorsWithType = (status) =>
  actionGenerators.map((generator) => generator[status]);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, handleFetchPosts)
      .addCase(createPost.fulfilled, handleCreatePost)
      .addCase(addComment.fulfilled, handleAddComment)
      .addCase(addLike.fulfilled, handleAddLike)
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.PENDING)),
        handlePending
      )
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.FULFILLED)),
        handleFulfilled
      )
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.REJECTED)),
        handleRejected
      );
  },
});

function handleFetchPosts(state, action) {
  state.items = action.payload;
}

function handleCreatePost(state, action) {
  state.items = [action.payload, ...state.items];
}

function handleAddComment(state, action) {
  const { idPost, idUser, date, text } = action.payload;
  const post = state.items.find((item) => item.id === idPost);
  post.comments = [{ idUser, date, text }, ...post.comments];
}

function handleAddLike(state, action) {
  const { idPost, idUser, typeOfDoing } = action.payload;
  const post = state.items.find((item) => item.id === idPost);
  if (typeOfDoing === "increase") {
    post.likes = [...post.likes, idUser];
  } else if (typeOfDoing === "reduce") {
    post.likes = post.likes.filter((id) => id !== idUser);
  }
}

function handlePending(state, action) {
  state.isLoading = true;
  state.error = null;
}

function handleFulfilled(state, action) {
  state.isLoading = false;
  state.error = null;
}

function handleRejected(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

export const postsReducer = postsSlice.reducer;
