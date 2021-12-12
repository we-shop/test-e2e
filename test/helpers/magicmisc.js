'use strict'

import jp from 'jsonpath';
import logger from './logger.js'
import * as tl from '../config/testlab.js'

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
  