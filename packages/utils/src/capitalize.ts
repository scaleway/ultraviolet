type Capitalize<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T

const capitalize = <T extends string>(value: T): Capitalize<T> =>
  value.charAt(0).toUpperCase() + value.slice(1)  as Capitalize<T>

export default capitalize
