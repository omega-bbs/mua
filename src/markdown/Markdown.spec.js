import React from 'react'
import renderer from 'react-test-renderer'

import Markdown from './Markdown'

const renderMarkdown = markdown => {
  return renderer.create(<Markdown markdown={markdown} />).toJSON()
}

test('simple', () => {
  expect(renderMarkdown('*italic* **bold** `code`')).toMatchSnapshot()
})
