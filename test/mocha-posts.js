'use strict'

import jp from 'jsonpath';
import { strict as assert } from 'assert';
import logger from './helpers/logger.js';
import * as tl from './config/testlab.js';
import * as a from './helpers/testdata/auth.js';
import * as p from './helpers/testdata/posts.js';

describe('Posts-PlatformJS', async function(){

  this.timeout(tl.mocha_timeout); 

  logger.info('Current env is set to: ' + JSON.stringify(tl.current_env));
  logger.info('Selected env user set: ' + JSON.stringify(tl.current_users));
  logger.info("Configured path to images: " + tl.path_data_images);
  logger.info('Mocha timeout is set to: ' + tl.mocha_timeout);

  
  describe('/posts/create', async function(){

    // common case data

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();
    let user_mentioned = jp.query(tl.current_users, '$.user[?(@.id=="0002")]').pop();
    let caption_image = jp.query(tl.current_media, '$.images[?(@.id=="0001")]').pop();
    let media_image = jp.query(tl.current_media, '$.images[?(@.id=="0002")]').pop();
    let product_in_use = jp.query(tl.current_products, '$.ebay[?(@.id=="0001")]').pop();

    let url_path;
    let url;
    let method;
    let headers;

    // auth data

    let response_auth;
    let access_token;

    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      logger.debug('Auth response data (outer): ' + JSON.stringify(response_auth));
      access_token = await a.getAccessToken(response_auth);
      
    });

    describe('sending a request to create a new post to recommend a product', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;
      let post_uuid;
      let users_uuids;
      let product_uuids;
      let json_subset_posts;
      let json_subset_users;
      let json_subset_referenced_user;
      let json_subset_author_user;
      let json_subset_products;
      let json_subset_merchants;
      let json_subset_first_product;

      before(async function() {

        url_path = '/posts/create';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };

        body = {
          'post_type': 'recommendation',
          'caption': [{
            'text': 'Hi @' + user_mentioned.data.username +'  #test hashtag. #weshop'
          }],
          'caption_image': {
            'temp_media_uri': 'images/tmp-image-' + caption_image.uuid
          },
          'media': [
            {
            'media-type': 'image',
            'temp-media-uri': 'images/tmp-image-' + media_image.uuid,
            'product-tags': [{
              'product-id': product_in_use.uuid,
              'position': {
                'x': 0,
                'y': 0
            }
           }]
           }
          ],
          'product_ids': [ product_in_use.uuid ] 
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

        // deriving data subsets for processing

        // posts
        post_uuid = p.getPostsUuids(actual_res_json);
        json_subset_posts = jp.query(actual_res_json, '$..["'+post_uuid+'"]').pop();        
        logger.debug("Posts subset value: " + JSON.stringify(json_subset_posts));
        
        // users
        json_subset_users = p.getUsersJsonSubset(actual_res_json);
        users_uuids = p.getUsersUuids(json_subset_users);
        json_subset_referenced_user = jp.query(json_subset_users, '$..["'+users_uuids[0]+'"]').pop();        
        logger.debug("Users (referenced) subset value: " + JSON.stringify(json_subset_referenced_user));
        json_subset_author_user = jp.query(json_subset_users, '$..["'+users_uuids[users_uuids.length-1]+'"]').pop();        
        logger.debug("Users (submitter) subset value: " + JSON.stringify(json_subset_author_user));

        // products
        json_subset_products = p.getProductsJsonSubset(actual_res_json);
        product_uuids = p.getProductsUuids(json_subset_products);
        json_subset_first_product = jp.query(json_subset_products, '$..["'+product_uuids[0]+'"]').pop();        
        logger.debug("Selected product value: " + JSON.stringify(json_subset_first_product));

        // merchants
        json_subset_merchants = p.getMerchantsJsonSubset(actual_res_json);

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting post-id to be present', async function(){
        logger.debug("Post uuid value: " + post_uuid);
        assert.strictEqual(post_uuid.length, 36);
      });

      it('expecting product-ids to be present in the block "posts"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["product-ids"]').pop();
        logger.debug("Product ids value: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true);
      });

      it('expecting user-id to be present in the block "posts"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["user-id"]').pop();
        logger.debug("User ids value: " + actual_value);
        assert.strictEqual(actual_value.length, 36);
      });

      it('expecting post-type to be present in the block "posts" and be of type "recommendation"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["post-type"]').pop();
        logger.debug("Post type value: " + actual_value);
        assert.strictEqual(actual_value, 'recommendation');
      });

      it('expecting post-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["post-count"]').pop();
        logger.debug("Post count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting post-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["post-count"]').pop();
        logger.debug("Post count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting question-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["question-count"]').pop();
        logger.debug("Question count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting question-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["question-count"]').pop();
        logger.debug("Question count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting recommendation-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["recommendation-count"]').pop();
        logger.debug("Recommendation count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting recommendation-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["recommendation-count"]').pop();
        logger.debug("Recommendation count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting merchant-id to be present in the block "products"', async function(){
        let actual_value = jp.query(json_subset_products, '$..merchant_id').pop();
        logger.debug("Merchants id value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting merchant-name to be present in the block "products"', async function(){
        let actual_value = jp.query(json_subset_products, '$..merchant_name').pop();
        logger.debug("Merchant name value: " + actual_value);
        assert.strictEqual(actual_value.length !== undefined, true);
      });

      it('expecting the same merchant-id to be present in the blocks "products" and "merchants" at the same time', async function(){
        let product_merchant_id = jp.query(json_subset_products, '$..merchant_id').pop();
        let merchant_merchant_id = json_subset_merchants.includes(product_merchant_id);
        logger.debug("Product merchant value: " + product_merchant_id);
        logger.debug("Merchant value from product is present on the list of merchants: " + merchant_merchant_id);
        assert.strictEqual(merchant_merchant_id, true);
      });

    });

  });

  describe('/posts/question/create', async function(){
  
    // common case data
    let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();
    let user_mentioned = jp.query(tl.current_users, '$.user[?(@.id=="0002")]').pop();
    let caption_image = jp.query(tl.current_media, '$.images[?(@.id=="0004")]').pop();
    let media_image = jp.query(tl.current_media, '$.images[?(@.id=="0002")]').pop();
    let product_in_use = jp.query(tl.current_products, '$.ebay[?(@.id=="0001")]').pop();
    //let question_background = jp.query(tl.question_backgrounds, '$.config01').pop();

    let url_path;
    let url;
    let method;
    let headers;

    // auth data
    let response_auth;
    let access_token;

    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      logger.debug('Auth response data (outer): ' + JSON.stringify(response_auth));
      access_token = await a.getAccessToken(response_auth);
  
    });

    describe('sending a request to create a new post to ask a question', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;
      let post_uuid;
      let users_uuids;
      let product_uuids;
      let json_subset_posts;
      let json_subset_users;
      let json_subset_referenced_user;
      let json_subset_author_user;
      let json_subset_products;
      let json_subset_merchants;
      let json_subset_first_product;

      before( async function() {

        url_path = '/posts/question/create';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };

        body = {
          'post_type': 'question',
          'caption': [{
              'text': 'Hi @' + user_mentioned.data.username +' #test hashtag. #weshop'
          }],
          'product_ids': [ product_in_use.uuid ],
          'caption_image': {
            'temp_media_uri': 'images/tmp-image-' + caption_image.uuid
          },
          'question_background': {
            'background_media': {
              'media_type': 'image',
              'temp_media_uri': 'images/tmp-image-' + media_image.uuid,
              'media_id': media_image.uuid
            },
            'font_slug': 'red-hat-text-500',
            'font_size': 2,
            'font_color': '#ffffff'
          },
          'question_text': [{
            'text': 'Lorem ipsum dolor sit amet'
           }] 
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

        // deriving data subsets for processing

        // posts
        post_uuid = p.getPostsUuids(actual_res_json);
        json_subset_posts = jp.query(actual_res_json, '$..["'+post_uuid+'"]').pop();        
        logger.debug("Posts subset value: " + JSON.stringify(json_subset_posts));
        
        // users
        json_subset_users = p.getUsersJsonSubset(actual_res_json);
        users_uuids = p.getUsersUuids(json_subset_users);
        json_subset_referenced_user = jp.query(json_subset_users, '$..["'+users_uuids[0]+'"]').pop();        
        logger.debug("Users (referenced) subset value: " + JSON.stringify(json_subset_referenced_user));
        json_subset_author_user = jp.query(json_subset_users, '$..["'+users_uuids[users_uuids.length-1]+'"]').pop();        
        logger.debug("Users (submitter) subset value: " + JSON.stringify(json_subset_author_user));

        // products
        json_subset_products = p.getProductsJsonSubset(actual_res_json);
        product_uuids = p.getProductsUuids(json_subset_products);
        json_subset_first_product = jp.query(json_subset_products, '$..["'+product_uuids[0]+'"]').pop();        
        logger.debug("Selected product value: " + JSON.stringify(json_subset_first_product));

        // merchants
        json_subset_merchants = p.getMerchantsJsonSubset(actual_res_json);

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting post-id to be present', async function(){
        logger.debug("Post uuid value: " + post_uuid);
        assert.strictEqual(post_uuid.length, 36);
      });

      it('expecting product-ids to be present in the block "posts"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["product-ids"]').pop();
        logger.debug("Product ids value: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true);
      });

      it('expecting user-id to be present in the block "posts"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["user-id"]').pop();
        logger.debug("User ids value: " + actual_value);
        assert.strictEqual(actual_value.length, 36);
      });

      it('expecting post-type to be present in the block "posts" and be of type "question"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["post-type"]').pop();
        logger.debug("Post type value: " + actual_value);
        assert.strictEqual(actual_value, 'question');
      });

      it('expecting post-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["post-count"]').pop();
        logger.debug("Post count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting post-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["post-count"]').pop();
        logger.debug("Post count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting question-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["question-count"]').pop();
        logger.debug("Question count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting question-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["question-count"]').pop();
        logger.debug("Question count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting recommendation-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["recommendation-count"]').pop();
        logger.debug("Recommendation count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting recommendation-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["recommendation-count"]').pop();
        logger.debug("Recommendation count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting merchant-id to be present in the block "products"', async function(){
        let actual_value = jp.query(json_subset_products, '$..merchant_id').pop();
        logger.debug("Merchants id value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting merchant-name to be present in the block "products"', async function(){
        let actual_value = jp.query(json_subset_products, '$..merchant_name').pop();
        logger.debug("Merchant name value: " + actual_value);
        assert.strictEqual(actual_value.length !== undefined, true);
      });

      it('expecting the same merchant-id to be present in the blocks "products" and "merchants" at the same time', async function(){
        let product_merchant_id = jp.query(json_subset_products, '$..merchant_id').pop();
        let merchant_merchant_id = json_subset_merchants.includes(product_merchant_id);
        logger.debug("Product merchant value: " + product_merchant_id);
        logger.debug("Merchant value from product is present on the list of merchants: " + merchant_merchant_id);
        assert.strictEqual(merchant_merchant_id, true);
      });

    });

  });

  describe('/posts/delete', async function(){
  
    let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

    let url_path;
    let url;
    let method;
    let headers;
    let response_auth;
    let access_token;
    let users_posts;
    let post_ids;
    let deleted_reason;

    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      logger.debug('Auth response data (outer): ' + JSON.stringify(response_auth));
      access_token = await a.getAccessToken(response_auth);
  
    });

    describe('Delete recommendation post by passing valid post-id without deleted reason field', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        // preparing auxiliary data
        users_posts = await p.getPostsForAUser(access_token, user.tech.user_id, 'recommendation');
        post_ids = await p.getPostsIdsFromPosts(users_posts);
        const selected_post_id = await p.selectRandomPost(post_ids);
        deleted_reason = 'Lorem ipsum dolor sit amet';

        // performing a call
        url_path = '/posts/delete';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': selected_post_id
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);

        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting success:true be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('Delete question post by passing valid post-id without deleted reason field', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        // preparing auxiliary data
        users_posts = await p.getPostsForAUser(access_token, user.tech.user_id, 'question');
        post_ids = await p.getPostsIdsFromPosts(users_posts);
        const selected_post_id = await p.selectRandomPost(post_ids);
        deleted_reason = 'Lorem ipsum dolor sit amet';

        // performing a call
        url_path = '/posts/delete';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': selected_post_id
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);

        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting success:true be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('Delete post by passing valid post-id with deleted reason field', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        // preparing auxiliary data
        users_posts = await p.getPostsForAUser(access_token, user.tech.user_id, 'recommendation');
        post_ids = await p.getPostsIdsFromPosts(users_posts);
        const selected_post_id = await p.selectRandomPost(post_ids);
        deleted_reason = 'Lorem ipsum dolor sit amet';

        // performing a call
        url_path = '/posts/delete';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': selected_post_id,
          'deleted_reason': deleted_reason
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting success:true be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('Delete post by passing invalid post-id', async function(){
        
      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/delete';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': 'xxxxxxxx-yyyy-zzzz-xxxx-yyyyyyyyyyyy'
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR')
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'post_id must be a valid UUID')
      });

    });

    describe('Delete post by passing an empty post-id', async function(){
        
      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/delete';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': undefined
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR')
      });

      it('expecting expecting an error message "post_id is a required field" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'post_id is a required field')
      });

    });

  });

  describe('/posts/hide', async function(){
  
    // common case data

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

    let url_path;
    let url;
    let method;
    let headers;
    let users_posts;
    let post_ids;

    // authentication-related data

    let response_auth;
    let access_token;

    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      logger.debug('Auth response data (outer): ' + JSON.stringify(response_auth));
      access_token = await a.getAccessToken(response_auth);
  
    });

    describe('Hide recommendation post by passing a valid post-id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        // preparing auxiliary info
        users_posts = await p.getPostsForAUser(access_token, user.tech.user_id, 'recommendation');
        post_ids = await p.getPostsIdsFromPosts(users_posts);
        const selected_post_id = await p.selectRandomPost(post_ids);

        // making a call
        url_path = '/posts/hide';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': selected_post_id
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting success:true be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('Hide question post by passing a valid post-id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        // preparing auxiliary info
        users_posts = await p.getPostsForAUser(access_token, user.tech.user_id, 'question');
        post_ids = await p.getPostsIdsFromPosts(users_posts);
        const selected_post_id = await p.selectRandomPost(post_ids);

        // making a call
        url_path = '/posts/hide';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': selected_post_id
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting success:true be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('Hide post by passing an invalid post-id', async function(){
        
      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/hide';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': 'xxxxxxxx-yyyy-zzzz-xxxx-yyyyyyyyyyyy'
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR')
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'post_id must be a valid UUID')
      });
  
    });

    describe('Hide post by passing an empty post-id', async function(){
        
      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/hide';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': undefined
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR')
      });

      it('expecting expecting an error message "post_id is a required field" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'post_id is a required field')
      });
  
    });

  });

  // this one is no longer in swagger
  xdescribe('/posts/unhide', async function(){

    // common case data

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

    let url_path;
    let url;
    let method;
    let headers;

    // authentication-related data

    let response_auth;
    let access_token;

    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      logger.debug('Auth response data (outer): ' + JSON.stringify(response_auth));
      access_token = await a.getAccessToken(response_auth);
  
    });

    describe('Unhide post by passing valid post-id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let response_headers;
      let response_body;
      let body;
      let request_data;

      before( async function() {

        // preparing aux data
        let users_posts = await p.getPostsForAUser(access_token, user.tech.user_id, 'recommendation');
        let post_ids = await p.getPostsIdsFromPosts(users_posts);
        const selected_post_id = await p.selectRandomPost(post_ids);
        logger.info("Selected post id is (outer): " + JSON.stringify(selected_post_id));
        p.hideSelectedPost(access_token, selected_post_id);

        // making a call
        url_path = '/posts/unhide';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          //'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': selected_post_id
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);

        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is (outer): " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is (check): " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting success:true be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual response value (check): " + `${actual_value}`);
        assert.strictEqual(actual_value, true);
      });

    });

    xdescribe('Unhide post by passing invalid post-id', async function(){
        
      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/unhide';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': 'xxxxxxxx-yyyy-zzzz-xxxx-yyyyyyyyyyyy'
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR')
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'post_id must be a valid UUID')
      });

    });

    xdescribe('Unhide post by passing invalid post-id', async function(){
        
      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/unhide';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_id': undefined
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR')
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'post_id must be a valid UUID')
      });

    });

  });

  describe('/posts/update', async function(){

    // common case data

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();
    let user_mentioned = jp.query(tl.current_users, '$.user[?(@.id=="0003")]').pop();
    let caption_image = jp.query(tl.current_media, '$.images[?(@.id=="0003")]').pop();
    let media_image = jp.query(tl.current_media, '$.images[?(@.id=="0004")]').pop();
    let product_in_use = jp.query(tl.current_products, '$.ebay[?(@.id=="0002")]').pop();

    let url_path;
    let url;
    let method;
    let headers;

    // authentication-related data

    let response_auth;
    let access_token;

    // posts-related data

    let users_posts;
    let post_ids;

    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      logger.debug('Auth response data (outer): ' + JSON.stringify(response_auth));
      access_token = await a.getAccessToken(response_auth);
      
    });

    describe('Update a post of type recommendation by passing valid post-id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;
      let post_uuid;
      let users_uuids;
      let product_uuids;
      let json_subset_posts;
      let json_subset_users;
      let json_subset_referenced_user;
      let json_subset_author_user;
      let json_subset_products;
      let json_subset_merchants;
      let json_subset_first_product;

      before(async function() {

        // preparing aux data
        users_posts = await p.getPostsForAUser(access_token, user.tech.user_id, 'recommendation');
        post_ids = await p.getPostsIdsFromPosts(users_posts);
        const selected_post_id = await p.selectRandomPost(post_ids);

        // making a call
        url_path = '/posts/update';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };

        body = {
          'post_id': selected_post_id,
          'post_type': 'recommendation',
          'caption': [
            {
              'text': 'Updated caption @' + user_mentioned.data.username +' (recommendation) #update #test',
              'user_id': user_mentioned.tech.user_id
            }
          ],
          'media': [
            {
              'media_type': 'image',
              'temp_media_uri': 'images/tmp-image-' + media_image.uuid,
              'product_tags': [
                {
                  'product_id': product_in_use.uuid,
                  'position': {
                    'x': 10,
                    'y': 15
                  }
                }
              ]
            }
          ],
          'product_ids': [
            product_in_use.uuid
          ],
          'caption_image': {
            'temp_media_uri': 'images/tmp-image-' + caption_image.uuid
          }
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

        // deriving data subsets for processing

        // posts
        post_uuid = p.getPostsUuids(actual_res_json);
        json_subset_posts = jp.query(actual_res_json, '$..["'+post_uuid+'"]').pop();        
        logger.debug("Posts subset value: " + JSON.stringify(json_subset_posts));
        
        // users
        json_subset_users = p.getUsersJsonSubset(actual_res_json);
        users_uuids = p.getUsersUuids(json_subset_users);
        json_subset_referenced_user = jp.query(json_subset_users, '$..["'+users_uuids[0]+'"]').pop();        
        logger.debug("Users (referenced) subset value: " + JSON.stringify(json_subset_referenced_user));
        json_subset_author_user = jp.query(json_subset_users, '$..["'+users_uuids[users_uuids.length-1]+'"]').pop();        
        logger.debug("Users (submitter) subset value: " + JSON.stringify(json_subset_author_user));

        // products
        json_subset_products = p.getProductsJsonSubset(actual_res_json);
        product_uuids = p.getProductsUuids(json_subset_products);
        json_subset_first_product = jp.query(json_subset_products, '$..["'+product_uuids[0]+'"]').pop();        
        logger.debug("Selected product value: " + JSON.stringify(json_subset_first_product));

        // merchants
        json_subset_merchants = p.getMerchantsJsonSubset(actual_res_json);

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting post-id to be present', async function(){
        logger.debug("Post uuid value: " + post_uuid);
        assert.strictEqual(post_uuid.length, 36);
      });

      it('expecting product-ids to be present in the block "posts"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["product-ids"]').pop();
        logger.debug("Product ids value: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true);
      });

      it('expecting user-id to be present in the block "posts"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["user-id"]').pop();
        logger.debug("User ids value: " + actual_value);
        assert.strictEqual(actual_value.length, 36);
      });

      it('expecting post-type to be present in the block "posts" and be of type "recommendation"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["post-type"]').pop();
        logger.debug("Post type value: " + actual_value);
        assert.strictEqual(actual_value, 'recommendation');
      });

      it('expecting post-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["post-count"]').pop();
        logger.debug("Post count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting post-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["post-count"]').pop();
        logger.debug("Post count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting question-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["question-count"]').pop();
        logger.debug("Question count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting question-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["question-count"]').pop();
        logger.debug("Question count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting recommendation-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["recommendation-count"]').pop();
        logger.debug("Recommendation count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting recommendation-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["recommendation-count"]').pop();
        logger.debug("Recommendation count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting merchant-id to be present in the block "products"', async function(){
        let actual_value = jp.query(json_subset_products, '$..merchant_id').pop();
        logger.debug("Merchants id value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting merchant-name to be present in the block "products"', async function(){
        let actual_value = jp.query(json_subset_products, '$..merchant_name').pop();
        logger.debug("Merchant name value: " + actual_value);
        assert.strictEqual(actual_value.length !== undefined, true);
      });

      it('expecting the same merchant-id to be present in the blocks "products" and "merchants" at the same time', async function(){
        let product_merchant_id = jp.query(json_subset_products, '$..merchant_id').pop();
        let merchant_merchant_id = json_subset_merchants.includes(product_merchant_id);
        logger.debug("Product merchant value: " + product_merchant_id);
        logger.debug("Merchant value from product is present on the list of merchants: " + merchant_merchant_id);
        assert.strictEqual(merchant_merchant_id, true);
      });

    });

    describe('Update a post of type question by passing valid post-id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;
      let post_uuid;
      let users_uuids;
      let product_uuids;
      let json_subset_posts;
      let json_subset_users;
      let json_subset_referenced_user;
      let json_subset_author_user;
      let json_subset_products;
      let json_subset_merchants;
      let json_subset_first_product;

      before(async function() {

        // preparing aux data
        users_posts = await p.getPostsForAUser(access_token, user.tech.user_id, 'question');
        post_ids = await p.getPostsIdsFromPosts(users_posts);
        const selected_post_id = await p.selectRandomPost(post_ids);

        // making a call
        url_path = '/posts/update';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };

        body = {
          'post_id': selected_post_id,
          'post_type': 'question',
          'caption': [{
              'text': 'Updated caption @' + user_mentioned.data.username +' (question) #test #update'
          }],
          'product_ids': [ product_in_use.uuid ],
          'caption_image': {
            'temp_media_uri': 'images/tmp-image-' + caption_image.uuid
          },
          'question_background': {
            'background_media': {
              'media_type': 'image',
              'temp_media_uri': 'images/tmp-image-' + media_image.uuid,
              'media_id': media_image.uuid
            },
            'font_slug': 'libre-baskerville-700',
            'font_size': 5,
            'font_color': '#fec873'
          },
          'question_text': [{
            'text': 'Excepteur sint occaecat cupidatat non proident'
           }] 
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

        // deriving data subsets for processing

        // posts
        post_uuid = p.getPostsUuids(actual_res_json);
        json_subset_posts = jp.query(actual_res_json, '$..["'+post_uuid+'"]').pop();        
        logger.debug("Posts subset value: " + JSON.stringify(json_subset_posts));
        
        // users
        json_subset_users = p.getUsersJsonSubset(actual_res_json);
        users_uuids = p.getUsersUuids(json_subset_users);
        json_subset_referenced_user = jp.query(json_subset_users, '$..["'+users_uuids[0]+'"]').pop();        
        logger.debug("Users (referenced) subset value: " + JSON.stringify(json_subset_referenced_user));
        json_subset_author_user = jp.query(json_subset_users, '$..["'+users_uuids[users_uuids.length-1]+'"]').pop();        
        logger.debug("Users (submitter) subset value: " + JSON.stringify(json_subset_author_user));

        // products
        json_subset_products = p.getProductsJsonSubset(actual_res_json);
        product_uuids = p.getProductsUuids(json_subset_products);
        json_subset_first_product = jp.query(json_subset_products, '$..["'+product_uuids[0]+'"]').pop();        
        logger.debug("Selected product value: " + JSON.stringify(json_subset_first_product));

        // merchants
        json_subset_merchants = p.getMerchantsJsonSubset(actual_res_json);

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      // add check for getting exactly the required id
      it('expecting post-id to be present', async function(){
        logger.debug("Post uuid value: " + post_uuid);
        assert.strictEqual(post_uuid.length, 36);
      });

      it('expecting product-ids to be present in the block "posts"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["product-ids"]').pop();
        logger.debug("Product ids value: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true);
      });

      it('expecting user-id to be present in the block "posts"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["user-id"]').pop();
        logger.debug("User ids value: " + actual_value);
        assert.strictEqual(actual_value.length, 36);
      });

      it('expecting post-type to be present in the block "posts" and be of type "question"', async function(){
        let actual_value = jp.query(json_subset_posts, '$..["post-type"]').pop();
        logger.debug("Post type value: " + actual_value);
        assert.strictEqual(actual_value, 'question');
      });

      it('expecting post-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["post-count"]').pop();
        logger.debug("Post count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting post-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["post-count"]').pop();
        logger.debug("Post count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting question-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["question-count"]').pop();
        logger.debug("Question count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting question-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["question-count"]').pop();
        logger.debug("Question count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting recommendation-count for the referenced user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_referenced_user, '$..["recommendation-count"]').pop();
        logger.debug("Recommendation count for the referenced value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting recommendation-count for the submitter user to be present in the block "users"', async function(){
        let actual_value = jp.query(json_subset_author_user, '$..["recommendation-count"]').pop();
        logger.debug("Recommendation count for the submitter value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting merchant-id to be present in the block "products"', async function(){
        let actual_value = jp.query(json_subset_products, '$..merchant_id').pop();
        logger.debug("Merchants id value: " + actual_value);
        assert.strictEqual(actual_value !== undefined, true);
      });

      it('expecting merchant-name to be present in the block "products"', async function(){
        let actual_value = jp.query(json_subset_products, '$..merchant_name').pop();
        logger.debug("Merchant name value: " + actual_value);
        assert.strictEqual(actual_value.length !== undefined, true);
      });

      it('expecting the same merchant-id to be present in the blocks "products" and "merchants" at the same time', async function(){
        let product_merchant_id = jp.query(json_subset_products, '$..merchant_id').pop();
        let merchant_merchant_id = json_subset_merchants.includes(product_merchant_id);
        logger.debug("Product merchant value: " + product_merchant_id);
        logger.debug("Merchant value from product is present on the list of merchants: " + merchant_merchant_id);
        assert.strictEqual(merchant_merchant_id, true);
      });

    });

    describe('Update post by passing invalid post-id', async function(){
      
      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        // making a call
        url_path = '/posts/update';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };

        body = {
          'post_id': 'xxxxxxxx-yyyy-zzzz-xxxx-yyyyyyyyyyyy',
          'post_type': 'question',
          'caption': [{
              'text': 'Updated caption @' + user_mentioned.data.username +' (question) #test #update'
          }],
          'product_ids': [ product_in_use.uuid ],
          'caption_image': {
            'temp_media_uri': 'images/tmp-image-' + caption_image.uuid
          },
          'question_background': {
            'background_media': {
              'media_type': 'image',
              'temp_media_uri': 'images/tmp-image-' + media_image.uuid,
              'media_id': media_image.uuid
            },
            'font_slug': 'libre-baskerville-700',
            'font_size': 10,
            'font_color': '#fec873'
          },
          'question_text': [{
            'text': 'Excepteur sint occaecat cupidatat non proident'
           }] 
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR');
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'post_id must be a valid UUID');
      });

    });

    describe('Update post by passing an empty post-id', async function(){
      
      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        // making a call
        url_path = '/posts/update';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };

        body = {
          'post_id': undefined,
          'post_type': 'question',
          'caption': [{
              'text': 'Updated caption @' + user_mentioned.data.username +' (question) #test #update'
          }],
          'product_ids': [ product_in_use.uuid ],
          'caption_image': {
            'temp_media_uri': 'images/tmp-image-' + caption_image.uuid
          },
          'question_background': {
            'background_media': {
              'media_type': 'image',
              'temp_media_uri': 'images/tmp-image-' + media_image.uuid,
              'media_id': media_image.uuid
            },
            'font_slug': 'libre-baskerville-700',
            'font_size': 10,
            'font_color': '#fec873'
          },
          'question_text': [{
            'text': 'Excepteur sint occaecat cupidatat non proident'
           }] 
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR');
      });

      it('expecting expecting an error message "post_id is a required field" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'post_id is a required field');
      });

    });

  });

  describe('/posts/post-editor/question-background-params', async function(){
    
    // common case data

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

    let url_path;
    let url;
    let method;
    let headers;

    // authentication-related data

    let response_auth;
    let access_token;

    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      logger.debug('Auth response data (outer): ' + JSON.stringify(response_auth));
      access_token = await a.getAccessToken(response_auth);
      
    });

    describe('Get question background params', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;
      let json_subset_fonts;
      let font_names;

      before( async function() {

        url_path = '/posts/post-editor/question-background-params';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

        // fonts
        json_subset_fonts = p.getFontNamesJsonSubset(actual_res_json);
        font_names = p.getFontNames(json_subset_fonts);

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting list of fonts to be present', async function(){
        logger.debug("Actual response value (check): " + font_names);
        assert.strictEqual(font_names.length > 0, true);
      });

      it('expecting minimal size of a font to be present and equal to "1"', async function(){
        let actual_value = jp.query(actual_res_json, '$["font-min-size"]').pop();
        logger.debug("Actual response value (check): " + actual_value);
        assert.strictEqual(actual_value, 1);        
      });

      it('expecting maximal size of a font to be present and equal to "5"', async function(){
        let actual_value = jp.query(actual_res_json, '$["font-max-size"]').pop();
        logger.debug("Actual response value (check): " + actual_value);
        assert.strictEqual(actual_value, 5);
      });

      it('expecting list of font colours to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["font-colors"]').pop();
        logger.debug("Actual response value (check): " + actual_value);
        assert.strictEqual(actual_value.length > 0, true);
      });

      it('expecting stock background media to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["stock-background-media"]').pop();
        logger.debug("Actual response value (check): " + JSON.stringify(actual_value));
        assert.strictEqual(actual_value.length > 0, true);
      });

    });

  });

  describe('/posts/list', async function(){

    // common case data
    let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();
  
    let url_path;
    let url;
    let method;
    let headers;

    // authentication-related data
    let response_auth;
    let access_token;

    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      access_token = await a.getAccessToken(response_auth);
  
    });
  
    describe('sending a request to get recommendation posts list by passing a valid user id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/list';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          "ids": {
            "user_ids": [
              user.tech.user_id
            ]
          },
          "facets": [
            "interaction-counts"
          ],
          "type": "recommendation",
          "joins": {
            "users": {
                "facets": ["current-user-follows"]
            }
          },
          "query": {
            "limit": tl.current_test_data.posts.query.limit
          }
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting posts count to be equal to the limit set', async function(){
        let actual_value = jp.query(actual_res_json, '$..posts[*].post_id');
        logger.debug("Actual value: " + JSON.stringify(actual_value));
        assert.strictEqual(actual_value.length <= tl.current_test_data.posts.query.limit, true)
      });

      it('expecting posts count to be equal to the limit set', async function(){
        let actual_value = jp.query(actual_res_json, '$..posts[*].post_id');
        logger.debug("Actual value (length): " + JSON.stringify(actual_value.length));
        assert.strictEqual(actual_value.length <= tl.current_test_data.posts.query.limit, true)
      });

    });

    describe('sending a request to get question posts list by passing a valid user id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/list';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          "ids": {
            "user_ids": [
              user.tech.user_id
            ]
          },
          "facets": [
            "interaction-counts"
          ],
          "type": "question",
          "joins": {
            "users": {
                "facets": ["current-user-follows"]
            }
          },
          "query": {
            "limit": tl.current_test_data.posts.query.limit
          }
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting posts count to be equal to the limit set', async function(){
        let actual_value = jp.query(actual_res_json, '$..posts[*].post_id');
        logger.debug("Actual value: " + JSON.stringify(actual_value));
        assert.strictEqual(actual_value.length <= tl.current_test_data.posts.query.limit, true)
      });

      it('expecting posts count to be equal to the limit set', async function(){
        let actual_value = jp.query(actual_res_json, '$..posts[*].post_id');
        logger.debug("Actual value (length): " + JSON.stringify(actual_value.length));
        assert.strictEqual(actual_value.length <= tl.current_test_data.posts.query.limit, true)
      });

    });

    describe('sending a request to get posts list by passing an invalid user id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

      before( async function() {

        url_path = '/posts/list';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'ids': {
            'user_ids': [
              'xxxxxxxx-yyyy-zzzz-xxxx-yyyyyyyyyyyy'
            ]
          },
          'facets': [
            'interaction-counts'
          ],
          'type': 'recommendation',
          'joins': {
            'users': {
                'facets': ['current-user-follows']
            }
          },
          'query': {
            'limit': tl.current_test_data.posts.query.limit
          }
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR');
      });

      it('expecting expecting an error message "ids.user_ids[0] must be a valid UUID"', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'ids.user_ids[0] must be a valid UUID');
      });

    });

  });

  describe('/posts/get-by-ids', async function(){

    // common case data

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

    let url_path;
    let url;
    let method;
    let headers;

    // authentication-related data

    let response_auth;
    let access_token;
  
    before( async function() {

      response_auth = await a.loginWithEmailAndPassword(user.data.email, user.data.password);
      access_token = await a.getAccessToken(response_auth);
  
    });

    describe('Get specific post by passing valid post-id', async function(){

      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;
      let json_subset_posts;

      before( async function() {

        url_path = '/posts/get-by-ids';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        method = 'post';

        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + access_token
        };
  
        body = {
          'post_ids': [
            '477c0d10-4ad7-4dc1-8fe2-943c192f385b',
            '6d8544d1-9b4a-4f26-922e-76a2527e914e',
            '9a10ee8f-66e9-4224-a261-7a568ee0c48a'
          ],
          'merchants': true
        }
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        // using text() to get to a stubborn non-json error
        //actual_res_text = await response.text();
        //logger.info("Response is (outer): " + actual_res_text);
        actual_res_json = await response.json();
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      after( async function() {
  
      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting the number or posts received to be equal to the number of posts requested"', async function(){
        json_subset_posts = Object.values(jp.query(actual_res_json, '$..posts').pop());
        logger.debug("Posts uuid values: " + JSON.stringify(json_subset_posts));
        assert.strictEqual(json_subset_posts.length, 3);
      });

    });

    describe('Get specific post by passing a non-existent post-id', async function(){
        
      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

        before( async function() {

          url_path = '/posts/get-by-ids';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
          method = 'post';

          headers = {
            'Content-Type': 'application/json',
            'Cookie': 'sss-authorization=' + access_token
          };
    
          body = {
            'post_ids': [
              'xxxxxxxx-yyyy-zzzz-xxxx-yyyyyyyyyyyy'
            ],
            'merchants': true
          };
    
          request_data = tl.setRequestData(url, method, headers, body);
  
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data: ' + JSON.stringify(request_data));
  
          response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
          
          // using text() to get to a stubborn non-json error
          //actual_res_text = await response.text();
          //logger.info("Response is (outer): " + actual_res_text);
          actual_res_json = await response.json();
          logger.info("Response is: " + JSON.stringify(actual_res_json));

        });

        after( async function() {
    
        });

        it('expecting request status to be 400', async function(){
          let actual_res_status = await response.status;
          logger.info("Response status is: " + JSON.stringify(actual_res_status));
          assert.strictEqual(actual_res_status, 400);
        });
  
        it('expecting code:VALIDATION_ERROR', async function(){
          let actual_value = jp.query(actual_res_json, '$.code').pop();
          logger.debug("Actual response value: " + actual_value);
          assert.strictEqual(actual_value, 'VALIDATION_ERROR');
        });
  
        // this one has a very long response message
        xit('expecting expecting an error message "<TBC>"', async function(){
          let actual_value = jp.query(actual_res_json, '$.message').pop();
          logger.debug("Actual response value: " + actual_value);
          assert.strictEqual(actual_value, '<TBC>');
        });
  
    });

    describe('Get specific post by passing an empty post-id', async function(){
        
      let response;
      let actual_res_json;
      let actual_res_text;
      let body;
      let request_data;

        before( async function() {

          url_path = '/posts/get-by-ids';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
          method = 'post';

          headers = {
            'Content-Type': 'application/json',
            'Cookie': 'sss-authorization=' + access_token
          };
    
          body = {
            'post_ids': [
              undefined
            ],
            'merchants': true
          }
    
          request_data = tl.setRequestData(url, method, headers, body);
  
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data: ' + JSON.stringify(request_data));
  
          response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
          
          // using text() to get to a stubborn non-json error
          //actual_res_text = await response.text();
          //logger.info("Response is (outer): " + actual_res_text);
          actual_res_json = await response.json();
          logger.info("Response is: " + JSON.stringify(actual_res_json));

        });

        after( async function() {
    
        });

        it('expecting request status to be 400', async function(){
          let actual_res_status = await response.status;
          logger.info("Response status is: " + JSON.stringify(actual_res_status));
          assert.strictEqual(actual_res_status, 400);
        });
  
        it('expecting code:VALIDATION_ERROR', async function(){
          let actual_value = jp.query(actual_res_json, '$.code').pop();
          logger.debug("Actual response value: " + actual_value);
          assert.strictEqual(actual_value, 'VALIDATION_ERROR');
        });
  
        // this one has a very long response message
        xit('expecting expecting an error message "<TBC>" to be present', async function(){
          let actual_value = jp.query(actual_res_json, '$.message').pop();
          logger.debug("Actual response value: " + actual_value);
          assert.strictEqual(actual_value, '<TBC>')
        });
  
    });

  });

});