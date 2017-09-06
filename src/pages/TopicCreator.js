import React from "react";
import { EditorState } from "draft-js";

import Editor from "../editor";

import PageLayout from "../components/PageLayout";

class TopicCreator extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    return (
      <PageLayout>
        <PageLayout.Main>
          <Editor
            editorState={this.state.editorState}
            onChange={this.handleChange}
            placeholder="Write something here..."
          />
        </PageLayout.Main>
      </PageLayout>
    );
  }
}

export default TopicCreator;
