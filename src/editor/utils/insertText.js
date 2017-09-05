import { EditorState, Modifier } from "draft-js";

const insertText = (editorState, text) => {
  const contentState = editorState.getCurrentContent();
  const newContentState = Modifier.insertText(
    contentState,
    editorState.getSelection(),
    text,
    editorState.getCurrentInlineStyle(),
  );
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "insert-characters",
  );
  return newEditorState;
};

export default insertText;
