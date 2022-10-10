import { Head } from "~/components/lib/react-helmet-async/Head";
import { ErrorBoundary } from "~/components/provider/ErrorBoundary";

import { Root } from "./Root.page";

export const RootPage = () => {
  return (
    <ErrorBoundary>
      <Head title="JSON Generator" description="JSON Generator" />
      <Root />
    </ErrorBoundary>
  );
};
