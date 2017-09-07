import insertText from "../../utils/insertText";

const createSoftReturnPlugin = () => {
  const store = {};

  return {
    initialize: pluginFunctions => {
      Object.assign(store, pluginFunctions);
    },

    handleReturn: event => {
      if (!event.shiftKey) return "not-handled";
      store.setEditorState(insertText(store.getEditorState(), "\n"));
      return "handled";
    },
  };
};

export default createSoftReturnPlugin;
