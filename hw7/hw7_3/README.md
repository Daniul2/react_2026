# ДЗ 7 (розбір) — кастомний хук `useFetch<T>(url)`

**Завдання (#cf69cHp):** створити кастомний хук, який повертає відповіді з API і замінює
`useState` + `useEffect`. Ендпоінт — аргумент хука. Продумати типізацію відповіді.

## Використання

```tsx
const state = useFetch<IUsersResponse>(urls.users);

if (state.status === 'loading') return <Loading/>;
if (state.status === 'error') return <ErrorMessage message={state.error}/>;

state.data.users.map(...) // state.data: IUsersResponse — без `?.` і `!`
```

## Типізація

Хук повертає `FetchState<T>` (`src/models/FetchState.ts`) — **discriminated union** по полю `status`:

```ts
type FetchState<T> =
    | {status: 'loading'; data: null; error: null}
    | {status: 'success'; data: T;    error: null}
    | {status: 'error';   data: null; error: string};
```

Чому так, а не `{data: T | null; isLoading: boolean; error: string | null}`:
- неможливі «дивні» комбінації (`isLoading: true` і водночас `error`);
- після перевірки `status` TypeScript сам звужує тип: у гілці `'success'` `data` має тип `T`.

`T` задає той, хто викликає хук. Хук не валідує JSON у рантаймі, тому інтерфейси в `src/models/`
описують реальну відповідь dummyjson (спільні поля `total/skip/limit` винесені в `IDummyResponse`).

## Що ще враховано

- **`AbortController`** — при зміні `url` або розмонтуванні старий запит скасовується, тож стара відповідь
  не перезапише нову (race condition).
- **`response.ok`** — `fetch` не кидає помилку на 404/500, тому хук перевіряє статус сам
  (вкладка «Помилка 404» це показує).
- `catch (error: unknown)` → безпечно дістаємо `message`.

## Запуск

```bash
npm install
npm run dev
```
