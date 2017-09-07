const normalizeSelectionForBlocks = (selection, contentState) => {
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();
  const endOffset = selection.getEndOffset();

  if (startKey !== endKey && endOffset === 0) {
    const endBlock = contentState.getBlockBefore(endKey);
    if (selection.getIsBackward()) {
      return selection.merge({
        anchorKey: endBlock.getKey(),
        anchorOffset: endBlock.getLength(),
      });
    } else {
      return selection.merge({
        focusKey: endBlock.getKey(),
        focusOffset: endBlock.getLength(),
      });
    }
  }

  return selection;
};

export default normalizeSelectionForBlocks;
