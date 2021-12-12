'use strict'

import jp from 'jsonpath';
import logger from '../logger.js'
import * as tl from '../../../test/config/testlab.js'

export async function loginWithUsernameAndPassword(user, password){

  let url_path = '/oauth/signin';
  let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
  let method = 'post';

  let headers = {
    'Content-Type': 'application/json'
  };

  let body = {
    'username': user,
    'password': password
  };

  let request_auth_data = tl.setRequestData(url, method, headers, body);
  logger.debug('Auth request data (inner): ' + JSON.stringify(request_auth_data));

  let response_auth = await tl.fetchResponse(request_auth_data.url, request_auth_data.method, request_auth_data.headers, request_auth_data.body);
  let response_auth_json = await response_auth.json();
  logger.debug('Auth response data (inner): ' + JSON.stringify(response_auth_json));
  
  return response_auth_json;
}

export async function loginWithEmailAndPassword(email, password){

  let url_path = '/oauth/signin';
  let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
  let method = 'post';

  let headers = {
    'Content-Type': 'application/json'
  };

  let body = {
    'email': email,
    'password': password
  };

  let request_auth_data = tl.setRequestData(url, method, headers, body);
  logger.debug('Auth request data (inner): ' + JSON.stringify(request_auth_data));

  let response_auth = await tl.fetchResponse(request_auth_data.url, request_auth_data.method, request_auth_data.headers, request_auth_data.body);
  let response_auth_json = await response_auth.json();
  logger.debug('Auth response data (inner): ' + JSON.stringify(response_auth));
  
  return response_auth_json;
}

export async function getAccessToken(response_json){
  let access_token = jp.query(response_json, '$["access-token"]').pop();
  logger.debug("Access token is: " + JSON.stringify(access_token));
  return access_token;
}

export async function getRefreshToken(response_json){
  let refresh_token = jp.query(response_json, '$["refresh-token"]').pop();
  logger.debug("Refresh token is: " + JSON.stringify(refresh_token));
  return refresh_token;
}

export async function getExpirationDate(response_json){
  let expiration_date = jp.query(response_json, '$["access-token-expires-at"]').pop();
  logger.debug("Expiration date: " + expiration_date);
  return expiration_date;
}

export async function getUserId(response_json){
  let user_id = jp.query(response_json, '$["user-id"]').pop();
  logger.debug("User id: " + user_id);
  return user_id;
}