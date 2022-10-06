import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import settingsIcon from '../../assest/icons/settings-icon.svg'

import styles from './PostItem.module.scss'

type Props = {
  title: string
  body: string
  id: number
  updatePost: (id: number) => void
  deletePost: (id: number) => void
}

const PostItem: FC<Props> = ({ title, body, id, updatePost, deletePost }) => {
  let navigator = useNavigate()

  return (
    <div className={styles.container}>
      <button className={styles.settings}>
        <img src={settingsIcon} alt='settings-icon'/>
        <div className={styles.menu}>
          <p onClick={() => updatePost(id)}>update post</p>
          <p onClick={() => deletePost(id)}>delete post</p>
        </div>
      </button>
      <div style={{ width: '100%' }}>
        <div className={styles.title}>{title}</div>
        <div className={styles.body}><p>{body}</p></div>
      </div>
      <button
        className={styles.comment}
        onClick={() => {navigator(`/${id}`)}}
      >Comments</button>
    </div>
  )
}

export default PostItem