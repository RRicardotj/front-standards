import { notification } from 'antd';

const mem = {};

export default class Toolkit {
  static sortBy(stack, field, order = 'ASC') {
    return stack.sort((a, b) => {
      const fieldA = a[field].toUpperCase();
      const fieldB = b[field].toUpperCase();
      if (order === 'DESC') {
        if (fieldA < fieldB) return 1;
        if (fieldA > fieldB) return -1;
      } else {
        if (fieldA < fieldB) return -1;
        if (fieldA > fieldB) return 1;
      }
      return 0;
    });
  }

  static sort(stack, field = 'name') {
    return stack.sort((a, b) => {
      if (a[field] < b[field]) { return -1; }

      if (a[field] > b[field]) { return 1; }

      return 0;
    });
  }

  static updateById(stack, item, field = 'id') {
    for (let i = 0; i < stack.length; i += 1) {
      if (stack[i][field] === item[field]) {
        stack[i] = item; // eslint-disable-line no-param-reassign
        return stack;
      }
    }
    return stack;
  }

  static removeById(stack, id, field = 'id') {
    for (let i = 0; i < stack.length; i += 1) {
      if (stack[i][field] === id) {
        stack.splice(i, 1);
        return stack;
      }
    }
    return stack;
  }

  static getIndexById(stack, id, field = 'id') {
    for (let i = 0; i < stack.length; i += 1) {
      if (stack[i][field] === id) {
        return i;
      }
    }
    return -1;
  }

  static showAlert(alert, type = 'Info') {
    document.dispatchEvent(new CustomEvent(`http${type}`, { detail: alert }));
  }

  static registerDialog(ref) {
    mem.alertDialog = ref;
  }

  static confirm(dialog) {
    return mem.alertDialog.confirm(dialog);
  }

  static yyyymmdd(date) {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  }

  static showNotification(type, message, description, duration) {
    notification[type]({
      message,
      description,
      duration,
    });
  }

  static getErrorValidationObject(validationObject, currentValues) {
    const newValidationObj = {};
    Object.keys(validationObject).forEach((e) => {
      newValidationObj[e] = {
        value: currentValues[e],
        errors: [new Error(validationObject[e])],
      };
    });
    return newValidationObj;
  }
}
