import base from "./plugins/base";
import block from "./plugins/block";
import codeBlock from "./plugins/code-block";
import markdown from "./plugins/markdown";
import divider from "./plugins/divider";

const getPlugins = () => {
  return [base(), block(), codeBlock(), markdown(), divider()].reverse();
};

export default getPlugins;
