import { Http } from '../http/http.service'
import { CommentType } from '../../types/CommentType'

type Constructor = {
  apiPath: string
  http: Http
}

class Comment {
  _apiPath: string
  _http: Http

  constructor({ apiPath, http }: Constructor)
  {
    this._apiPath = apiPath
    this._http = http
  }

  getComments() {
    return this._http.load(`${this._apiPath}/comments`, {
      method: 'GET',
      contentType: 'application/json'
    })
  }

  addComments(payload: CommentType) {
    return this._http.load(`${this._apiPath}/comments`, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    })
  }
  
}

export { Comment }