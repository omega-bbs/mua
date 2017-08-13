import React from 'react'
import PropTypes from 'prop-types'
import { action } from 'mobx'
import { Provider } from 'mobx-react'

import MarkdownStore from './MarkdownStore'
import parser from './parser'
import renderer from './renderer'

class Markdown extends React.Component {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.object),
    mentions: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    ast: null,
    vdom: null,
  }

  store = new MarkdownStore()

  @action
  componentWillMount() {
    this.parse(this.props.markdown)
    this.store.files = this.props.files
    this.store.mentions = this.props.mentions
  }

  @action
  componentWillReceiveProps(nextProps) {
    if (nextProps.markdown !== this.props.markdown) {
      this.parse(nextProps.markdown)
    }
    if (nextProps.files !== this.props.files) {
      this.store.files = nextProps.files
    }
    if (nextProps.mentions !== this.props.mentions) {
      this.store.mentions = nextProps.mentions
    }
  }

  parse(markdown) {
    const ast = parser.parse(markdown)
    const vdom = renderer.render(ast)
    this.setState({
      ast,
      vdom,
    })
  }

  render() {
    return (
      <Provider markdownStore={this.store}>
        <div>
          {this.state.vdom}
        </div>
      </Provider>
    )
  }
}

export default Markdown
