// User interface — mirrors the object structure from https://jsonplaceholder.typicode.com/users.
export interface IUser {
    // Unique user identifier; posts reference it through userId.
    id: number;
    // User's full name (e.g. "Leanne Graham").
    name: string;
    // User's nickname / login (e.g. "Bret").
    username: string;
    // User's email address.
    email: string;
    // Phone number (a string, because it contains brackets, dashes and "x" for an extension).
    phone: string;
    // User's personal website address (without protocol).
    website: string;
    // User's postal address (nested object).
    address: {
        // Street.
        street: string;
        // Apartment / suite.
        suite: string;
        // City.
        city: string;
        // Postal code.
        zipcode: string;
        // Geographic coordinates of the address.
        geo: {
            // Latitude (a string, as the API returns it).
            lat: string;
            // Longitude (a string, as the API returns it).
            lng: string;
        };
    };
    // Company the user works for (nested object).
    company: {
        // Company name.
        name: string;
        // Company slogan.
        catchPhrase: string;
        // Short description of the company's business (business slogan).
        bs: string;
    };
}
