export function splitByNextEcommerce(inputString: string) {
  // const pattern = /next\.ecommerce[^:]*:/g;
  const pattern = /['"]?next\.ecommerce[^:]*[:'"]/g;
  const matches = inputString.match(pattern);
  if (!matches) {
    return [];
  }

  const segments = inputString.split(new RegExp(`(${pattern.source})`));
  return segments.filter((segment) => segment.trim() !== "");
}

export function chunkArrayByTwo(arr: string[]) {
  let chunks = [];

  for (let i = 0; i < arr.length; i += 2) {
    let chunk = arr.slice(i, i + 2);
    chunks.push(chunk);
  }

  return chunks;
}

export function findNewestProperties(obj1: Record<string, any>, obj2: Record<string, any>): string[] {
  const uniqueKeys: string[] = [];

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      uniqueKeys.push(key);
    }
  }

  return uniqueKeys;
}
