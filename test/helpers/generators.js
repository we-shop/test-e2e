'use strict'

import { v4 as uuidv4 } from 'uuid';
import { mail_host } from '../config/envconfig.js'
import { standard_password } from '../config/envconfig.js'
import * as generator from 'generate-password'

export function generateUuid(){
  return uuidv4();
  }

function generateUsername(uuid){
  let u = uuid.substring(1,20);
  return u;
  }

function generateEmail(uuid){
  let e = uuid + '@' + mail_host;
  return e;
  }

function generateValidPassword(){
  let p = generator.generate({
    length: 8,
    uppercase: true,
    numbers: true,
    symbols: true,
    strict: true
  });
  return p;
}

export function generateUserData(){
  let uuid = generateUuid();
  let userdata = {
    'guid': uuid,
    'username': generateUsername(uuid),
    'email': generateEmail(uuid),
    'password': standard_password,
    'password_random_valid': generateValidPassword()
  }
  return userdata;
}

// be careful with this one, may not work in some cases
export var generated_userdata = generateUserData();
