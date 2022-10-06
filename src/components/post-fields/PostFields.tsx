import { FC, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addPost, loadPost, updatePost } from '../../store/posts/actions'

import styles from './PostFields.module.scss'

type Props = {
  isOpenModal: boolean
  setIsOpenModal: (isOpenModal: boolean) => void
  updatingPost: boolean
  postId: number
}

const PostFields: FC<Props> = ({ isOpenModal, setIsOpenModal, updatingPost, postId }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errorsShow, setErrorsShow] = useState(false)

  const dispatch = useAppDispatch()
  const existingPost = useAppSelector(state => state.posts.existingPost)

  useEffect(() => {
    if (updatingPost) {
      dispatch(loadPost(postId))
    }
  }, [postId])

  useEffect(() => {
    if (existingPost && updatingPost){
      setTitle(existingPost.title)
      setBody(existingPost.body)
    }
  }, [existingPost, isOpenModal])

  const handlerAddPost = () => {
    if(title.length > 0 && body.length > 0){
      dispatch(addPost({
        title: title,
        body: body
      }))
      setIsOpenModal(false)
      setErrorsShow(false)
      setTitle('')
      setBody('')
    } else {
      setErrorsShow(true)
    }
  }

  const handlerUpdatePost = () => {
    if(title.length > 0 && body.length > 0){
      dispatch(updatePost({ body:{ title: title, body: body }, id: postId }))
      setIsOpenModal(false)
      setErrorsShow(false)
      setTitle('')
      setBody('')
    } else {
      setErrorsShow(true)
    }
  }

  const handlerCloseModal = () => {
    setErrorsShow(false)
    setIsOpenModal(false)
    setTitle('')
    setBody('')
  }

  return (
    isOpenModal ? (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <p className={styles.close} onClick={handlerCloseModal}><span>&#10006;</span></p>
          <p className={styles.title}>{updatingPost ? 'Update post' : 'Create new post'}</p>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
          />
          {errorsShow && title.length === 0 && <p className={styles.error}>field is required</p>}
          <label htmlFor='body'>Body</label>
          <textarea
            id='body'
            rows={4}
            value={body}
            onChange={(e) => {setBody(e.target.value)}}
          />
          {errorsShow && body.length === 0 && <p className={styles.error}>field is required</p>}
          {updatingPost ? (
            <button className={styles.create} onClick={handlerUpdatePost}>Update Post</button>
          ) : (
            <button className={styles.create} onClick={handlerAddPost}>Create Post</button>
          )}
        </div>
      </div>
    ) : null
  )
}

export default PostFields