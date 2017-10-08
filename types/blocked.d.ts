declare module 'blocked' {
  type blocked = (fn: (ms: number) => any, options?: {
    threshold: number,
  }) => any
  export default blocked
}
