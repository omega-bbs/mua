import React from 'react'
import PropTypes from 'prop-types'
import { Parser } from 'commonmark'
import ReactRenderer from 'commonmark-react-renderer'

const parser = new Parser()
const renderer = new ReactRenderer()

class Markdown extends React.Component {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
  }

  state = {
    ast: null,
    vdom: null,
  }

  componentWillMount() {
    this.parse(this.props.markdown)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markdown !== this.props.markdown) {
      this.parse(nextProps.markdown)
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
      <div>
        {this.state.vdom}
      </div>
    )
  }
}

export default Markdown
