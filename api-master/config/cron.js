"use strict";

/**
 * Cron configuration where you can define cron tasks with range time and callbacks.
 * Look here for detailed examples https://github.com/ghaiklor/sails-hook-cron
 *
 * @example
 * module.exports = {
 *   cron: {
 *     jobExample: {
 *       schedule: '* * * * * *',
 *       onTick: () => doSomething(),
 *       onComplete: () => doSomething(),
 *       start: true,
 *       timezone: 'Ukraine/Kiev',
 *       context: undefined
 *     }
 *   }
 * }
 */

module.exports = {
  cron: {
    
  }
};
