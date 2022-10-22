import type { CollisionDetection } from "@dnd-kit/core";

const closest = (rects, rect, testFn) => {
  let closestId = null;
  let minDistance = Infinity;

  rects.forEach((testRect) => {
    const distance = Math.abs(testFn(testRect[1], rect));
    if (distance < minDistance) {
      closestId = testRect[0];
      minDistance = distance;
    }
  });

  return closestId;
};

const closestTopLeftCorner = (rects, rect) => {
  return closest(rects, rect, (a, b) => {
    // 2D distance
    return Math.sqrt(Math.pow(a.offsetTop - b.top, 2) + Math.pow(a.offsetLeft - b.left, 2));
  });
};

/**
 * @package
 */
export const customCollisionDetectionStrategy = (rects, rect): CollisionDetection => {
  return closestTopLeftCorner(rects, rect);
};
