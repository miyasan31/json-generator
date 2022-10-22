import "./index.css";

import { Head } from "~/components/lib/react-helmet-async/Head";
import { ErrorBoundary } from "~/components/provider/ErrorBoundary";

import { Dnd } from "./dnd/Dnd.page";

export const DndPage = () => {
  return (
    <ErrorBoundary>
      <Head title="JSON Generator" description="JSON Generator" />
      <Dnd />
    </ErrorBoundary>
  );
};
