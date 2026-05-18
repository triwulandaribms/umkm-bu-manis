async function send(endpoint, method, body, header = "application/json") {

    const isFormData = body instanceof FormData;

    const response = await fetch(`http://localhost:3000/api${endpoint}`, {
      method,
      credentials: "include",
      headers: isFormData ? {} 
                : {
                  "Content-Type": header,
                },
                body: isFormData 
                  ? body
                  : body
                  ? JSON.stringify(body)
                  : undefined,
                }
      );
    const data = await (method === "GET" ? response.json() : response.json());
    return data;
  }
  
  export const api = {
    get: (endpoint) => send(endpoint, "GET"),
    post: (endpoint, body) => send(endpoint, "POST", body),
    put: (endpoint, body) => send(endpoint, "PUT", body),
    delete: (endpoint) => send(endpoint, "DELETE"),
    delete2: (endpoint, body) => send(endpoint, "DELETE", body),
  };
  