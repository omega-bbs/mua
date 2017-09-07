import Immutable from "immutable";

import normalizeSelectionForBlocks from "./normalizeSelectionForBlocks";

const getSelectedBlocks = (contentState, selection) => {
  selection = normalizeSelectionForBlocks(selection, contentState);

  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();

  const blockMap = contentState.getBlockMap();
  const blocks = blockMap
    .skipUntil((block, blockKey) => blockKey === startKey)
    .takeUntil((block, blockKey) => blockKey === endKey)
    .concat(new Immutable.Map([[endKey, blockMap.get(endKey)]]));

  return blocks;
};

export default getSelectedBlocks;
