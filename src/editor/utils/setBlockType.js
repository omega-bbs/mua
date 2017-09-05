import { EditorState, SelectionState, Modifier } from "draft-js";

const setBlockType = (editorState, blockKey, blockType) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const newContentState = Modifier.setBlockType(
    contentState,
    SelectionState.createEmpty(blockKey),
    blockType,
  ).merge({
    selectionBefore: selection,
    selectionAfter: selection,
  });
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "change-block-type",
  );
  return newEditorState;
};

export default setBlockType;
