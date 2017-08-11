import ReactRenderer from 'commonmark-react-renderer'

const createRenderer = () => {
  return new ReactRenderer({
    skipHtml: true,
    softBreak: 'br',
  })
}

export default {
  renderer: null,

  render(ast) {
    if (!this.renderer) {
      this.renderer = createRenderer()
    }
    return this.renderer.render(ast)
  },
}
