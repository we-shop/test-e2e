'use strict'

import fs from 'fs';
import path from 'path';
import jp from 'jsonpath';

// INFO: No logger usage here, console.log only to avoid cyclic init

const __dirname = path.resolve();

const property_path = './test/config/properties.json';
const property_file_encoding = 'utf8';

const user_data_path = './test/config/testdata/users.json';
const user_data_file_encoding = 'utf-8';

const product_data_path = './test/config/testdata/products.json';
const product_data_file_encoding = 'utf-8';

const media_data_path = './test/config/testdata/media.json';
const media_data_file_encoding = 'utf-8';

const data_settings_path = './test/config/testdata/data-settings.json';
const data_settings_file_encoding = 'utf-8';

function getAllProperties(){
  let all_properties = fs.readFileSync(path.resolve(__dirname, property_path), property_file_encoding);
  return all_properties;
}

function getAllUsers(){
  let all_users = fs.readFileSync(path.resolve(__dirname, user_data_path), user_data_file_encoding);
  return all_users;
}

function getAllProducts(){
  let all_users = fs.readFileSync(path.resolve(__dirname, product_data_path), product_data_file_encoding);
  return all_users;
}

function getAllMedia(){
  let all_users = fs.readFileSync(path.resolve(__dirname, media_data_path), media_data_file_encoding);
  return all_users;
}

function getAllDataSettings(){
  let all_users = fs.readFileSync(path.resolve(__dirname, data_settings_path), data_settings_file_encoding);
  return all_users;
}

export function getAllQuestionBackgrounds(){
  let all_properties = fs.readFileSync(path.resolve(__dirname, question_background_path), question_background_file_encoding);
  return all_properties;
}

export function getPropertybyName(property_name){
  let all_properties = getAllProperties();
  let value = jp.query(JSON.parse(all_properties), property_name).pop();
  return value;
}

export function getUsersForEnv(env){
  let all_users = getAllUsers();
  let value = jp.query(JSON.parse(all_users), env).pop();
  return value;
}

export function getProductsForEnv(env){
  let all_products = getAllProducts();
  let value = jp.query(JSON.parse(all_products), env).pop();
  return value;
}

export function getMediaForEnv(env){
  let all_products = getAllMedia();
  let value = jp.query(JSON.parse(all_products), env).pop();
  return value;
}

export function getDataSettings(){
  let all_data = getAllDataSettings();
  let value = JSON.parse(all_data);
  return value;
}

export function getDataSettingsbyEntityType(entity_type){
  let all_data = getAllDataSettings();
  let value = jp.query(JSON.parse(all_data), entity_type).pop();
  return value;
}

export let property_file_content = getAllProperties();

export let user_data_file_content = getAllUsers();

export let product_data_file_content = getAllProducts();

export let data_settings_file_content = getAllDataSettings();