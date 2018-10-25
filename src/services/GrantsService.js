import http from './Http';

const endpoint = 'grants';

export default {
  all() {
    return http.get(endpoint);
  },
  getGrants(grants) {
    return http.post(endpoint, grants);
  },
};
