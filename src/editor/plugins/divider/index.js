import { EditorState, Modifier } from "draft-js";

import mergeUndoStack from "../../utils/mergeUndoStack";
import insertAtomicBlock from "../../utils/insertAtomicBlock";

const createDividerPlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    blockRendererFn: block => {
      if (block.getType() !== "atomic") return null;

      const editorState = store.getEditorState();
      const contentState = editorState.getCurrentContent();
      const entityKey = block.getEntityAt(0);
      const entity = contentState.getEntity(entityKey);

      if (entity.getType() !== "divider") return null;

      return {
        editable: false,
        component: "hr",
      };
    },

    handleReturn: () => {
      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (!selection.isCollapsed()) return "not-handled";

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() !== "unstyled") return "not-handled";

      const offset = selection.getFocusOffset();
      const prefix = block.getText().slice(0, offset);

      if (!/^[-*]{3,}$/.test(prefix)) return "not-handled";

      // Step #1: split block (for undo)
      let newContentState = Modifier.splitBlock(contentState, selection);
      let newEditorState = EditorState.push(editorState, newContentState);

      // Step #2: remove prefix
      newContentState = Modifier.removeRange(
        newContentState,
        selection.merge({ anchorOffset: 0 }),
        "backward",
      );
      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "remove-range",
      );

      // Step #3: insert divider
      newEditorState = insertAtomicBlock(
        newEditorState,
        "divider",
        "IMMUTABLE",
      );

      // Step #4: merge undo stack
      newEditorState = mergeUndoStack(newEditorState);

      store.setEditorState(newEditorState);
      return "handled";
    },
  };
};

export default createDividerPlugin;
