import { useStrict } from "mobx";
import { useStaticRendering } from "mobx-react";

global.requestAnimationFrame = callback => setTimeout(callback, 0);

useStrict(true);
useStaticRendering(true);
