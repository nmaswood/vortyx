export async function* asyncChunk<T>(
  generator: AsyncIterableIterator<T>,
  n: number,
): AsyncIterableIterator<T[]> {
  let items: T[] = [];

  for await (const item of generator) {
    items.push(item);
    if (items.length >= n) {
      yield items;
      items = [];
    }
  }

  if (items.length > 0) {
    yield items;
  }
}

export async function asyncCollect<T>(
  generator: AsyncIterableIterator<T>,
): Promise<T[]> {
  const result: T[] = [];

  for await (const item of generator) {
    result.push(item);
  }

  return result;
}
