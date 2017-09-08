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
      { text: "H", title: "标题", blockType: "header-one" },
      { text: "-", title: "无序列表", blockType: "unordered-list-item" },
      { text: "1.", title: "有序列表", blockType: "ordered-list-item" },
      { text: "“", title: "引用", blockType: "blockquote" },
      { text: "</>", title: "代码块", blockType: "code-block" },
    ].map(button => ({
      ...button,
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
