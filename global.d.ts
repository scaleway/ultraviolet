/// <reference types="@emotion/react/types/css-prop" />

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type SingleXOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

declare type XOR<T extends unknown[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
  ? XOR<[SingleXOR<A, B>, ...Rest]>
  : never
