'use strict';

module.exports = function(f) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      const handler = function(error, ...response) {
        if (error) return reject(error);
        resolve.apply(null, response);
      };

      args.push(handler);
      f.apply(this, args);
    });
  };
};
