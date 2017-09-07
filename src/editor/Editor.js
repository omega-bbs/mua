import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DraftEditor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";

import getPlugins from "./getPlugins";

const Container = styled.div`
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.5;

  .public-DraftEditor-content {
    overflow: hidden;
    min-height: 20rem;

    > div {
      margin: 1rem 0;
    }
  }

  .public-DraftEditorPlaceholder-root {
    margin: 1rem 0;
  }

  .Editor-unstyled {
    margin: 0.5rem 0;
  }

  .Editor-header {
    margin: 1rem 0;
  }

  .Editor-list {
    margin: 1rem 0;
    padding: 0;

    li {
      margin: 0.5rem 0;
    }
  }

  .Editor-blockquote {
    position: relative;
    margin: 1rem 0;
    padding-left: 1rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      border-left: 4px solid rgba(0, 0, 0, 0.1);
    }

    div {
      margin: 0.5rem 0;
    }
  }

  .Editor-code-block {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.05);

    div {
      display: block;
    }
  }

  .Editor-atomic {
    margin: 1rem 0;
  }

  .public-DraftStyleDefault-listLTR.public-DraftStyleDefault {
    &-depth0 {
      margin-left: 2rem;
    }
    &-depth1 {
      margin-left: 4rem;
    }
    &-depth2 {
      margin-left: 6rem;
    }
    &-depth3 {
      margin-left: 8rem;
    }
    &-depth4 {
      margin-left: 10rem;
    }
  }

  .public-DraftStyleDefault-listRTL.public-DraftStyleDefault {
    &-depth0 {
      margin-right: 2rem;
    }
    &-depth1 {
      margin-right: 4rem;
    }
    &-depth2 {
      margin-right: 6rem;
    }
    &-depth3 {
      margin-right: 8rem;
    }
    &-depth4 {
      margin-right: 10rem;
    }
  }
`;

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
      <Container>
        <DraftEditor {...this.props} plugins={this.plugins} />
      </Container>
    );
  }
}

export default Editor;
