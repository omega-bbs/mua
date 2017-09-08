import { EditorState, AtomicBlockUtils } from "draft-js";

const insertAtomicBlock = (editorState, type, mutability, data, text = " ") => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const blockKey = selection.getStartKey();
  const block = contentState.getBlockForKey(blockKey);
  const blockBefore = contentState.getBlockBefore(blockKey);

  const contentStateWithEntity = contentState.createEntity(
    type,
    mutability,
    data,
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  let newEditorState = AtomicBlockUtils.insertAtomicBlock(
    EditorState.set(editorState, { currentContent: contentStateWithEntity }),
    entityKey,
    text,
  );

  if (
    block.getType() === "unstyled" &&
    block.getLength() === 0 &&
    blockBefore &&
    blockBefore.getType() !== "atomic"
  ) {
    let newContentState = newEditorState.getCurrentContent();
    newContentState = newContentState.merge({
      blockMap: newContentState.getBlockMap().delete(blockKey),
    });
    newEditorState = EditorState.set(newEditorState, {
      currentContent: newContentState,
    });
  }

  return newEditorState;
};

export default insertAtomicBlock;
