import { navigate } from "raviger";

function useFetch() {
  return async (uri, options) => {
    const response = await fetch(uri, options);

    if (response.headers.get("Verify-Request-Failure") === "1") {
      const authUrlHeader = response.headers.get("Verify-Request-Reauth-URL");
      navigate(authUrlHeader);

      return null;
    }

    return response;
  };
}
export function useFetchGQL() {
  return async (gql, options) => {
    const response = await fetch('/api/graphql', {
      ...options,
      body: gql,
      method: 'POST',
      headers: { 'Content-Type': "application/json" }
    });

    if (response.headers.get("Verify-Request-Failure") === "1") {
      const authUrlHeader = response.headers.get("Verify-Request-Reauth-URL");
      navigate(authUrlHeader);

      return null;
    }

    return response;
  };
}

export default useFetch;
