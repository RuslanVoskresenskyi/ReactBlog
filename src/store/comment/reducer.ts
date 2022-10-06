import { createReducer, current } from '@reduxjs/toolkit'

import { CommentType } from '../../types/CommentType'

import {
  addComment,
  loadComments
} from './actions'

type CommentsState = {
  comments: CommentType[]
}

const initialState: CommentsState = {
  comments: []
}

const reducer = createReducer(initialState, builder => {
  builder.addCase(addComment.fulfilled, (state, action) => {
    state.comments = [...state.comments, action.payload]
  })
  builder.addCase(loadComments.fulfilled, (state, action) => {
    state.comments = action.payload
  })

})

export { reducer }
