import { EditorState } from "draft-js";

const mergeUndoStack = editorState => {
  const changeType = editorState.getLastChangeType();
  const contentState = editorState.getCurrentContent();
  const prevEditorState = EditorState.undo(EditorState.undo(editorState));
  const newEditorState = EditorState.push(
    prevEditorState,
    contentState,
    changeType,
  );
  return newEditorState;
};

export default mergeUndoStack;
