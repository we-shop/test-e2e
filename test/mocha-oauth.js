'use strict'

import jp from 'jsonpath';
import { strict as assert } from 'assert';
import logger from './helpers/logger.js'
import * as tl from './config/testlab.js'
import { generateUserData } from './helpers/generators.js'

describe('Authentication-PlatformJS', async function(){

  this.timeout(tl.mocha_timeout); 

  logger.info('Current env is set to: ' + JSON.stringify(tl.current_env));
  logger.info('Selected env user set: ' + JSON.stringify(tl.current_users));
  logger.info('Mocha timeout is set to: ' + tl.mocha_timeout);

  describe('/oauth/signin', async function(){

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();
  
    let url_path = '/oauth/signin';
    let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'
    };

    describe('sending a request with valid credentials (email)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
  
      before( async function() {

        body = {
          'email': user.data.email,
          'password': user.data.password
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting access token to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["access-token"]').pop();
        logger.debug("Access token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting refresh token to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["refresh-token"]').pop();
        logger.debug("Refresh token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting expiration date to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["access-token-expires-at"]').pop();
        logger.debug("Expiration date: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting user id to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["user-id"]').pop();
        logger.debug("User id: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });

    });

    describe('sending a request with valid credentials (username)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
  
      before( async function() {

        body = {
          'email': user.data.username,
          'password': user.data.password
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting access token to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["access-token"]').pop();
        logger.debug("Access token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting refresh token to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["refresh-token"]').pop();
        logger.debug("Refresh token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting expiration date to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["access-token-expires-at"]').pop();
        logger.debug("Expiration date: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting user id to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["user-id"]').pop();
        logger.debug("User id: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });

    });

    describe('sending a request with an incorrect username and correct password', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      
      before( async function() {

        body = {
          'username': 'gibberish',
          'password': user.data.password
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

      it('expecting request status to be 404', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 404);
      });
    
      it('expecting an error code "USER_NOT_FOUND" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'USER_NOT_FOUND');
      });

      it('expecting an error message "No matching user" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'No matching user');
      });

    });

    describe('sending a request with an incorrect email and correct password', async function(){
      
      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        body = {
          'email': 'gibberish@gibberish.co.uk',
          'password': user.data.password
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

      it('expecting request status to be 404', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 404);
      });
    
      it('expecting an error code "USER_NOT_FOUND" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'USER_NOT_FOUND');
      });

      it('expecting an error message "No matching user" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'No matching user');
      });

    });

    describe('sending a request with correct username and wrong password', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
    
      before( async function() {

        body = {
          'username': user.data.username,
          'password': 'wrongpassword'
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

      it('expecting request status to be 401', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 401);
      });
    
      it('expecting an error code "AUTHORIZATION_ERROR" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'AUTHORIZATION_ERROR');
      });

      it('expecting an error message "Username and/or password are incorrect" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'Username and/or password are incorrect');
      });

    });

    describe('sending a request with correct email and wrong password', async function(){
    
      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        body = {
          'email': user.data.email,
          'password': 'wrongpassword'
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

      it('expecting request status to be 401', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 401);
      });
    
      it('expecting an error code "AUTHORIZATION_ERROR" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'AUTHORIZATION_ERROR');
      });

      it('expecting an error message "Username and/or password are incorrect" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'Username and/or password are incorrect');
      });

    });

  });

  describe('/oauth/registration', async function(){
    /**
     * business case: what is it for? login (why birthday then)? creating an account?
     * is light registration a precondition ?
     * what are mandatory fields? fname, lname, email, password or token, birth date? (based on webapp.next)
     * 
     */

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

    let url_path = '/oauth/registration';
    let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'
    };

    describe('sending a request with with a password', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      let case_spec_userdata = generateUserData();

      before( async function() {

        body = {
          'first_name': user.data.fname,
          'last_name': user.data.lname,
          'email': case_spec_userdata.email,
          'username': case_spec_userdata.username,
          'password': case_spec_userdata.password,
          'gender': user.data.gender,
          'date_of_birth': user.data.date_of_birth,
          'user_agreement': user.config.user_agreement,
          'adult': user.config.adult,
          'allow_marketing_emails': user.config.allow_marketing_emails
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        actual_res_json = await response.json();
  
        logger.info('Response is: ' + JSON.stringify(actual_res_json));
  
      });
  
      after( async function() {
      });
  
      it('expecting request status to be 401', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 401);
      });

      it('expecting an error code "USER_IN_WAITING_LIST" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'USER_IN_WAITING_LIST');
      });

      it('expecting an error message "You’re on the waiting list!" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'You’re on the waiting list!');
      });

      // switched off since sign up is off
      /*
      it('expecting access token to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$["access-token"]').pop();
        logger.debug("Access token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting refresh token to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$["refresh-token"]').pop();
        logger.debug("Refresh token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting expiration date to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$["access-token-expires-at"]').pop();
        logger.debug("Expiration date: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting user id to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$["user-id"]').pop();
        logger.debug("User id: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      */

    });

    xdescribe('sending a request with with a valid oauth_temp_token', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      let case_spec_userdata = generateUserData();

      before( async function() {

        body = {
          'first_name': user.data.fname,
          'last_name': user.data.lname,
          'email': case_spec_userdata.email,
          'username': case_spec_userdata.username,
          'gender': user.data.gender,
          'date_of_birth': user.data.date_of_birth,
          'user_agreement': user.config.user_agreement,
          'adult': user.config.adult,
          'allow_marketing_emails': user.config.allow_marketing_emails,
          'oauth_temp_token': '<VALID TOKEN>'
        };
  
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        actual_res_json = await response.json();
  
        logger.info('Response is: ' + JSON.stringify(actual_res_json));
  
      });
  
      after( async function() {
      });
  
      it('expecting request status to be 401', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 401);
      });

      it('expecting an error code "USER_IN_WAITING_LIST" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'USER_IN_WAITING_LIST');
      });

      it('expecting an error message "You’re on the waiting list!" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'You’re on the waiting list!');
      });

    });

    describe('sending a request with with an invalid oauth_temp_token', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      let case_spec_userdata = generateUserData();

      before( async function() {

        body = {
          'first_name': user.data.fname,
          'last_name': user.data.lname,
          'email': case_spec_userdata.email,
          'username': case_spec_userdata.username,
          'gender': user.data.gender,
          'date_of_birth': user.data.date_of_birth,
          'user_agreement': user.config.user_agreement,
          'adult': user.config.adult,
          'allow_marketing_emails': user.config.allow_marketing_emails,
          'oauth_temp_token': 'invalidtoken'
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        actual_res_json = await response.json();
  
        logger.info('Response is: ' + JSON.stringify(actual_res_json));
  
      });
  
      after( async function() {
      });
  
      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting an error code "REGISTER_VALIDATION" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'REGISTER_VALIDATION');
      });

      it('expecting an error message "Invalid social network data" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'Invalid social network data');
      });

    });

    describe('sending a request with registration data (username and password) matching that of an existing user', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      
      before( async function() {

        body = {
          'first_name': user.data.fname,
          'last_name': user.data.lname,
          'email': user.data.email,
          'username': user.data.username,
          'password': user.data.password,
          'gender': user.data.gender,
          'date_of_birth': user.data.date_of_birth,
          'user_agreement': user.config.user_agreement,
          'adult': user.config.adult,
          'allow_marketing_emails': user.config.allow_marketing_emails
        };
  
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        actual_res_json = await response.json();
  
        logger.info('Response is: ' + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting an error code "USERNAME_EXISTS" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'USERNAME_EXISTS');
      });

      it('expecting an error message "Username already exists" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'Username already exists');
      });

    });

    xdescribe('sending a request with registration data (username and oauth_temp_token) matching that of an existing user', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      
      before( async function() {

        body = {
          'first_name': user.data.fname,
          'last_name': user.data.lname,
          'email': user.data.email,
          'username': user.data.username,
          'gender': user.data.gender,
          'date_of_birth': user.data.date_of_birth,
          'user_agreement': user.config.user_agreement,
          'adult': user.config.adult,
          'allow_marketing_emails': user.config.allow_marketing_emails,
          'oauth_temp_token': 'string'
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));        
        logger.info('Request data' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        actual_res_json = await response.json();
  
        logger.info('Response is: ' + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be <XXX>', async function(){
      });

      it('expecting an error code <CODE> to be present', async function(){  
      });

      it('expecting an error message <MESSAGE> to be present', async function(){
      });

    });

  });

  describe('/oauth/light-registration', async function(){

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();
    
    let url_path = '/oauth/light-registration';
    let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'
    };

    xdescribe('sending a request with an email that have never been used before', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      let case_spec_userdata = generateUserData();
      
      before( async function() {

        body = {
          'email': case_spec_userdata.email,
          'redirectUrl': user.config.redirectUrl
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        actual_res_json = await response.json();
  
        logger.info('Response is: ' + JSON.stringify(actual_res_json));
        
      }); 
  
      after( async function() {
        
      });

      it('expecting request status to be 401', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 401);
      });

      it('expecting an error code "USER_IN_WAITING_LIST" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'USER_IN_WAITING_LIST');
      });

      it('expecting an error message "You’re on the waiting list!" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'You’re on the waiting list!');
      });
  
      // swithced off since signing up is off
      /*
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });
  
      it('expecting registration to be successful', async function(){
        let actual_value = await jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value == 'true', true)
      });
  
      it('expecting token value to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$.token').pop();
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
  
      it('expecting user id to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$.user_id').pop();
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true) 
      });
      */

    });

    xdescribe('sending a request with an email that has already been used', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      
      before( async function() {

        body = {
          'email': user.data.email,
          'redirectUrl': user.config.redirectUrl
        };
  
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));          
        
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

      it('expecting an error code "USERNAME_EXISTS" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'USERNAME_EXISTS');
      });

      it('expecting an error message "Username already exists" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'Username already exists');
      });

    });

    xdescribe('sending a request with an invalid string instead of an email', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      
      before( async function() {

        body = {
          'email': 'gibberish',
          'redirectUrl': user.config.redirectUrl
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));          
        
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();
        
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be XXX', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, XXX);
      });

      it('expecting an error code "<CODE>" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, '<CODE>');
      });

      it('expecting an error message "<MESSAGE>" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, '<MESSAGE>');
      });

    });

    xdescribe('sending a request with an empty string instead of an email', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;
      
      before( async function() {

        body = {
          'email': undefined,
          'redirectUrl': user.config.redirectUrl
        };
  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));          
        
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();
        
        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be XXX', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, XXX);
      });

      it('expecting an error code "<CODE>" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, '<CODE>');
      });

      it('expecting an error message "<MESSAGE>" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, '<MESSAGE>');
      });

    });

  });

  describe('/oauth/full-registration', async function(){
    /**
    * fails with auth problem, not sure what's the reason
    */

    let authorization;
    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'
    };

    xdescribe('sending a request with registration data of a new user', async function(){
    
      let response;
      let actual_res_json;
      let response_precondition;
      let response_precondition_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();
      
      before( async function() {

        // preparing first request with initial registration data
        
        body = {
          'email': case_spec_userdata.email,
          'redirectUrl': user.config.redirectUrl
        };
  
        url_path = '/oauth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data for the precondition request: ' + JSON.stringify(request_data));
  
        response_precondition = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        response_precondition_json = await response_precondition.json();
  
        logger.info('Precondition response: ' + JSON.stringify(response_precondition_json));
        logger.debug('Precondition response headers are: ' + JSON.stringify(response_precondition.headers.raw()));
        logger.debug('Precondition response header set-cookie ' +JSON.stringify(response_precondition.headers.get('set-cookie')));
        logger.debug('Precondition response access token is: ' +  JSON.stringify(jp.query(response_precondition_json, '$["access-token"]')));
        

        // preparing second request using data from the first request

        authorization = jp.query(response_precondition_json, '$["access-token"]').pop();
        url_path = '/oauth/full-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + authorization
          };
        body = {
          'username': case_spec_userdata.username,
          'first_name': user.data.fname,
          'last_name': user.data.lname,
          'adult': user.config.adult,
          'gender': user.data.gender,
          'date_of_birth': user.data.date_of_birth,
          'password': case_spec_userdata.password,
          'allow_marketing_emails': user.config.allow_marketing_emails,
          'email': case_spec_userdata.email,
          'user_agreement': user.config.user_agreement,
          'founder_username': user.config.founder_username
        };
  
        request_data = tl.setRequestData(url, method, headers, body);
    
        logger.info('Request data: ' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
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

      it('expecting access token to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["access-token"]').pop();
        logger.debug("Access token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting refresh token to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["refresh-token"]').pop();
        logger.debug("Refresh token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting expiration date to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["access-token-expires-at"]').pop();
        logger.debug("Expiration date: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting user id to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["user-id"]').pop();
        logger.debug("User id: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });

    });

    describe('sending a request with registration data of an existing user', async function(){

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let response;
      let actual_res_json;
      let response_precondition;
      let response_precondition_json;
      let body;
      let request_data;
    
      before( async function() {

        // preparing first request with initial registration data
        
        body = {
          'email': user.data.email,
          'password': user.data.password
        };
  
        url_path = '/oauth/signin';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data for the precondition request: ' + JSON.stringify(request_data));
  
        response_precondition = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        response_precondition_json = await response_precondition.json();
  
        logger.info('Precondition response: ' + JSON.stringify(response_precondition_json));
        logger.debug('Precondition response headers are: ' + JSON.stringify(response_precondition.headers.raw()));
        logger.debug('Precondition response header set-cookie ' +JSON.stringify(response_precondition.headers.get('set-cookie')));
        logger.debug('Precondition response access token is: ' +  JSON.stringify(jp.query(response_precondition_json, '$["access-token"]')));
        

        // preparing second request using data from the first request

        authorization = jp.query(response_precondition_json, '$["access-token"]').pop();
        url_path = '/oauth/full-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + authorization
        };
        body = {
          'username': user.data.username,
          'first_name': user.data.fname,
          'last_name': user.data.lname,
          'adult': user.config.adult,
          'gender': user.data.gender,
          'date_of_birth': user.data.date_of_birth,
          'password': user.data.password,
          'allow_marketing_emails': user.config.allow_marketing_emails,
          'email': user.data.email,
          'user_agreement': user.config.user_agreement,
          'founder_username': user.config.founder_username
        };
  
        request_data = tl.setRequestData(url, method, headers, body);
    
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
    
      it('expecting an error code "USER_ALREADY_REGISTERED" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'USER_ALREADY_REGISTERED');
      });

      it('expecting an error message "User already registered" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'User already registered');
      });

    });

    xdescribe('sending a request with invalid registration data (username)', async function(){

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let response;
      let actual_res_json;
      let response_precondition;
      let response_precondition_json;
      let body;
      let request_data;

      let case_spec_userdata = generateUserData();
    
      before( async function() {

        // preparing first request with initial registration data
        
        body = {
          'email': 'gibberish',
          'redirectUrl': user.config.redirectUrl
        };
  
        url_path = '/oauth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data for the precondition request: ' + JSON.stringify(request_data));
  
        response_precondition = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        response_precondition_json = await response_precondition.json();
  
        logger.info('Precondition response: ' + JSON.stringify(response_precondition_json));
        logger.debug('Precondition response headers are: ' + JSON.stringify(response_precondition.headers.raw()));
        logger.debug('Precondition response header set-cookie ' +JSON.stringify(response_precondition.headers.get('set-cookie')));
        logger.debug('Precondition response access token is: ' +  JSON.stringify(jp.query(response_precondition_json, '$["access-token"]')));
        

        // preparing second request using data from the first request

        authorization = jp.query(response_precondition_json, '$["access-token"]').pop();
        url_path = '/oauth/full-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        headers = {
          'Content-Type': 'application/json',
          'Cookie': 'sss-authorization=' + authorization
        };
        body = {
          'username': case_spec_userdata.username,
          'first_name': user.data.fname,
          'last_name': user.data.lname,
          'adult': user.config.adult,
          'gender': user.data.gender,
          'date_of_birth': user.data.date_of_birth,
          'password': case_spec_userdata.password,
          'allow_marketing_emails': user.config.allow_marketing_emails,
          'email': case_spec_userdata.email,
          'user_agreement': user.config.user_agreement,
          'founder_username': user.config.founder_username
        };
  
        request_data = tl.setRequestData(url, method, headers, body);
    
        logger.info('Request data: ' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
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

      it('expecting access token to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["access-token"]').pop();
        logger.debug("Access token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting refresh token to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["refresh-token"]').pop();
        logger.debug("Refresh token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting expiration date to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["access-token-expires-at"]').pop();
        logger.debug("Expiration date: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting user id to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$["user-id"]').pop();
        logger.debug("User id: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });

    });
    
  });

  describe('/oauth/refresh-token', async function(){

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'
    };
    let body;

    describe('sending a request with a valid token', async function(){

      let response_precondition;
      let response_precondition_json;
      let response;
      let actual_res_json;
      let request_data;
      let refresh_token;
  
      before( async function() {

        // preparing first request

        body = {
          'email': user.data.email,
          'password': user.data.password
        };

        url_path = '/oauth/signin';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
      
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data for the precondition request: ' + JSON.stringify(request_data));
  
        response_precondition = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        response_precondition_json = await response_precondition.json();
  
        logger.info('Precondition response: ' + JSON.stringify(response_precondition_json));
        logger.debug('Precondition response refresh token is: ' +  JSON.stringify(jp.query(response_precondition_json, '$["refresh-token"]')));
  
        // preparing second request

        refresh_token = jp.query(response_precondition_json, '$["refresh-token"]');
        url_path = '/oauth/refresh-token';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        body = {
          'refresh_token': refresh_token
        };
  
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.info('Request data for the main request: ' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
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
  
      it('expecting access token to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$["access-token"]').pop();
        logger.debug("Access token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
  
      it('expecting refresh token to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$["refresh-token"]').pop();
        logger.debug("Refresh token: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting expiration date to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$["access-token-expires-at"]').pop();
        logger.debug("Expiration date: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });
      
      it('expecting user id to be present', async function(){
        let actual_value = await jp.query(actual_res_json, '$["user-id"]').pop();
        logger.debug("User id: " + actual_value);
        assert.strictEqual(actual_value.length > 0, true)
      });  

    });

    describe('sending a request with an invalid token', async function(){

      let response;
      let actual_res_json;
      let request_data;
      let refresh_token;
  
      before( async function() {

        refresh_token = 'gibberish';
        url_path = '/oauth/refresh-token';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
        body = {
          'refresh_token': refresh_token
        };
  
        request_data = tl.setRequestData(url, method, headers, body);
  
        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data for the main request: ' + JSON.stringify(request_data));
  
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
  
        actual_res_json = await response.json();
  
        logger.info("Response is: " + JSON.stringify(actual_res_json));
  
      });
  
      after( async function() {

      });
  
      it('expecting request status to be 401', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 401);
      });

      it('expecting an error code "AUTHORIZATION_ERROR" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'AUTHORIZATION_ERROR');
      });

      it('expecting an error message "Invalid token" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'Invalid token');
      });

    });

  });

  describe('/oauth/email-exists', async function(){

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

    let url_path = '/oauth/email-exists';
    let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'
    };

    describe('sending a valid existing email', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        body = {
          'email': user.data.email
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting: {"email_exists":true}', async function(){
        let actual_value = jp.query(actual_res_json, '$["email_exists"]').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('sending an email with a misprint', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        body = {
          'email': 'gibberish@gibberish.co.uk'
        };
                  
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting: {"email_exists":false}', async function(){
        let actual_value = jp.query(actual_res_json, '$["email_exists"]').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });

    });

    describe('sending an empty email', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        body = {
          'email': undefined
        };
        
        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));
        
      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting error code: VALIDATION_ERROR}', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR')
      });

      it('expecting error message: email is a required field}', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, 'email is a required field')
      });

    });

  });

  describe('/oauth/username-exists', async function(){

    let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

    let url_path = '/oauth/username-exists';
    let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'
    };

    describe('sending an existing username', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        body = {
          'username': user.data.username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting true', async function(){
        let actual_value = jp.query(actual_res_json, '$["username_exists"]').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });
    });

    describe('sending a non-existing username', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        body = {
          'username': 'gibberish'
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting false', async function(){
        let actual_value = jp.query(actual_res_json, '$["username_exists"]').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false);
      });

    });

    describe('sending an empty username', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      before( async function() {

        body = {
          'username': undefined 
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.info("Response is: " + JSON.stringify(actual_res_json));

      });

      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting error code: VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: " + actual_value );
        assert.strictEqual(actual_value, 'VALIDATION_ERROR');
      });

      it('expecting error message: username is a required field', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'username is a required field');
      });

    });

  });

  xdescribe('/oauth/connect', async function(){

    describe('sending a connect request with valid data', async function(){

      before( async function() {

      });
  
      after( async function() {
        
      });
  
      it('expecting request status to be <XXX>', async function(){
      });

      it('placeholder', async function(){
  
      });

    });

    describe('sending a connect request with invalid data', async function(){
      
      before( async function() {

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be <XXX>', async function(){
      });

      it('expecting an error code <CODE> to be present', async function(){
    
      });

      it('expecting an error message <MESSAGE> to be present', async function(){
    
      });

    });

  });

  xdescribe('/oauth/disconnect', async function(){

    describe('sending a disconnect request with valid data', async function(){

      before( async function() {

      });
  
      after( async function() {
        
      });
  
      it('placeholder', async function(){
  
      });

    });

    describe('sending a disconnect request with invalid data', async function(){
      
      before( async function() {

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be <XXX>', async function(){
      });

      it('expecting an error code <CODE> to be present', async function(){
    
      });

      it('expecting an error message <MESSAGE> to be present', async function(){
    
      });

    });

  });

  xdescribe('/oauth/token-based-login', async function(){
    // this one depends either on light registration or on mocks

    describe('sending a login request with a valid token', async function(){
      
      before( async function() {

      });
  
      after( async function() {
        
      });
  
      it('expecting request status to be <XXX>', async function(){
      });

      it('placeholder', async function(){
  
      });  

    });

    describe('sending a login request with a invalid token', async function(){
      
      before( async function() {

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be <XXX>', async function(){
      });

      it('expecting an error code <CODE> to be present', async function(){
    
      });

      it('expecting an error message <MESSAGE> to be present', async function(){
    
      });

    });

  });

  xdescribe('/oauth/:provider/connect', async function(){

    describe('/oauth/instagram/connect', async function(){

      describe('sending a request with valid connect data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });

        it('placeholder', async function(){
      
        });

      });

      xdescribe('sending a request with invalid connect data', async function(){
        
        before( async function() {

        });
      
        after( async function() {
          
        });
      
        xit('expecting request status to be <XXX>', async function(){
        });
  
        xit('expecting an error code <CODE> to be present', async function(){
    
        });
  
        xit('expecting an error message <MESSAGE> to be present', async function(){
      
        });

      });
    
    });

    describe('/oauth/facebook/connect', async function(){

      describe('sending a request with valid connect data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('placeholder', async function(){
      
        });

      });

      xdescribe('sending a request with invalid connect data', async function(){
        
        before( async function() {

        });
      
        after( async function() {
          
        });
      
        xit('expecting request status to be <XXX>', async function(){
        });
  
        xit('expecting an error code <CODE> to be present', async function(){
    
        });
  
        xit('expecting an error message <MESSAGE> to be present', async function(){
      
        });

      });
    
    });

  });

  xdescribe('/oauth/:provider/exchange-token', async function(){

    describe('/oauth/instagram/exchange-token', async function(){

      describe('sending a request with a valid exchange-token', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('placeholder', async function(){
      
        });

      });

      describe('sending a request with an invalid exchange-token', async function(){
        
        before( async function() {

        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('expecting an error code <CODE> to be present', async function(){
    
        });
  
        it('expecting an error message <MESSAGE> to be present', async function(){
      
        });

      });
 
    });

    describe('/oauth/facebook/exchange-token', async function(){

      describe('sending a request with a valid exchange-token', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('placeholder', async function(){
      
        });

      });

      describe('sending a request with an invalid exchange-token', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('expecting an error code <CODE> to be present', async function(){
    
        });
  
        it('expecting an error message <MESSAGE> to be present', async function(){
      
        });

      });
    
    });

  });

  xdescribe('/oauth/:provider/callback', async function(){

    describe('/oauth/instagram/callback', async function(){

      describe('sending a request with valid callback data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('placeholder', async function(){
      
        });

      });

      describe('sending a request with valid callback data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('expecting an error code <CODE> to be present', async function(){
    
        });
  
        it('expecting an error message <MESSAGE> to be present', async function(){
      
        });

      });
    
    });

    describe('/oauth/instagram/callback', async function(){

      describe('sending a request with valid callback data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('placeholder', async function(){
      
        });

      });

      describe('sending a request with valid callback data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('expecting an error code <CODE> to be present', async function(){
    
        });
  
        it('expecting an error message <MESSAGE> to be present', async function(){
      
        });

      });
    
    });

  });

  xdescribe('/oauth/:provider/redirect-url', async function(){

    describe('/oauth/instagram/redirect-url', async function(){

      describe('sending a request with valid redirect-url data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('placeholder', async function(){
      
        });

      });

      describe('sending a request with invalid redirect-url data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('placeholder', async function(){
      
        });

      });
    
    });

    describe('/oauth/facebook/redirect-url', async function(){

      describe('sending a request with valid redirect-url data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('placeholder', async function(){
      
        });

      });

      describe('sending a request with invalid redirect-url data', async function(){
        
        before( async function() {
    
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be <XXX>', async function(){
        });
  
        it('expecting an error code <CODE> to be present', async function(){
    
        });
  
        it('expecting an error message <MESSAGE> to be present', async function(){
      
        });

      });

    });

  });

  xdescribe('/oauth/apple-callback', async function(){

    describe('sending a request with valid apple-callback data', async function(){

      before( async function() {
  
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be <XXX>', async function(){
      });

      it('placeholder', async function(){
    
      });

    });

    describe('sending a request with invalid apple-callback data', async function(){
      
      before( async function() {
  
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be <XXX>', async function(){
      });

      it('expecting an error code <CODE> to be present', async function(){
    
      });

      it('expecting an error message <MESSAGE> to be present', async function(){
    
      });

    });
  
  });

  describe('/oauth/founder-exists', async function(){

    let url_path = '/oauth/founder-exists';
    let url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'
    };

    describe('sending a valid request (user exists and is_founder=true)', async function(){
      
      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

      before( async function() {

        body = {
          'username': user.data.username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
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

      it('expecting true', async function(){
        let actual_value = jp.query(actual_res_json, '$["founder_exists"]').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('sending a valid request (user exists and is_founder=false)', async function(){
      
      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      before( async function() {

        body = {
          'username': user.data.username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
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

      it('expecting false', async function(){
        let actual_value = jp.query(actual_res_json, '$["founder_exists"]').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });

    });

    describe('sending an invalid request (user does not exist)', async function(){
      
      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        body = {
          'username': case_spec_userdata.username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
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

      it('expecting message: "founder_exists: false"', async function(){
        let actual_value = jp.query(actual_res_json, '$.founder_exists').pop();
        logger.debug("Actual response value: ", actual_value);
        assert.strictEqual(actual_value, false);
      });

    });

    describe('sending an invalid request (user is empty)', async function(){
      
      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop(); 

      before( async function() {

        body = {
          'username': undefined
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data' + JSON.stringify(request_data));

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

      it('expecting error code: VALIDATION_ERROR', async function(){
        let actual_value = jp.query(actual_res_json, '$.code').pop();
        logger.debug("Actual response value: ", actual_value);
        assert.strictEqual(actual_value, 'VALIDATION_ERROR');
      });

      it('expecting error message: username is a required field', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: ", actual_value);
        assert.strictEqual(actual_value, 'username is a required field');
      });

    });
  
  });

});