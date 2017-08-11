import React from 'react'
import renderer from 'react-test-renderer'

import Markdown from './Markdown'

const renderMarkdown = markdown => {
  return renderer.create(<Markdown markdown={markdown} />).toJSON()
}

test('simple', () => {
  expect(renderMarkdown('*italic* **bold** `code`')).toMatchSnapshot()
})

test('safe', () => {
  expect(renderMarkdown('<img />')).toMatchSnapshot()
  expect(renderMarkdown('<div>test</div>')).toMatchSnapshot()
  expect(renderMarkdown('<span>test</span>')).toMatchSnapshot()
  expect(renderMarkdown('<strong>test</strong>')).toMatchSnapshot()
})

test('safe (mixed)', () => {
  expect(renderMarkdown('test<img />test')).toMatchSnapshot()
  expect(renderMarkdown('test<div>test</div>test')).toMatchSnapshot()
  expect(renderMarkdown('test<span>test</span>test')).toMatchSnapshot()
  expect(renderMarkdown('test<strong>test</strong>test')).toMatchSnapshot()
})

test('soft break', () => {
  expect(renderMarkdown('Hello,\nworld!')).toMatchSnapshot()
})
