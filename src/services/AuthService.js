import http from './Http';

const endpoint = 'auth';

export default {
  signin(data) {
    return http.post(`${endpoint}/signin`, data);
  },
  update(data) {
    return http.put(`${endpoint}/password`, data);
  },
  check() {
    return http.get(`${endpoint}/check`);
  },
};
