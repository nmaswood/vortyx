export type NonNullableRecursive<T> = {
  [P in keyof T]: T[P] extends (infer R)[]
    ? NonNullableRecursive<R>[]
    : T[P] extends object
      ? NonNullableRecursive<T[P]>
      : T[P] extends null
        ? never
        : T[P];
};

const BLACK_LIST = new Set([null, undefined, "", "-"]);
export function removeNulls<T>(obj: T): NonNullableRecursive<T> {
  const keys = Object.keys(obj as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  keys.forEach((key) => {
    const value = (obj as any)[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (BLACK_LIST.has(value)) {
      delete (obj as any)[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
    } else if (typeof value === "object" && value !== null) {
      removeNulls(value);
    }
  });
  return obj as NonNullableRecursive<T>;
}
