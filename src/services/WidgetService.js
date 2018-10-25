import http from './Http';

const endpoint = 'widget';

export default {
  index() {
    return http.get(`${endpoint}`);
  },
  KPIturn() {
    return http.get(`${endpoint}/actives`);
  },
  forDay() {
    return http.get(`${endpoint}/for-days`);
  },
  expiredSupplies(days) {
    return http.get(`${endpoint}/expired-supplies/${days}`);
  },
  employeesActives() {
    return http.get(`${endpoint}/employees-actives`);
  },
  vehiclesActives() {
    return http.get(`${endpoint}/vehicles-actives`);
  },
  incidencesBarChar() {
    return http.get(`${endpoint}/incidences-barchart`);
  },

};
