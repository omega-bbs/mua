import createBasePlugin from "./plugins/base";
import createListPlugin from "./plugins/list";

const getPlugins = () => {
  return [createBasePlugin(), createListPlugin()].reverse();
};

export default getPlugins;
