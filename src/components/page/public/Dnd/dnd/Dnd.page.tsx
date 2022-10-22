import { DndContext } from "@dnd-kit/core";

import { useDragAndDrop } from "~/components/page/public/Dnd/dnd/useDragAndDrop";

import { Section } from "./Section";

export const Dnd = () => {
  const { sensors, sections, widgetsById, onDragStart, onDragEnd } = useDragAndDrop();

  return (
    <div className="App">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        autoScroll={true}
        // layoutMeasuring={{ strategy: MeasuringStrategy.Always }}
        // collisionDetection={customCollisionDetectionStrategy}
      >
        {sections.map((columns: string[][], sectionIndex: number) => {
          return (
            <Section
              key={sectionIndex}
              id={String(sectionIndex)}
              index={sectionIndex}
              columns={columns}
              widgetsById={widgetsById}
            />
          );
        })}
      </DndContext>
    </div>
  );
};
