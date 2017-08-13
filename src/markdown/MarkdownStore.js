import { observable } from 'mobx'

class MarkdownStore {
  @observable files = null
  @observable mentions = null

  getFile(id) {
    if (!this.files) {
      return null
    }
    return this.files.find(item => item.id === id)
  }

  getMention(username) {
    if (!this.mentions) {
      return null
    }
    return this.mentions.find(item => item.username === username)
  }
}

export default MarkdownStore
