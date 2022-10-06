import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { deletePost, loadPosts } from '../../store/posts/actions'

import PostItem from '../post-item/PostItem'

import PostFields from '../post-fields/PostFields'

import { loadComments } from '../../store/comment/actions'

import styles from  './PostsList.module.scss'

const PostsList = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [updatingPost, setUpdatingPost] = useState(false)
  const [postId, setPostId] = useState(-1)

  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.posts.posts)
  
  useEffect(() => {
    dispatch(loadPosts())
    dispatch(loadComments())
  }, [])

  const handlerCreatePost = () => {
    setIsOpenModal(true)
    setUpdatingPost(false)
  }

  const handlerUpdatePost = (id: number) => {
    setIsOpenModal(true)
    setUpdatingPost(true)
    setPostId(id)
  }

  const handlerDeletePost = (id: number) => {
    dispatch(deletePost(id))
  }

  return (
    <>
      <PostFields
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        updatingPost={updatingPost}
        postId={postId}
      />
      <div className={styles.add_button}>
        <button onClick={handlerCreatePost}>Add Post</button>
      </div>
      <div className={styles.container}>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostItem
              title={post.title}
              body={post.body}
              id={post.id}
              key={post.id}
              updatePost={handlerUpdatePost}
              deletePost={handlerDeletePost}
            />
          ))
        ) : (
          <div>Posts not found</div>
        )}
      </div>
    </>

  )
}

export default PostsList