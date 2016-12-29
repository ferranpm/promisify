'use strict';

if (!Object.values) {
  Object.values = function(obj) {
    return Object.keys(obj).map(function (k) { return obj[k]; });
  };
}

module.exports = function(f) {
  return function() {
    var args = Object.values(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function(error) {
        if (error) return reject.apply(this, arguments);
        resolve.apply(this, Object.values(arguments).slice(1));
      });
      f.apply(this, args);
    });
  };
};
