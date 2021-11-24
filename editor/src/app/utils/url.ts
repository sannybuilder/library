export function serializeUrlAndParams(url: string, params: object) {
  const paramsSerialized = Object.entries(params)
    .filter(([_, val]) => val !== undefined)
    .map((v) => v.join('='))
    .join('&');

  return [url, paramsSerialized].filter(Boolean).join('?');
}
