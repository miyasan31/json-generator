import type { ReactNode } from "react";

import { useWidget } from "~/components/page/public/Dnd/dnd/useWidget";

type Props = {
  id: string;
  index: number;
  sectionIndex: number;
  columnIndex: number;
  widgetData: { height: number };
  children: ReactNode;
};

/**
 * ドラッグ対象のアイテム
 */
export const Widget = ({ id, index, sectionIndex, columnIndex, widgetData }: Props) => {
  const { translate, attributes, listeners, setNodeRef, isDragging } = useWidget({
    id,
    index,
    sectionIndex,
    columnIndex,
  });

  return (
    <div ref={setNodeRef} style={{ transform: isDragging ? `translate3d(${translate.x}px, ${translate.y}px, 0)` : "" }}>
      <div
        style={{
          opacity: isDragging ? "0.4" : "1",
          transition: "opacity 300ms",
        }}
        className="Widget"
      >
        <div className="WidgetHeader">
          <div
            {...listeners}
            {...attributes}
            className="WidgetDragHandle"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          />

          <div className="WidgetTitle">{id}</div>
        </div>

        <div className="WidgetBody" style={{ height: `${widgetData.height}px` }} />
      </div>
    </div>
  );
};
