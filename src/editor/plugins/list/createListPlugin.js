import { EditorState, Modifier } from "draft-js";

import setBlockType from "../../utils/setBlockType";
import setBlockDepth from "../../utils/setBlockDepth";
import insertText from "../../utils/insertText";

const createListPlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    handleReturn: () => {
      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (!selection.isCollapsed()) return "not-handled";

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (!block.getType().endsWith("list-item")) return "not-handled";

      const length = block.getLength();
      if (length === 0) {
        const depth = block.getDepth();
        const newEditorState = depth
          ? // unindent list
            setBlockDepth(editorState, blockKey, depth - 1)
          : // exit list
            setBlockType(editorState, blockKey, "unstyled");
        store.setEditorState(newEditorState);
        return "handled";
      }

      return "not-handled";
    },

    handleKeyCommand: command => {
      if (command !== "backspace") return "not-handled";

      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (!selection.isCollapsed() || selection.getFocusOffset() !== 0)
        return "not-handled";

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (!block.getType().endsWith("list-item")) return "not-handled";

      const depth = block.getDepth();
      if (depth) {
        // unindent list
        const newEditorState = setBlockDepth(editorState, blockKey, depth - 1);
        store.setEditorState(newEditorState);
        return "handled";
      }

      const blockBefore = contentState.getBlockBefore(blockKey);
      if (!blockBefore || blockBefore.getType() === "atomic")
        return "not-handled";

      let newContentState = contentState;

      // Step #1: exit list
      newContentState = Modifier.setBlockType(
        newContentState,
        selection,
        "unstyled",
      );

      // Step #2: join block
      newContentState = Modifier.removeRange(
        newContentState,
        selection.merge({
          anchorKey: blockBefore.getKey(),
          anchorOffset: blockBefore.getLength(),
        }),
        "backward",
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range",
      );
      store.setEditorState(newEditorState);
      return "handled";
    },

    // convert markdown-like markup to list
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

      // Step #3: convert to list
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

export default createListPlugin;
