import { IPointerState } from "../../../types/index";
import { NodeIndex } from "../layout/stateprovider";

// Accessing any evt property can sometimes (rarely) throw exception "Permission denied to access property..."
// Not adding try/catch by design for perf reasons
export function transform(evt: MouseEvent): IPointerState[] {
  let de = document.documentElement;
  return [{
    index: 1, /* Pointer ID */
    event: evt.type,
    pointer: "mouse",
    x: "pageX" in evt ? Math.round(evt.pageX) : ("clientX" in evt ? Math.round(evt["clientX"] + de.scrollLeft) : null),
    y: "pageY" in evt ? Math.round(evt.pageY) : ("clientY" in evt ? Math.round(evt["clientY"] + de.scrollTop) : null),
    width: 1,
    height: 1,
    pressure: 1,
    tiltX: 0,
    tiltY: 0,
    target: (evt.target && NodeIndex in evt.target) ? evt.target[NodeIndex] : null,
    buttons: evt.buttons
  }];
}
