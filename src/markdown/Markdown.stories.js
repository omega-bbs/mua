import React from "react";
import { storiesOf } from "@storybook/react";

import Markdown from "./Markdown";

storiesOf("Markdown", module).add("simple", () =>
  <Markdown markdown="*italic* **bold** `code`" />,
);
