import { observable, computed, action } from 'mobx'

class MarkdownStore {
  @observable files = null
  @observable mentions = null

  @computed
  getFile(id) {
    if (!this.files) {
      return null
    }
    return this.files.find(item => item.id === id)
  }

  @computed
  getMention(username) {
    if (!this.mentions) {
      return null
    }
    return this.mentions.find(item => item.username === username)
  }

  @action
  setFiles(files) {
    this.files = files
  }

  @action
  setMentions(mentions) {
    this.mentions = mentions
  }
}

export default MarkdownStore
