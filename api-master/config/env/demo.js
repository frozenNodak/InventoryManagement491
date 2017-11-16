"use strict";

/**
 * Development environment settings
 * @description :: This section overrides all other config values ONLY in development environment
 */

module.exports = {
  port: 80,
  log: {
    level: 'verbose'
  },
  models: {
    connection: 'demomysql'
  }
};
