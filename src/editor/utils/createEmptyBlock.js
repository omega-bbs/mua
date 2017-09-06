import { ContentBlock, genKey } from "draft-js";

const createEmptyBlock = () => {
  return new ContentBlock({ key: genKey() });
};

export default createEmptyBlock;
