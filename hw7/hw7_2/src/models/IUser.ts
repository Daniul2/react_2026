// Type of one user in the list
export interface IUser {
    id: number;      // unique identifier — used as key and in onSelect
    name: string;    // name, used for filtering
    age: number;     // age, used for sorting
}
