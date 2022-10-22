import { Column } from "./Column";

type Props = {
  id: string;
  index: number;
  columns: string[][];
  widgetsById: Record<string, { height: number }>;
};

/**
 * セクションブロック
 */
export const Section = ({ id: sectionId, index: sectionIndex, columns, widgetsById }: Props) => {
  return (
    <div className={`Section cols-${columns.length}`}>
      {columns.map((widgets: string[], columnIndex: number) => {
        const columnId = `section-${sectionId}-column-${columnIndex}`;

        return (
          <Column
            key={columnId}
            id={columnId}
            index={columnIndex}
            sectionIndex={sectionIndex}
            widgets={widgets}
            widgetsById={widgetsById}
          />
        );
      })}
    </div>
  );
};
