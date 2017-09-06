import { RichUtils } from "draft-js";

const createBasePlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    handleKeyCommand: command => {
      const editorState = store.getEditorState();
      const newEditorState = RichUtils.handleKeyCommand(editorState, command);
      if (newEditorState) {
        store.setEditorState(newEditorState);
        return "handled";
      }
      return "not-handled";
    },

    onTab: event => {
      event.preventDefault();
      store.setEditorState(RichUtils.onTab(event, store.getEditorState(), 4));
    },
  };
};

export default createBasePlugin;
