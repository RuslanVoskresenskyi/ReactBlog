import { Http } from './http/http.service'
import { Post } from './post/post.service'
import { Comment } from './comment/comment.service'

const baseApi = 'https://bloggy-api.herokuapp.com'

const http = new Http()

const post = new Post({
  apiPath: baseApi,
  http
})

const comment = new Comment({
  apiPath: baseApi,
  http
})

export { http, post, comment }