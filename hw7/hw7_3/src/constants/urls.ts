const BASE_URL = 'https://dummyjson.com';

export const urls = {
    users: `${BASE_URL}/users?limit=10&select=firstName,lastName,email,age`,
    products: `${BASE_URL}/products?limit=10&select=title,price,category`,
    broken: `${BASE_URL}/this-endpoint-does-not-exist`,
};
