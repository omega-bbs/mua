import { RichUtils } from "draft-js";

import toggleBlockType from "../../utils/toggleBlockType";

const createBlockConvertPlugin = () => {
  const store = {};

  let prevEditorState = null;
  let currentBlockType = null;

  const getCurrentBlockType = editorState => {
    if (editorState !== prevEditorState) {
      prevEditorState = editorState;
      currentBlockType = RichUtils.getCurrentBlockType(editorState);
    }
    return currentBlockType;
  };

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    buttons: [
      { text: "H", title: "Title", blockType: "header-one" },
      { text: "h", title: "Subtitle", blockType: "header-two" },
      { text: "-", title: "Unordered List", blockType: "unordered-list-item" },
      { text: "1.", title: "Ordered List", blockType: "ordered-list-item" },
      { text: "“", title: "Quote", blockType: "blockquote" },
      { text: "</>", title: "Code Block", blockType: "code-block" },
    ].map(button => ({
      ...button,
      isDisabled: editorState => {
        return getCurrentBlockType(editorState) === "atomic";
      },
      isActive: editorState => {
        return getCurrentBlockType(editorState) === button.blockType;
      },
      onClick: () => {
        store.setEditorState(
          toggleBlockType(store.getEditorState(), button.blockType),
        );
      },
    })),
  };
};

export default createBlockConvertPlugin;
