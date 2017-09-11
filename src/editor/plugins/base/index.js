import { RichUtils } from "draft-js";

const createBasePlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    // Handle base command
    handleKeyCommand: command => {
      const editorState = store.getEditorState();
      const newEditorState = RichUtils.handleKeyCommand(editorState, command);
      if (newEditorState) {
        store.setEditorState(newEditorState);
        return "handled";
      }
      return "not-handled";
    },

    // Indent / unindent list item on TAB / Shift + TAB
    onTab: event => {
      event.preventDefault();
      store.setEditorState(RichUtils.onTab(event, store.getEditorState(), 4));
    },
  };
};

export default createBasePlugin;
