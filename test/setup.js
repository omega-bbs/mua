global.requestAnimationFrame = callback => setTimeout(callback, 0);

import { useStrict } from "mobx";
import { useStaticRendering } from "mobx-react";

useStrict(true);
useStaticRendering(true);
