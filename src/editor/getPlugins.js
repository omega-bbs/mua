import base from "./plugins/base";
import block from "./plugins/block";
import softReturn from "./plugins/soft-return";
import codeBlock from "./plugins/code-block";
import markdown from "./plugins/markdown";
import divider from "./plugins/divider";

const getPlugins = () => {
  return [
    base(),
    block(),
    softReturn(),
    codeBlock(),
    markdown(),
    divider(),
  ].reverse();
};

export default getPlugins;
