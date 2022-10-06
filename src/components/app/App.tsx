import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PostsList from '../posts-list/PostsList'
import PostPage from '../post-page/PostPage'

import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PostsList/>}/>
          <Route path='/:id' element={<PostPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
