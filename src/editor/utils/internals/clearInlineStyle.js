import { Modifier } from "draft-js";

const INLINE_STYLES = ["BOLD", "ITALIC", "UNDERLINE", "CODE"];

const clearInlineStyles = (contentState, selection) => {
  return INLINE_STYLES.reduce(
    (contentState, inlineStyle) =>
      Modifier.removeInlineStyle(contentState, selection, inlineStyle),
    contentState,
  );
};

export default clearInlineStyles;
