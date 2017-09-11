import Immutable from "immutable";
import { EditorState, SelectionState, Modifier } from "draft-js";

import clearInlineStyle from "../../utils/internals/clearInlineStyle";
import insertText from "../../utils/insertText";

const HEADERS = {
  1: "header-one",
  2: "header-two",
  3: "header-three",
  4: "header-four",
  5: "header-five",
  6: "header-six",
};

const createMarkdownPlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    handleReturn: () => {
      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (!selection.isCollapsed()) return "not-handled";

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() !== "unstyled") return "not-handled";

      const offset = selection.getFocusOffset();
      const prefix = block.getText().slice(0, offset);

      let group;

      // Step #1: split block (for undo)
      let newContentState = Modifier.splitBlock(contentState, selection);
      let newEditorState = EditorState.push(editorState, newContentState);

      // code-block
      if ((group = /^`{3}(.*)$/.exec(prefix))) {
        const language = group[1].trim();

        // Step #2: remove prefix & join block
        newContentState = Modifier.removeRange(
          newContentState,
          newContentState.getSelectionAfter().merge({
            anchorKey: blockKey,
            anchorOffset: 0,
          }),
          "backward",
        );

        // Step #3: convert block type
        newContentState = Modifier.setBlockType(
          newContentState,
          newContentState.getSelectionAfter(),
          "code-block",
        );

        // Step #4: set code block language
        newContentState = Modifier.setBlockData(
          newContentState,
          newContentState.getSelectionAfter(),
          { language },
        );

        // Step #5: clear inline style inside code block
        const newSelection = newContentState.getSelectionAfter();
        const newBlockKey = newSelection.getFocusKey();
        const newBlock = newContentState.getBlockForKey(newBlockKey);
        newContentState = clearInlineStyle(
          newContentState,
          new SelectionState({
            anchorKey: newBlockKey,
            anchorOffset: 0,
            focusKey: newBlockKey,
            focusOffset: newBlock.getLength(),
          }),
        ).merge({
          selectionAfter: newSelection,
        });

        newEditorState = EditorState.push(
          newEditorState,
          newContentState,
          "change-block-type",
        );
        newEditorState = EditorState.setInlineStyleOverride(
          newEditorState,
          new Immutable.OrderedSet(),
        );
        store.setEditorState(newEditorState);
        return "handled";
      }

      return "not-handled";
    },

    handleBeforeInput: char => {
      if (char !== " ") return "not-handled";

      const editorState = store.getEditorState();
      const selection = editorState.getSelection();

      if (!selection.isCollapsed()) return "not-handled";

      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getFocusKey();
      const block = contentState.getBlockForKey(blockKey);

      if (block.getType() !== "unstyled") return "not-handled";

      const offset = selection.getFocusOffset();
      const prefix = block.getText().slice(0, offset);

      let convertTo = null;

      if (prefix === "-" || prefix === "*") {
        convertTo = "unordered-list-item";
      }
      if (/^\d+\.$/.test(prefix)) {
        convertTo = "ordered-list-item";
      }
      if (prefix === ">") {
        convertTo = "blockquote";
      }
      if (/^#{1,2}$/.test(prefix)) {
        convertTo = HEADERS[prefix.length];
      }

      if (!convertTo) return "not-handled";

      const inlineStyle = editorState.getCurrentInlineStyle();

      // Step #1: insert space (for undo)
      let newEditorState = insertText(editorState, char);
      let newContentState = newEditorState.getCurrentContent();

      // Setp #2: remove prefix
      newContentState = Modifier.removeRange(
        newContentState,
        newEditorState.getSelection().merge({ anchorOffset: 0 }),
        "backward",
      );

      // Step #3: convert block type
      newContentState = Modifier.setBlockType(
        newContentState,
        newContentState.getSelectionAfter(),
        convertTo,
      );
      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "change-block-type",
      );

      // Step #4: restore inline style
      newEditorState = EditorState.setInlineStyleOverride(
        newEditorState,
        inlineStyle,
      );

      store.setEditorState(newEditorState);
      return "handled";
    },
  };
};

export default createMarkdownPlugin;
