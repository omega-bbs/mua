import ReactRenderer from "commonmark-react-renderer";

import Media from "./components/Media";

const createRenderer = () => {
  return new ReactRenderer({
    skipHtml: true,
    softBreak: "br",
    renderers: {
      image: Media,
    },
  });
};

export default {
  renderer: null,

  render(ast) {
    if (!this.renderer) {
      this.renderer = createRenderer();
    }
    return this.renderer.render(ast);
  },
};
