import { createReducer, current } from '@reduxjs/toolkit'

import { PostType } from '../../types/PostType'

import {
  loadPosts,
  loadPost,
  addPost,
  updatePost,
  deletePost
} from './actions'

type PostsState = {
  posts: PostType[]
  existingPost: PostType | null
}

const initialState: PostsState = {
  posts: [],
  existingPost: null
}

const reducer = createReducer(initialState, builder => {
  builder.addCase(loadPosts.fulfilled, (state, action) => {
    state.posts = action.payload
  })
  builder.addCase(loadPost.fulfilled, (state, action) => {
    state.existingPost = action.payload
  })
  builder.addCase(addPost.fulfilled, (state, action) => {
    state.posts = [...state.posts, action.payload]
  })
  builder.addCase(updatePost.fulfilled, (state, action) => {
    const { id } = action.payload
    let copyPosts = [...current(state.posts)]
    let indexPost = -1
    copyPosts.forEach((post, index) => {
      if (post.id === id){
        indexPost = index
      }
    })

    copyPosts[indexPost] = action.payload

    state.posts = copyPosts
    state.existingPost = action.payload
  })
  builder.addCase(deletePost.fulfilled, (state, action) => {
    let copyPosts = [...current(state.posts)]
    let indexPost = -1
    copyPosts.forEach((post, index) => {
      if (post.id === action.payload){
        indexPost = index
      }
    })

    copyPosts.splice(indexPost, 1)

    state.posts = copyPosts
  })
})

export { reducer }
