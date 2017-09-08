import { RichUtils } from "draft-js";

const INLINE_STYLES = ["bold", "italic", "underline", "code"];

const createInlineStylePlugin = () => {
  const store = {};

  const getCurrentBlockType = (() => {
    let prevEditorState = null;
    let currentBlockType = null;

    return editorState => {
      if (editorState !== prevEditorState) {
        prevEditorState = editorState;
        currentBlockType = RichUtils.getCurrentBlockType(editorState);
      }
      return currentBlockType;
    };
  })();

  const getCurrentInlineStyle = (() => {
    let prevEditorState = null;
    let currentInlineStyle = null;

    return editorState => {
      if (editorState !== prevEditorState) {
        prevEditorState = editorState;
        currentInlineStyle = editorState.getCurrentInlineStyle();
      }
      return currentInlineStyle;
    };
  })();

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    buttons: [
      {
        text: "B",
        title: "Bold",
        inlineStyle: "BOLD",
        shortcut: "Command+B",
      },
      {
        text: "I",
        title: "Italic",
        inlineStyle: "ITALIC",
        shortcut: "Command+I",
      },
      {
        text: "U",
        title: "Underline",
        inlineStyle: "UNDERLINE",
        shortcut: "Command+U",
      },
    ].map(button => ({
      ...button,
      isDisabled: editorState => {
        const blockType = getCurrentBlockType(editorState);
        return blockType === "atomic" || blockType === "code-block";
      },
      isActive: editorState => {
        return getCurrentInlineStyle(editorState).includes(button.inlineStyle);
      },
      onClick: () => {
        store.setEditorState(
          RichUtils.toggleInlineStyle(
            store.getEditorState(),
            button.inlineStyle,
          ),
        );
      },
    })),

    handleKeyCommand: command => {
      if (!INLINE_STYLES.includes(command)) return "not-handled";

      const editorState = store.getEditorState();
      const blockType = getCurrentBlockType(editorState);

      if (blockType === "code-block") return "handled";
      return "not-handled";
    },
  };
};

export default createInlineStylePlugin;
