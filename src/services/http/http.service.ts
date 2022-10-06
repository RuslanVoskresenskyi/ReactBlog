type Options = {
  method?: string
  payload?: string
  contentType?: string
}

type Headers = {
  contentType?: string
}

class Http {
  load(url: string, options: Options = {}) {
    const {
      method = 'GET',
      payload = null,
      contentType
    } = options
    const headers = this._getHeaders({
      contentType
    })

    return fetch(url, {
      method,
      headers,
      body: payload
    })
      .then(this._checkStatus)
      .then(this._parseJSON)
      .catch(this._throwError)
  }

  _getHeaders({ contentType }: Headers) {
    const headers = new Headers()

    if (contentType) {
      headers.append('content-type', contentType)
    }

    return headers
  }

  async _checkStatus(response: Response) {
    if (!response.ok) {
      const parsedException = await response.json().catch(() => ({
        message: response.statusText
      }))
    }

    return response
  }

  _parseJSON(response: Response) {
    return response.json()
  }

  _throwError(err: ErrorEvent) {
    throw err
  }
}

export { Http }