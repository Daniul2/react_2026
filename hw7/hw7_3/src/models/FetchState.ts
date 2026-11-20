// Request state as a discriminated union: TypeScript narrows the type by the status field.
// After checking `state.status === 'success'` the field `state.data` has type T (not T | null),
// and after `state.status === 'error'` there is a guaranteed `state.error: string`.
export type FetchState<T> =
    | {status: 'loading'; data: null; error: null}
    | {status: 'success'; data: T; error: null}
    | {status: 'error'; data: null; error: string};
