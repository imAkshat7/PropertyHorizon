import axios from 'axios';

// Ensure the base URL does not end with a slash
export const baseUrl = 'https://bayut.p.rapidapi.com';

// Function to fetch data
export const fetchApi = async (endpoint) => {
  try {
    // Ensure endpoint starts with a slash
    const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    console.log('Fetching URL:', url); // Log the full URL for debugging

    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-key': 'faad9e6150msh71e423770868aaep10f6f1jsnac607401b8e5',
        'x-rapidapi-host': 'bayut.p.rapidapi.com'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    throw error;
  }
};
