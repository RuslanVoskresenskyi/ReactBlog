import { createAsyncThunk } from '@reduxjs/toolkit'

import { post } from '../../services/services'
import { PostType } from '../../types/PostType'

import { ActionType } from './common'

const loadPosts = createAsyncThunk(
  ActionType.SET_ALL_POSTS,
  async () => {
    const payload: Promise<PostType[]> = await post.getAllPosts()
    return payload
  }
)

const loadPost = createAsyncThunk(
  ActionType.SET_POST,
  async (id: number) => {
    const payload: Promise<PostType> = await post.getPost(id)
    return payload
  }
)

const addPost = createAsyncThunk(
  ActionType.ADD_POST,
  async (body: Omit<PostType, 'id'>) => {
    const payload: Promise<PostType> = await post.addPost(body)
    return payload
  }
)

const updatePost = createAsyncThunk(
  ActionType.UPDATE_POST,
  async ({ body, id }: { body: Omit<PostType, 'id'>, id: number }) => {
    const payload: Promise<PostType> = await post.updatePost(body, id)
    return payload
  }
)

const deletePost = createAsyncThunk(
  ActionType.DELETE_POSTS,
  async (id: number) => {
    await post.deletePost(id)
    return id
  }
)

export { loadPosts, loadPost, addPost, updatePost, deletePost }