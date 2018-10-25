import http from './Http';

const endpoint = 'user';

export default {
  index() {
    return http.get(endpoint);
  },

  create(data) {
    return http.post(endpoint, data);
  },

  update(id, data) {
    return http.put(`${endpoint}/${id}`, data);
  },

  password(id) {
    return http.put(`${endpoint}/${id}/password`);
  },

  dropdown() {
    return http.get(`${endpoint}/dropdown`);
  },
  menu() {
    return http.get(`${endpoint}/menu`);
  },
};
