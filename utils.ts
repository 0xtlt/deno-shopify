function jsonToURL(
  obj: { [key: string]: string | number | undefined },
): string {
  const keys = Object.keys(obj);

  return keys.filter((key) => obj[key] !== undefined).map((key) =>
    `${key}=${encodeURIComponent((obj[key] as string | number).toString())}`
  )
    .join(
      "&",
    );
}

export { jsonToURL };
