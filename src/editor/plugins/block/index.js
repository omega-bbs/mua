import React from "react";
import Immutable from "immutable";
import { EditorState, Modifier } from "draft-js";

import setBlockType from "../../utils/setBlockType";
import setBlockDepth from "../../utils/setBlockDepth";

const BLOCK_TYPES = ["unordered-list-item", "ordered-list-item", "blockquote"];

const createBlockPlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    blockRenderMap: Immutable.Map({
      blockquote: {
        element: "blockquote",
        wrapper: <blockquote />,
      },
    }),

    handleReturn: () => {
      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (!selection.isCollapsed()) return "not-handled";

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);
      const blockType = block.getType();

      if (BLOCK_TYPES.includes(blockType)) {
        const length = block.getLength();
        if (length === 0) {
          const depth = block.getDepth();
          const newEditorState = depth
            ? // unindent block
              setBlockDepth(editorState, blockKey, depth - 1)
            : // exit block
              setBlockType(editorState, blockKey, "unstyled");
          store.setEditorState(newEditorState);
          return "handled";
        }
      }

      if (blockType.startsWith("header-")) {
        let newContentState = Modifier.splitBlock(contentState, selection);
        if (selection.getFocusOffset() === block.getLength()) {
          newContentState = Modifier.setBlockType(
            newContentState,
            newContentState.getSelectionAfter(),
            "unstyled",
          );
        }
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "split-block",
        );
        store.setEditorState(newEditorState);
        return "handled";
      }

      return "not-handled";
    },

    handleKeyCommand: command => {
      if (command !== "backspace") return "not-handled";

      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (!selection.isCollapsed() || selection.getFocusOffset() !== 0)
        return "not-handled";

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (!BLOCK_TYPES.includes(block.getType())) return "not-handled";

      const depth = block.getDepth();
      if (depth) {
        // unindent block
        const newEditorState = setBlockDepth(editorState, blockKey, depth - 1);
        store.setEditorState(newEditorState);
        return "handled";
      }

      const blockBefore = contentState.getBlockBefore(blockKey);
      if (!blockBefore || blockBefore.getType() === "atomic")
        return "not-handled";

      let newContentState = contentState;

      // Step #1: exit block
      newContentState = Modifier.setBlockType(
        newContentState,
        selection,
        "unstyled",
      );

      // Step #2: join block
      newContentState = Modifier.removeRange(
        newContentState,
        selection.merge({
          anchorKey: blockBefore.getKey(),
          anchorOffset: blockBefore.getLength(),
        }),
        "backward",
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range",
      );
      store.setEditorState(newEditorState);
      return "handled";
    },
  };
};

export default createBlockPlugin;
