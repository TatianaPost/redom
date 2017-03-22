import { mount, unmount } from './mount';
import { getParentElRecursive } from './util';

export function setChildren (parent, children) {
  if (children.length === undefined) {
    return setChildren(parent, [children]);
  }

  const parentEl = getParentElRecursive(parent);
  let traverse = parentEl.firstChild;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (!child) {
      continue;
    }

    let childEl = getParentElRecursive(child);

    if (childEl === traverse) {
      traverse = traverse.nextSibling;
      continue;
    }

    mount(parent, child, traverse);
  }

  while (traverse) {
    const next = traverse.nextSibling;

    unmount(parent, traverse);

    traverse = next;
  }
}
