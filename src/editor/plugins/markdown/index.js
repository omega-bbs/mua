import { EditorState, Modifier } from "draft-js";

import insertText from "../../utils/insertText";

const createMarkdownPlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    handleBeforeInput: char => {
      if (char !== " ") return "not-handled";

      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (!selection.isCollapsed()) return "not-handled";

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() !== "unstyled") return "not-handled";

      const offset = selection.getFocusOffset();
      const prefix = block.getText().slice(0, offset);

      let convertTo = null;

      if (prefix === "-" || prefix === "*") {
        convertTo = "unordered-list-item";
      }
      if (prefix === "1.") {
        convertTo = "ordered-list-item";
      }
      if (prefix === ">") {
        convertTo = "blockquote";
      }

      if (!convertTo) return "not-handled";

      const inlineStyle = editorState.getCurrentInlineStyle();

      // Step #1: insert space (for undo)
      let newEditorState = insertText(editorState, char);
      let newContentState = newEditorState.getCurrentContent();

      // Setp #2: remove prefix
      newContentState = Modifier.removeRange(
        newContentState,
        newEditorState.getSelection().merge({ anchorOffset: 0 }),
        "backward",
      );

      // Step #3: convert block type
      newContentState = Modifier.setBlockType(
        newContentState,
        newContentState.getSelectionAfter(),
        convertTo,
      );
      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "change-block-type",
      );

      // Step #4: restore inline style
      newEditorState = EditorState.setInlineStyleOverride(
        newEditorState,
        inlineStyle,
      );

      store.setEditorState(newEditorState);
      return "handled";
    },
  };
};

export default createMarkdownPlugin;
