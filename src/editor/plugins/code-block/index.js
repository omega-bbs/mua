import { EditorState, Modifier } from "draft-js";

import createEmptyBlock from "../../utils/internals/createEmptyBlock";
import toggleBlockType from "../../utils/toggleBlockType";

const CHANGE_TYPES = [
  "change-block-type",
  "remove-range",
  "backspace-character",
  "delete-character",
];

const createCodeBlockPlugin = () => {
  const store = {};

  let prevContentState = null;

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    // Ensure the last block is not a code block (insert a new block after last block when needed)
    // TODO: Crate navigate plugin for both code block & atomic block
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

    handleKeyCommand: command => {
      if (command !== "code") return "not-handled";
      store.setEditorState(
        toggleBlockType(store.getEditorState(), "code-block"),
      );
      return "handled";
    },

    /*
    handleKeyCommand: command => {
      if (command !== "code") return "not-handled";

      const editorState = store.getEditorState();
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();

      const blocks = getSelectedBlocks(contentState, selection);
      const codeBlocks = blocks.filter(
        block => block.getType() === "code-block",
      );

      if (codeBlocks.size) {
        let startBlock = blocks.first();
        let endBlock = blocks.last();

        let newBlockMap = new Immutable.OrderedMap().asMutable();
        let codeBlockQueue = codeBlocks;
        let nextCodeBlock = codeBlockQueue.first();

        contentState.getBlockMap().forEach((block, blockKey) => {
          if (block !== nextCodeBlock) {
            newBlockMap.set(blockKey, block);
            return;
          }

          const code = block.getText();
          const blocks = code.split("\n").map(line => {
            const block = createEmptyBlock().merge({
              text: line,
              characterList: Immutable.Repeat(
                CharacterMetadata.EMPTY,
                line.length,
              ).toList(),
            });
            return block;
          });

          blocks.forEach(block => {
            newBlockMap.set(block.getKey(), block);
          });

          if (block === startBlock) {
            startBlock = blocks[0];
          }
          if (block === endBlock) {
            endBlock = blocks[blocks.length - 1];
          }

          codeBlockQueue = codeBlockQueue.slice(1);
          nextCodeBlock = codeBlockQueue.first();
        });

        const newContentState = contentState.merge({
          blockMap: newBlockMap.asImmutable(),
        });

        const newEditorState = EditorState.forceSelection(
          EditorState.push(editorState, newContentState, "insert-fragment"),
          new SelectionState({
            hasFocus: true,
            anchorKey: startBlock.getKey(),
            anchorOffset: 0,
            focusKey: endBlock.getKey(),
            focusOffset: endBlock.getLength(),
          }),
        );
        store.setEditorState(newEditorState);
      } else {
        const code = blocks.map(block => block.getText()).join("\n");
        const startBlock = blocks.first();
        const endBlock = blocks.last();

        const removeSelection = new SelectionState({
          hasFocus: true,
          anchorKey: startBlock.getKey(),
          anchorOffset: 0,
          focusKey: endBlock.getKey(),
          focusOffset: endBlock.getLength(),
        });

        let newContentState = Modifier.removeRange(
          contentState,
          removeSelection,
          "backward",
        );
        newContentState = Modifier.setBlockType(
          newContentState,
          newContentState.getSelectionAfter(),
          "code-block",
        );
        newContentState = Modifier.insertText(
          newContentState,
          newContentState.getSelectionAfter(),
          code,
        );

        const newEditorState = EditorState.forceSelection(
          EditorState.push(editorState, newContentState, "insert-fragment"),
          newContentState.getSelectionAfter().merge({ anchorOffset: 0 }),
        );
        store.setEditorState(newEditorState);
      }

      return "handled";
    },
    */

    // Using soft line break inside code block
    handleReturn: () => {
      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getStartKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() !== "code-block") return "not-handled";

      let newContentState = Modifier.removeRange(
        contentState,
        selection,
        "backward",
      );
      newContentState = Modifier.insertText(
        newContentState,
        newContentState.getSelectionAfter(),
        "\n",
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "insert-fragment",
      );
      store.setEditorState(newEditorState);
      return "handled";
    },
  };
};

export default createCodeBlockPlugin;
