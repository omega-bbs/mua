import { EditorState, Modifier } from "draft-js";

import mergeUndoStack from "../../utils/mergeUndoStack";
import insertText from "../../utils/insertText";

const createSoftReturnPlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    handleReturn: event => {
      if (!event.shiftKey) return "not-handled";

      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (selection.isCollapsed()) {
        const newEditorState = insertText(editorState, "\n");
        store.setEditorState(newEditorState);
      } else {
        const contentState = editorState.getCurrentContent();

        let newContentState = Modifier.removeRange(
          contentState,
          selection,
          "backward",
        );
        let newEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range",
        );

        newEditorState = insertText(newEditorState, "\n");
        newEditorState = mergeUndoStack(newEditorState);

        store.setEditorState(newEditorState);
      }

      return "handled";
    },
  };
};

export default createSoftReturnPlugin;
