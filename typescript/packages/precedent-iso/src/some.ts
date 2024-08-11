export type All = { type: "all" };
export type Some<T> = { type: "some"; value: T[] };

export type AllOrSome<T> = All | Some<T>;
