import { Head } from "~/components/lib/react-helmet-async/Head";
import { NotFound } from "~/components/page/common/404/404.page";

const NotFoundPage = () => {
  return (
    <>
      <Head title="ページが見つかりません" description="ページが見つかりません" />

      <NotFound />
    </>
  );
};

export default NotFoundPage;
