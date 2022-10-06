import { configureStore } from '@reduxjs/toolkit'

import { commentsReducer, postsReducer } from './root-reducer'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
