import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/ia60onNIdwZFsazv7sGKxYPqJLQRYY7b',
});

const api = {
  loadRestaurants() {
    return client.get('/restaurants').then(response => response.data);
  },
  createRestaurant(name) {
    return client.post('/restaurants', {name}).then(response => response.data);
  },
};

export default api;
