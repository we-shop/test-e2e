'use strict'

import jp from 'jsonpath';
import logger from '../logger.js'
import * as tl from '../../../test/config/testlab.js'
import * as mm from '../magicmisc.js'

export async function getPostsForAUser(access_token, user_id, post_type){

  let response;
  let response_json;
  let request_data;
  let url_path = '/posts/list';
  let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
  let method = 'post';

  let headers = {
    'Content-Type': 'application/json',
    'Cookie': 'sss-authorization=' + access_token
  };

  let body = {
    "ids": {
    "user_ids": [
        user_id
    ]
    },
    "facets": [
    "interaction-counts"
    ],
    "type": post_type,
    "joins": {
    "users": {
        "facets": ["current-user-follows"]
    }
    },
    "query": {
    "limit": 300
    }
  };

  request_data = tl.setRequestData(url, method, headers, body);
  logger.debug('Posts requests data: ' + JSON.stringify(request_data));

  response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  response_json = await response.json();
  //logger.debug('Posts response data: ' + JSON.stringify(response_json));
  return response_json;
}

export async function getPostById(access_token, post_id, merchants_bool){

  let url_path = '/posts/get-by-ids';
  let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
  let method = 'post';

  let headers = {
    'Content-Type': 'application/json',
    'Cookie': 'sss-authorization=' + access_token
  };

  let body = {
    'post_ids': [
      post_id
    ],
    'merchants': merchants_bool
  }

  let request_data = tl.setRequestData(url, method, headers, body);
  //logger.info('Get post by id request data: ' + JSON.stringify(request_data));

  let response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  let response_json = await response.json();
  //logger.info("Get post by id response is: " + JSON.stringify(response_json));

  return response_json;
}

export async function getPostsIdsFromPosts(posts_response_json){
  let posts_ids = Object.keys(jp.query(posts_response_json, '$..posts').pop());
  logger.debug("Posts of both types ids: " + posts_ids);
  return posts_ids;
}

export function selectRandomPost(post_ids){
  let selected_post_position = mm.getRandomInt(0, post_ids.length);
  let selected_post = post_ids[selected_post_position];
  logger.debug('Selected post is: ' + JSON.stringify(selected_post));
  return selected_post;
}

export function getPostJsonSubset(response_json){
  let post_uuid = jp.query(response_json, '$..posts').pop();
  logger.debug("Post uuid value: " + JSON.stringify(post_uuid));
  return post_uuid;
}

export function getPostsUuids(response_json){
  let post_uuid = Object.keys(jp.query(response_json, '$..posts').pop())[0];
  logger.debug("Post uuid value: " + JSON.stringify(post_uuid));
  return post_uuid;
}

export function getUsersJsonSubset(response_json){
  let json_subset_users = jp.query(response_json, '$..users').pop();
  logger.debug("Users subset value: " + JSON.stringify(json_subset_users));
  return json_subset_users;
}

export function getUsersUuids(json_subset_users){
  let users_uuids = Object.keys(json_subset_users);
  logger.debug("Users uuid array value: " + JSON.stringify(users_uuids));
  return users_uuids;
}

export function getProductsJsonSubset(response_json){
  let json_subset_products = jp.query(response_json, '$..products').pop();
  logger.debug("Products subset value: " + JSON.stringify(json_subset_products));
  return json_subset_products;
}

export function getProductsUuids(json_subset_products){
  let product_uuids = Object.keys(json_subset_products);
  logger.debug("Product uuid value: " + JSON.stringify(product_uuids));
  return product_uuids;
}

export function getMerchantsJsonSubset(response_json){
  let json_subset_merchants = jp.query(response_json, '$..merchants').pop();
  logger.debug("Merchants subset value: " + JSON.stringify(json_subset_merchants));
  return json_subset_merchants;
}

export function getMerchantsUuids(json_subset_merchants){
  let merchants_uuids = Object.keys(json_subset_merchants);
  logger.debug("Merchant uuid value: " + JSON.stringify(merchants_uuids));
  return merchants_uuids;
}

export function getFontNamesJsonSubset(response_json){
  let json_subset_font_names = jp.query(response_json, '$.fonts').pop();
  logger.debug("Font names: " + JSON.stringify(json_subset_font_names));
  return json_subset_font_names;
}

export function getFontNames(json_subset_fonts){
  let font_names = Object.keys(json_subset_fonts);
  logger.debug("Font names: " + JSON.stringify(font_names));
  return font_names;
}

export async function hideSelectedPost(access_token, post_uuid){

  let url_path = '/posts/hide';
  let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
  let method = 'post';

  let headers = {
    'Content-Type': 'application/json',
    'Cookie': 'sss-authorization=' + access_token
  };

  let body = {
    'post_id': post_uuid
  };

  let request_data = tl.setRequestData(url, method, headers, body);
  let response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  let response_json = await response.json();

  return response;
}