import { Http } from '../http/http.service'
import { PostType } from '../../types/PostType'

type Constructor = {
  apiPath: string
  http: Http
}

class Post {
  _apiPath: string
  _http: Http

  constructor({ apiPath, http }: Constructor)
  {
    this._apiPath = apiPath
    this._http = http
  }

  getAllPosts() {
    return this._http.load(`${this._apiPath}/posts`, {
      method: 'GET',
      contentType: 'application/json'
    })
  }

  getPost(id: number) {
    return this._http.load(`${this._apiPath}/posts/${id}`, {
      method: 'GET',
      contentType: 'application/json'
    })
  }

  addPost(payload: Omit<PostType, 'id'>) {
    return this._http.load(`${this._apiPath}/posts`, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    })
  }

  updatePost(payload: Omit<PostType, 'id'>, id: number) {
    return this._http.load(`${this._apiPath}/posts/${id}`, {
      method: 'PUT',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    })
  }

  deletePost(id: number) {
    return this._http.load(`${this._apiPath}/posts/${id}`, {
      method: 'DELETE',
      contentType: 'application/json'
    })
  }
}

export { Post }