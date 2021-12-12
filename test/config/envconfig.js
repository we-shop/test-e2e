'use strict'

import * as propreader from '../helpers/propreader.js'; 
import * as envreader from '../helpers/envreader.js'; 
import jp from 'jsonpath';
import path from 'path';

// INFO: No logger usage here, console.log only to avoid cyclic init

const __dirname = path.resolve();

function getBackEndEnv(){
  let env;
  if (process.env.BACKEND_ENV !== undefined && process.env.BACKEND_ENV.includes('FEA')){
    env = 'int';
  } else {
    env = process.env.BACKEND_ENV;
  }
  //console.log("Backend value: " + env);
  return env;
}

function getCurrentEnv(){
  let selected_env;
  if (getBackEndEnv() !== undefined){
    selected_env = getBackEndEnv().toLowerCase();
  } else {
    selected_env = propreader.getPropertybyName('$.selected_env');
  }
  return selected_env;
}

function getCurrentEnvDetails(env_info){

  let e;

  if(env_info == 'local'){
    e = propreader.getPropertybyName('$.environments.local');
    } else if (env_info == 'int'){
        e = propreader.getPropertybyName('$.environments.int');
      } else if (env_info == 'uat'){
        e = propreader.getPropertybyName('$.environments.uat');
      } else {
      // TODO: Error output, need error handling
      }   
  // temporarity switched off to be able to work without .env file    
  //e = replacePlaceholdersForClientIds(e, env_info);
  return e;
}

function getMailHost(){
  let mh = propreader.getPropertybyName('$.generator.mailhost');
  return mh;
}

function getStandardPassword(){
  let sp = propreader.getPropertybyName('$.generator.standard_pass');
  return sp;
}

function getLoggerSettings(){
  let ls = propreader.getPropertybyName('$.logger');
  return ls;
}

function getUsersForEnv(env_info){

  let u;

  if(env_info == 'local'){
    u = propreader.getUsersForEnv('$.local');
  } else if (env_info == 'int'){
    u = propreader.getUsersForEnv('$.int');
  } else if (env_info == 'uat'){
    u = propreader.getUsersForEnv('$.uat');
  } else {
    // TODO: Error output, need error handling
  }   
  return u;
}

function getProductsForEnv(env_info){

  let p;

  if(env_info == 'local'){
    p = propreader.getProductsForEnv('$.local');
  } else if (env_info == 'int'){
    p = propreader.getProductsForEnv('$.int');
  } else if (env_info == 'uat'){
    p = propreader.getProductsForEnv('$.uat');
  } else {
    // TODO: Error output, need error handling
  }   
  return p;
}

function getMediaForEnv(env_info){

  let p;

  if(env_info == 'local'){
    p = propreader.getMediaForEnv('$.local');
  } else if (env_info == 'int'){
    p = propreader.getMediaForEnv('$.int');
  } else if (env_info == 'uat'){
    p = propreader.getMediaForEnv('$.uat');
  } else {
    // TODO: Error output, need error handling
  }   
  return p;
}

function replacePlaceholdersForClientIds(raw_data, env_info){

  let processed_data;

  if (raw_data !== undefined){
  raw_data.clientIds.facebook_app_id = getEnvFileDataByName(env_info.toUpperCase() + '_FACEBOOK_APP_ID');
  raw_data.clientIds.facebook_app_secret = getEnvFileDataByName(env_info.toUpperCase() + '_FACEBOOK_APP_SECRET');
  raw_data.clientIds.instagram_client_id = getEnvFileDataByName(env_info.toUpperCase() + '_INSTAGRAM_CLIENT_ID');
  raw_data.clientIds.instagram_client_secret = getEnvFileDataByName(env_info.toUpperCase() + '_INSTAGRAM_CLIENT_SECRET');
  raw_data.clientIds.google_client_id = getEnvFileDataByName(env_info.toUpperCase() + '_GOOGLE_CLIENT_ID');
  raw_data.clientIds.google_client_secret = getEnvFileDataByName(env_info.toUpperCase() + '_GOOGLE_CLIENT_SECRET');
  raw_data.clientIds.apple_client_id = getEnvFileDataByName(env_info.toUpperCase() + '_APPLE_CLIENT_ID');
  raw_data.clientIds.apple_mobile_client_id = getEnvFileDataByName(env_info.toUpperCase() + '_APPLE_MOBILE_CLIENT_ID');
  raw_data.clientIds.apple_team_id = getEnvFileDataByName(env_info.toUpperCase() + '_APPLE_TEAM_ID');
  raw_data.clientIds.apple_key_id = getEnvFileDataByName(env_info.toUpperCase() + '_APPLE_KEY_ID');

  processed_data = raw_data;

  } else {
    raw_data.clientIds.facebook_app_id = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.facebook_app_secret = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.instagram_client_id = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.instagram_client_secret = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.google_client_id = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.google_client_secret = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.apple_client_id = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.apple_mobile_client_id = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.apple_team_id = 'ENV_FILE_NOT_AVAILABLE';
    raw_data.clientIds.apple_key_id = 'ENV_FILE_NOT_AVAILABLE';

    processed_data = raw_data;

  }
  return processed_data;
}

function getEnvFileDataByName(property_name){
  let value;
  if (envreader.env_file_content !== undefined){
  value = jp.query(envreader.env_file_content, property_name).pop();
  } else {
    value = 'ENV_FILE_NOT_AVAILABLE';
  }
  return value;
}

function getAllTestDataSettings(){
  let ls = propreader.getDataSettings();
  return ls;
}

function getPostsSettings(){
  let ls = propreader.getDataSettingsbyEntityType('posts');
  return ls;
}

export function getTafPath(){
  let p = path.resolve(__dirname);
  //console.log("Project path is: " + p);
  return p;
}

export var selected_backend_env = getBackEndEnv();

export var selected_env_details = getCurrentEnvDetails(getCurrentEnv());

export var selected_env_users = getUsersForEnv(getCurrentEnv());

export var selected_env_products = getProductsForEnv(getCurrentEnv());

export var selected_env_media = getMediaForEnv(getCurrentEnv());

export var mail_host = getMailHost();

export var standard_password = getStandardPassword();

export var logger_settings = getLoggerSettings();

export var data_settings_all = getAllTestDataSettings();

export var data_settings_posts = getPostsSettings();