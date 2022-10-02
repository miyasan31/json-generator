import { Head } from "~/components/lib/react-helmet-async/Head";
import { ErrorBoundary } from "~/components/provider/ErrorBoundary";
import { Suspense } from "~/components/provider/Suspense";

import { Root } from "./Root.page";

export const RootPage = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <Head title="JSON Generator" description="JSON Generator" />
        <Root />
      </Suspense>
    </ErrorBoundary>
  );
};
