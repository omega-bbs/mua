import React from "react";
import renderer from "react-test-renderer";

import MarkdownStore from "../../MarkdownStore";
import Media from "./Media";

jest.mock("./MediaView", () => {
  const React = require("react");
  const PropTypes = require("prop-types");

  class MediaView extends React.Component {
    static propTypes = {
      file: PropTypes.object,
    };

    render() {
      const file = this.props.file;
      if (!file) {
        return <mock-media-view>file not found</mock-media-view>;
      }
      return <mock-media-view>{`file #${file.id}`}</mock-media-view>;
    }
  }

  return MediaView;
});

const store = new MarkdownStore();
store.files = [{ id: "1" }];

const renderMedia = src => {
  return renderer.create(<Media markdownStore={store} src={src} />).toJSON();
};

test("basic", () => {
  expect(renderMedia("omega:file/1")).toMatchSnapshot();
});

test("not found", () => {
  expect(renderMedia("omega:file/2")).toMatchSnapshot();
});

test("error", () => {
  expect(renderMedia("omega:file")).toMatchSnapshot();
  expect(renderMedia("omega:unknown/1")).toMatchSnapshot();
  expect(renderMedia("http://example.com/image.png")).toMatchSnapshot();
});
