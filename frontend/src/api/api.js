const BASE_URL = 'http://localhost:3001/';

export async function getMenu() {
    const response = await fetch(BASE_URL + 'api/menu');
    return await response.json();
}
