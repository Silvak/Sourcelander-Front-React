import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div
      id="error-page"
      className="grid place-content-center h-screen w-screen"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Oops!</h1>
        <p className="text-gray-600">
          Diculpa, un error inesperado ha ocurrido.
        </p>
        <p className="text-red-400">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
