export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: { color: string; type: string };
    address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    university: string;
    company: {
        department: string;
        name: string;
        title: string;
    };
    role: string;
}
