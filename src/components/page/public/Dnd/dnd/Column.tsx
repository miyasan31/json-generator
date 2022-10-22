import { DroppableSpot } from "./DroppableSpot";
import { Widget } from "./Widget";

type Props = {
  id: string;
  index: number;
  sectionIndex: number;
  widgets: string[];
  widgetsById: Record<string, { height: number }>;
};

/**
 * セクションカラム
 */
export const Column = ({ id: columnId, index: columnIndex, sectionIndex, widgets, widgetsById }: Props) => {
  return (
    <div className="Column">
      {widgets.map((widgetId: string, widgetIndex: number) => {
        const dropBeforeId = `${columnId}-${widgetId}-before`;
        return [
          <DroppableSpot
            key={dropBeforeId}
            id={dropBeforeId}
            sectionIndex={sectionIndex}
            columnIndex={columnIndex}
            widgetIndex={widgetIndex}
            widgetId={widgetId}
            outerHeight={30}
          />,
          <Widget
            key={widgetId}
            id={widgetId}
            index={widgetIndex}
            sectionIndex={sectionIndex}
            columnIndex={columnIndex}
            widgetData={widgetsById[widgetId]}
          >
            {widgetId}
          </Widget>,
        ];
      })}

      <DroppableSpot
        id={`${columnId}-end`}
        sectionIndex={sectionIndex}
        columnIndex={columnIndex}
        widgetIndex={widgets.length}
        widgetId={null}
        outerHeight={30}
      />
    </div>
  );
};
