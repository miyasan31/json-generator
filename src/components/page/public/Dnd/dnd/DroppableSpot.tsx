import { useDroppable } from "@dnd-kit/core";

const placeholderHeight = 4;

type Props = {
  id: string;
  sectionIndex: number;
  columnIndex: number;
  widgetIndex: number;
  widgetId: string | null;
  outerHeight: number;
};

/**
 * ドラッグ判定のボーダー（ドラッグ中に青くなる線）
 */
export const DroppableSpot = ({ id, sectionIndex, columnIndex, widgetIndex, widgetId, outerHeight }: Props) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      sectionIndex: sectionIndex,
      columnIndex: columnIndex,
      widgetIndex: widgetIndex,
      widgetId: widgetId,
    },
  });

  const placeholderTop = Math.round(outerHeight / 2 - placeholderHeight / 2);

  return (
    <div ref={setNodeRef}>
      {
        <div style={{ position: "relative", height: `${outerHeight}px` }}>
          <div
            style={{
              position: "absolute",
              top: `${placeholderTop}px`,
              left: "-5px",
              right: "-5px",
              height: `${placeholderHeight}px`,
              backgroundColor: isOver ? "rgb(9, 113, 241)" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
        </div>
      }
    </div>
  );
};
