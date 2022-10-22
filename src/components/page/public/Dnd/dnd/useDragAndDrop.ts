import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";

/**
 * @package
 */
export const useDragAndDrop = () => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const [sections, setSections] = useState(() => {
    return [
      [["A", "B", "C"]],
      [["D"], ["E", "F"], [], ["G"]],
      [[]],
      [["H"], ["I"], ["J"], ["K"]],
      [["L"], ["M"], ["N"], ["O"], ["P"]],
    ];
  });

  const widgetsById = useMemo(() => {
    return {
      A: { height: 100 },
      B: { height: 150 },
      C: { height: 50 },
      D: { height: 450 },
      E: { height: 50 },
      F: { height: 200 },
      G: { height: 100 },
      H: { height: 50 },
      I: { height: 50 },
      J: { height: 50 },
      K: { height: 50 },
      L: { height: 50 },
      M: { height: 50 },
      N: { height: 50 },
      O: { height: 50 },
      P: { height: 50 },
    };
  }, []);

  const onDragStart = useCallback((event: DragStartEvent) => {
    // console.info("Drag Start:", event);
  }, []);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) {
      return;
    }

    // console.info("Drag End:", event);

    const source = active.data.current;
    const destination = over.data.current;

    console.info(source);
    console.info(destination);

    // Widget was dropped where it started
    if (source?.widgetId === destination?.widgetId) {
      // console.info("Widget dropped where it started (noop)");
      return;
    }

    // Widget is dropped right below right where it started
    if (
      // Same starting and ending column
      source?.sectionIndex === destination?.sectionIndex &&
      source?.columnIndex === destination?.columnIndex &&
      // Dropped below starting index
      source?.widgetIndex === destination?.widgetIndex - 1
    ) {
      // console.info("Widget dropped below self (noop)");
      return;
    }

    // console.info(`Widget "${source?.widgetId}" moved to ${JSON.stringify(destination)}`);

    setSections((prevSections) => {
      return prevSections.map((columns: string[][], sectionIndex: number) => {
        return columns.map((widgets, columnIndex) => {
          if (source?.sectionIndex === sectionIndex && source.columnIndex === columnIndex) {
            // Remove the widget from its starting location
            widgets = widgets.filter((widgetId) => widgetId !== source.widgetId);
          }

          if (destination?.sectionIndex === sectionIndex && destination.columnIndex === columnIndex) {
            // Add the widget to its new location
            widgets = [...widgets];
            widgets.splice(destination.widgetIndex, 0, source?.widgetId);
          }

          return widgets;
        });
      });
    });
  }, []);

  return {
    sensors,
    sections,
    widgetsById,
    onDragStart,
    onDragEnd,
  };
};
