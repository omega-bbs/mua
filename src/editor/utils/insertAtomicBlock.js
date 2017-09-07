import { EditorState, AtomicBlockUtils } from "draft-js";

const insertAtomicBlock = (editorState, type, mutability, data, text = " ") => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    type,
    mutability,
    data,
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    EditorState.set(editorState, { currentContent: contentStateWithEntity }),
    entityKey,
    text,
  );
  return newEditorState;
};

export default insertAtomicBlock;
