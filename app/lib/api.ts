type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

export async function fetchApi<T>(path: string, init?: NextFetchInit): Promise<T> {
  const url = getApiUrl(path);

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      next: {
        revalidate: 60,
        ...init?.next,
      },
    });
  } catch (error) {
    throw new Error(`Failed to reach API ${url.pathname}: ${getErrorMessage(error)}`);
  }

  if (!res.ok) {
    throw new Error(`API ${url.pathname} responded with ${res.status}`);
  }

  return res.json();
}

function getApiUrl(path: string) {
  const host = process.env.SERVER_HOST?.trim().replace(/\/+$/, "");

  if (!host) {
    throw new Error("SERVER_HOST is not configured");
  }

  return new URL(path.replace(/^\/+/, ""), `${host}/`);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "unknown error";
}
