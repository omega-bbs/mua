import base from "./plugins/base";
import inlineStyle from "./plugins/inline-style";
import block from "./plugins/block";
import blockConvert from "./plugins/block-convert";
import softReturn from "./plugins/soft-return";
import codeBlock from "./plugins/code-block";
import markdown from "./plugins/markdown";
import divider from "./plugins/divider";

const getPlugins = () => {
  return [
    base(),
    inlineStyle(),
    block(),
    blockConvert(),
    softReturn(),
    codeBlock(),
    markdown(),
    divider(),
  ];
};

export default getPlugins;
