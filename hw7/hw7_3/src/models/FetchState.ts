// Стан запиту як discriminated union: по полю status TypeScript сам звужує тип.
// Після перевірки `state.status === 'success'` поле `state.data` має тип T (а не T | null),
// а після `state.status === 'error'` — є гарантований `state.error: string`.
export type FetchState<T> =
    | {status: 'loading'; data: null; error: null}
    | {status: 'success'; data: T; error: null}
    | {status: 'error'; data: null; error: string};
