// Helper generic function: gets a value from localStorage by key and parses it from JSON.
// <T> — the type we expect to get (e.g. IUserWithTokens). Set at the call site: retriveLocalStorage<IUserWithTokens>('user').
// (The name has a typo: it should be "retrieve", but it is used this way across the project.)
export const retriveLocalStorage = <T>(key: string) => {
    // localStorage.getItem returns a string or null if the key is missing. "|| ''" turns null into an empty string.
    const object = localStorage.getItem(key) || '';
    // If nothing is saved (empty string) —
    if (!object) {
        // return an empty object cast to type T. This way the code below won't crash,
        // but the fields will be undefined (e.g. accessToken → undefined).
        return {} as T;
    }
    // Otherwise turn the JSON string back into an object.
    const parse = JSON.parse(object);
    // And return it with type T (TypeScript takes our word for it — there is no structure check).
    return parse as T;

}
