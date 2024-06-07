import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="grid gap-3 place-content-center min-h-screen text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl">404</h1>
      <h3 className="text-xl md:text-2xl lg:text-3xl">Page Not Found</h3>
      <p className="text-xl font-bold">
        Go to
        <Link className="btn btn-link" to="/">
          Home
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
