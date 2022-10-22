import type { DragMoveEvent, DragStartEvent } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { useDndMonitor } from "@dnd-kit/core";
import { useCallback, useState } from "react";

type Props = {
  id: string;
  index: number;
  sectionIndex: number;
  columnIndex: number;
};

export const useWidget = ({ id: widgetId, index: widgetIndex, sectionIndex, columnIndex }: Props) => {
  const [initialWindowScroll, setInitialWindowScroll] = useState({
    x: 0,
    y: 0,
  });

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: widgetId,
    data: {
      widgetIndex,
      columnIndex,
      sectionIndex,
      widgetId,
    },
  });

  useDndMonitor({
    onDragStart: useCallback(
      (event: DragStartEvent) => {
        if (event.active.id !== widgetId) return;

        setInitialWindowScroll({
          x: window.scrollX,
          y: window.scrollY,
        });
        setTranslate({ x: 0, y: 0 });
      },
      [widgetId],
    ),
    onDragMove: useCallback(
      (event: DragMoveEvent) => {
        if (event.active.id !== widgetId) return;

        setTranslate({
          x: event.delta.x - initialWindowScroll.x,
          y: event.delta.y - initialWindowScroll.y,
        });
      },
      [widgetId, initialWindowScroll],
    ),
    onDragEnd: useCallback(() => {
      setInitialWindowScroll({ x: window.scrollX, y: window.scrollY });
      setTranslate({ x: 0, y: 0 });
    }, []),
  });

  return {
    translate,
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  };
};
