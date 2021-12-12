'use strict'

import fetch from 'node-fetch';
//import { selected_env_details, selected_env_users, getTafPath, data_settings_all } from './envconfig.js'
import * as ec from './envconfig.js';
import { generateUserData } from '../helpers/generators.js';
import logger from '../helpers/logger.js';

export let current_env = ec.selected_env_details;
export let current_users = ec.selected_env_users;
export let current_products = ec.selected_env_products;
export let current_media = ec.selected_env_media;
export let current_test_data = ec.data_settings_all;
export let case_spec_user_data = generateUserData();
export let mocha_timeout = current_env.mocha_request_timeout;

let path_taf_repo = ec.getTafPath();
export let path_data_images = path_taf_repo + ec.data_settings_all.paths.images; 

export async function fetchResponse(url, method, headers, body){
  let response;
  try {
    response = fetch(url, { 
      method: method,
      headers: headers, 
      body: JSON.stringify(body)});
    return await response;
  } catch(err){
    logger.error("There was an error: " + err);
    logger.error("Here is the original response: " + (await response).text());
  }
}

export async function fetchResponseAsJson(url, method, headers, body){
  let response;
  try {
    response = fetch(url, { 
      method: method,
      headers: headers, 
      body: JSON.stringify(body)});
    return (await response).json();
  } catch(err){
    logger.error("There was an error: " + err);
    logger.error("Here is the original response: " + (await response).text());
  }
}

export async function fetchResponseRawBody(url, method, headers, body){
  let response;
  try {
    response = fetch(url, { 
      method: method,
      headers: headers, 
      body: body});
      return await response;
  } catch(err){
    logger.error("There was an error: " + err);
    logger.error("Here is the original response: " + (await response).text());
  }
}

export async function fetchResponseRawBodyAsJson(url, method, headers, body){
  let response;
  try {
    response = fetch(url, { 
      method: method,
      headers: headers, 
      body: body});
      return (await response).json();
  } catch(err){
    logger.error("There was an error: " + err);
    logger.error("Here is the original response: " + (await response).text());
  }
}

export function setRequestData(url, method, headers, body){
  let td = {
    'url': url,
    'method': method,
    'headers': headers,
    'body': body};        
  return td;
}

export function buildUrl(schema, url, port, path){
  let full_url;
  if (port==="") {
    full_url = schema + url + path
    } else {
    full_url = schema + url + ':' + port + path
    };
  return full_url;
}