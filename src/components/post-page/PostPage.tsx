import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loadPost } from '../../store/posts/actions'

import { addComment } from '../../store/comment/actions'

import { CommentType } from '../../types/CommentType'

import styles from './PostPage.module.scss'

const PostPage = () => {
  let { id } = useParams()
  const [comments, setComments] = useState<CommentType[]>([])
  const [comment, setComment] = useState('')
  const [error, setError] = useState(false)
  
  const dispatch = useAppDispatch()
  const existingPost = useAppSelector(state => state.posts.existingPost)
  const allComments = useAppSelector(state => state.comments.comments)
  
  useEffect(() => {
    dispatch(loadPost(Number(id)))
  }, [id])
  
  useEffect(() => {
    if (allComments) {
      let postComments: CommentType[] = allComments.filter(comment => comment.postId === Number(id))
      setComments(postComments)
    }
  }, [allComments])

  useEffect(() => {
    console.log(comments)
  }, [comments])
  
  const handlerAddComment = () => {
    if (comment.length > 0){
      dispatch(addComment({ postId: Number(id), body: comment }))
      setComment('')
    } else {
      setError(true)
    }
  }
  
  return (
    <div>
      {existingPost && (
        <div>
          <p className={styles.title}>{existingPost.title}</p>
          <p className={styles.body}>{existingPost.body}</p>
          <p className={styles.body}>Write comment</p>
          <textarea
            id='body'
            rows={4}
            value={comment}
            onChange={(e) => {setComment(e.target.value)}}
          />
          {error && comment.length === 0 && <p className={styles.error}>field is required</p>}
          <div><button className={styles.add} onClick={handlerAddComment}>Add Comment</button></div>
          <p className={styles.body}>Comments</p>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className={styles.comment}>{comment.body}</div>
            ))
          ) : (<div>Comments not found</div>)}
        </div>
      )}
    </div>
  )
}

export default PostPage