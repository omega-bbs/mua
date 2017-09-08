import { EditorState, SelectionState, Modifier } from "draft-js";

import normalizeSelectionForBlocks from "./internals/normalizeSelectionForBlocks";
import getSelectedBlocks from "./internals/getSelectedBlocks";
import clearInlineStyle from "./internals/clearInlineStyle";

const toggleBlockType = (editorState, blockType) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();

  const selectedBlocks = getSelectedBlocks(contentState, selection);
  const hasAtomicBlock = selectedBlocks.some(
    block => block.getType() === "atomic",
  );

  if (hasAtomicBlock) {
    return editorState;
  }

  const blockKey = selection.getStartKey();
  const block = contentState.getBlockForKey(blockKey);
  const targetType = block.getType() === blockType ? "unstyled" : blockType;

  let newContentState = Modifier.setBlockType(
    contentState,
    normalizeSelectionForBlocks(selection, contentState),
    targetType,
  ).merge({
    selectionAfter: selection,
  });

  if (targetType === "code-block") {
    const startBlock = selectedBlocks.first();
    const endBlock = selectedBlocks.last();
    newContentState = clearInlineStyle(
      newContentState,
      new SelectionState({
        anchorKey: startBlock.getKey(),
        anchorOffset: 0,
        focusKey: endBlock.getKey(),
        focusOffset: endBlock.getLength(),
      }),
    ).merge({
      selectionAfter: selection,
    });
  }

  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "change-block-type",
  );
  return newEditorState;
};

export default toggleBlockType;
