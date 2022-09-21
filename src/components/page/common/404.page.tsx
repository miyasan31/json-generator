import { Head } from "~/components/lib/react-helmet-async/Head";
import { Link } from "~/components/lib/react-router/Link";

const NotFoundPage = () => {
  return (
    <>
      <Head title="not found page" description="not found page" />

      <main>
        <h1>404 NotFound</h1>
        <div>
          <Link to="/">to /</Link>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
