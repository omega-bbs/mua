import { EditorState } from "draft-js";

const setBlockDepth = (editorState, blockKey, depth) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const newContentState = contentState.merge({
    selectionBefore: selection,
    selectionAfter: selection,
    blockMap: contentState
      .getBlockMap()
      .update(blockKey, block => block.set("depth", depth)),
  });
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "adjust-depth",
  );
  return newEditorState;
};

export default setBlockDepth;
