import { EditorState, Modifier } from "draft-js";

import normalizeSelectionForBlocks from "./internals/normalizeSelectionForBlocks";
import getSelectedBlocks from "./internals/getSelectedBlocks";

const toggleBlockType = (editorState, blockType) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();

  const hasAtomicBlock = getSelectedBlocks(contentState, selection).some(
    block => block.getType() === "atomic",
  );

  if (hasAtomicBlock) {
    return editorState;
  }

  const blockKey = selection.getStartKey();
  const block = contentState.getBlockForKey(blockKey);
  const targetType = block.getType() === blockType ? "unstyled" : blockType;

  const newContentState = Modifier.setBlockType(
    contentState,
    normalizeSelectionForBlocks(selection, contentState),
    targetType,
  ).merge({
    selectionAfter: selection,
  });

  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "change-block-type",
  );
  return newEditorState;
};

export default toggleBlockType;
