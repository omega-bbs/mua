import { RichUtils } from "draft-js";

const createInlineStylePlugin = () => {
  const store = {};

  let prevEditorState = null;
  let currentInlineStyle = null;

  const getCurrentInlineStyle = editorState => {
    if (editorState !== prevEditorState) {
      prevEditorState = editorState;
      currentInlineStyle = editorState.getCurrentInlineStyle();
    }
    return currentInlineStyle;
  };

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    buttons: [
      { text: "B", title: "粗体", inlineStyle: "BOLD" },
      { text: "I", title: "斜体", inlineStyle: "ITALIC" },
      { text: "U", title: "下划线", inlineStyle: "UNDERLINE" },
    ].map(button => ({
      ...button,
      isActive: editorState =>
        getCurrentInlineStyle(editorState).includes(button.inlineStyle),
      onClick: () => {
        store.setEditorState(
          RichUtils.toggleInlineStyle(
            store.getEditorState(),
            button.inlineStyle,
          ),
        );
      },
    })),
  };
};

export default createInlineStylePlugin;
