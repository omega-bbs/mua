import React from "react";
import PropTypes from "prop-types";
import DraftEditor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";

import getPlugins from "./getPlugins";

class Editor extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = { mounted: false };

  componentDidMount() {
    this.setState({ mounted: true });
    this.plugins = getPlugins();
  }

  render() {
    if (!this.state.mounted) return null;
    return (
      <DraftEditor
        plugins={this.plugins}
        editorState={this.props.editorState}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Editor;
