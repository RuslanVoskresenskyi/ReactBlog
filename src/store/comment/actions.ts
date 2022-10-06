import { createAsyncThunk } from '@reduxjs/toolkit'

import { comment } from '../../services/services'
import { CommentType } from '../../types/CommentType'

import { ActionType } from './common'

const loadComments = createAsyncThunk(
  ActionType.LOAD_COMMENT,
  async () => {
    const payload: Promise<CommentType[]> = await comment.getComments()
    return payload
  }
)

const addComment = createAsyncThunk(
  ActionType.ADD_COMMENT,
  async (body: CommentType) => {
    const payload: Promise<CommentType> = await comment.addComments(body)
    return payload
  }
)

export { addComment, loadComments }