import { EditorState } from "draft-js";

import createEmptyBlock from "../../utils/createEmptyBlock";

const CHANGE_TYPES = [
  "change-block-type",
  "remove-range",
  "backspace-character",
  "delete-character",
];

const createCodeBlockPlugin = () => {
  let prevContentState = null;

  return {
    onChange: editorState => {
      const contentState = editorState.getCurrentContent();
      if (contentState !== prevContentState) {
        prevContentState = contentState;
        const changeType = editorState.getLastChangeType();
        if (CHANGE_TYPES.includes(changeType)) {
          const blockMap = contentState.getBlockMap();
          const lastBlock = blockMap.last();
          if (lastBlock.getType() === "code-block") {
            const block = createEmptyBlock();
            const newContentState = contentState.merge({
              blockMap: blockMap.set(block.getKey(), block),
            });
            const newEditorState = EditorState.set(editorState, {
              currentContent: newContentState,
            });
            return newEditorState;
          }
        }
      }
      return editorState;
    },
  };
};

export default createCodeBlockPlugin;
