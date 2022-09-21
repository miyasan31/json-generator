import { Head } from "~/components/lib/react-helmet-async/Head";
import { ErrorBoundary } from "~/components/provider/ErrorBoundary";
import { Suspense } from "~/components/provider/Suspense";

import { Root } from "./Root.page";

export const RootPage = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <Head title="トップページ" description="トップページ" />
        <Root />
      </Suspense>
    </ErrorBoundary>
  );
};
