'use strict'

import jp from 'jsonpath';
import { strict as assert } from 'assert';
import logger from './helpers/logger.js'
import * as tl from './config/testlab.js'
import { generateUserData } from './helpers/generators.js'

describe('Authentication-Mobile', async function(){
  //For the list of clientIds please see
  //home/pg/gitrepo/job/mobile-api/src/authentication.ts

  this.timeout(tl.mocha_timeout); 

  logger.info('Current env is set to: ' + JSON.stringify(tl.current_env));
  logger.info('Selected env user set: ' + JSON.stringify(tl.current_users));
  logger.info('Mocha timeout is set to: ' + tl.mocha_timeout);

  describe('/auth/validate', async function(){
  
    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};

    describe('sending valid user data', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/validate';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'firstName': user.data.fname,
          'lastName': user.data.lname,
          'email': user.data.email,
          'username': user.data.username,
          'password': user.data.password,
          'dob': user.data.date_of_birth,
          'gender': user.data.gender};

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
  
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });
 
      it('expecting positive response to a valid input: firstName', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.firstName.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

      it('expecting positive response to a valid input: lastName', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.lastName.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

      it('expecting positive response to a valid input: email', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.email.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

      it('expecting positive response to a valid input: username', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.username.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

      it('expecting positive response to a valid input: password', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.password.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

      it('expecting positive response to a valid input: dob', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.dob.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

      it('expecting positive response to a valid input: gender', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.gender.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('sending invalid user data (name too long, email invalid, username too short, weak password, non-existent gender, non-existent mobile number, too young)', async function(){
    /**
     * This case is to be extended, see validation rules in the code
     */

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0005")]').pop();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/validate';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'firstName': user.data.fname,
          'lastName': user.data.lname,
          'email': user.data.email,
          'username': user.data.username,
          'password': user.data.password,
          'dob': user.data.date_of_birth,
          'gender': user.data.gender};

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });
 
      it('expecting negative response to a invalid input: firstName', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.firstName.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });

      it('expecting negative response to a invalid input: lastName', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.lastName.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });

      it('expecting negative response to a invalid input: email', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.email.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });

      it('expecting negative response to a invalid input: username', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.username.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });

      it('expecting negative response to a invalid input: password', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.password.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });

      it('expecting negative response to a invalid input: dob', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.dob.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });

      it('expecting negative response to a invalid input: gender', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.validation.gender.valid').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });
    
    });

    describe('sending invalid user data (name too short, email invalid, username too long, weak password, non-existent gender, non-existent mobile number, too old)', async function(){
      /**
       * This case is to be extended, see validation rules in the code
       */
  
        let response;
        let actual_res_json;
        let body;
        let request_data;
  
        let user = jp.query(tl.current_users, '$.user[?(@.id=="0005")]').pop();
  
        before( async function() {
  
          url_path = tl.current_env.version_mobile + '/auth/validate';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          body = {
            'firstName': user.data.fname,
            'lastName': user.data.lname,
            'email': user.data.email,
            'username': user.data.username,
            'password': user.data.password,
            'dob': user.data.date_of_birth,
            'gender': user.data.gender};
  
          request_data = tl.setRequestData(url, method, headers, body);
  
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data: ' + JSON.stringify(request_data));
      
          response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
          
          actual_res_json = await response.json();
  
          logger.debug("Response is: " + JSON.stringify(actual_res_json));
      
        });
      
        after( async function() {
          
        });
      
        it('expecting request status to be 200', async function(){
          let actual_res_status = await response.status;
          logger.info("Response status is: " + JSON.stringify(actual_res_status));
          assert.strictEqual(actual_res_status, 200);
        });
   
        it('expecting negative response to a invalid input: firstName', async function(){
          let actual_value = jp.query(actual_res_json, '$.results.validation.firstName.valid').pop();
          logger.debug("Actual value: " + `${actual_value}`);
          assert.strictEqual(actual_value, false)
        });
  
        it('expecting negative response to a invalid input: lastName', async function(){
          let actual_value = jp.query(actual_res_json, '$.results.validation.lastName.valid').pop();
          logger.debug("Actual value: " + `${actual_value}`);
          assert.strictEqual(actual_value, false)
        });
  
        it('expecting negative response to a invalid input: email', async function(){
          let actual_value = jp.query(actual_res_json, '$.results.validation.email.valid').pop();
          logger.debug("Actual value: " + `${actual_value}`);
          assert.strictEqual(actual_value, false)
        });
  
        it('expecting negative response to a invalid input: username', async function(){
          let actual_value = jp.query(actual_res_json, '$.results.validation.username.valid').pop();
          logger.debug("Actual value: " + `${actual_value}`);
          assert.strictEqual(actual_value, false)
        });
  
        it('expecting negative response to a invalid input: password', async function(){
          let actual_value = jp.query(actual_res_json, '$.results.validation.password.valid').pop();
          logger.debug("Actual value: " + `${actual_value}`);
          assert.strictEqual(actual_value, false)
        });
  
        it('expecting negative response to a invalid input: dob', async function(){
          let actual_value = jp.query(actual_res_json, '$.results.validation.dob.valid').pop();
          logger.debug("Actual value: " + `${actual_value}`);
          assert.strictEqual(actual_value, false)
        });
  
        it('expecting negative response to a invalid input: gender', async function(){
          let actual_value = jp.query(actual_res_json, '$.results.validation.gender.valid').pop();
          logger.debug("Actual value: " + `${actual_value}`);
          assert.strictEqual(actual_value, false)
        });
      
      });
  
  });

  describe('/auth/login', async function(){

    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};

    describe('sending a valid request to login (email + clientId=android)', async function(){
      /**
       * Needs to be extended with checks against all the returned fields
       */

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      before( async function() {
    
        url_path = tl.current_env.version_mobile + '/auth/login';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'android',
          'email': user.data.email,
          'password': user.data.password,
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting one user to be returned', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users');
        logger.debug("Access token: " + actual_value);
        assert.strictEqual(actual_value.length, 1)
      });
      
      it('expecting the user to have a correct userId', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users[0].userId').pop();
        logger.debug("Refresh token: s" + actual_value);
        assert.strictEqual(actual_value, user.tech.user_id)
      });
    
    });

  });

  xdescribe('/auth/light-registration', async function(){

    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};

    describe('sending a valid request (valid non-existing email and a valid clientId: android)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'android',
          'email': case_spec_userdata.email
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });
    
    });

    describe('sending a valid request (valid non-existing email and a valid clientId: ios)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'ios',
          'email': case_spec_userdata.email
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });
    
    });
  
    describe('sending a valid request (existing email and an invalid clientId)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'gibberish',
          'email': user.data.email
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });
    
    });

    describe('sending a valid request (existing email and a valid clientId: android)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'android',
          'email': user.data.email
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });    

    });

    describe('sending a valid request (malformed email and a valid clientId: android)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'android',
          'email': 'gibberish'
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });    
    });

    describe('sending a valid request (empty email and a valid clientId: android)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'android',
          'email': undefined
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });    
    });

  });

  xdescribe('/auth/light-registration-token', async function(){

    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};

    xdescribe('sending a valid request (valid token and valid clientId: android)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
        
        // TODO: placeholder for getting us some tokens
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'android',
          'token': 'placeholder for a token'
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });
    
    });

    xdescribe('sending a valid request (valid token and valid clientId: ios)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
        
        // TODO: placeholder for getting us some tokens
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'ios',
          'token': 'placeholder for a token'
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });    
    });
  
    xdescribe('sending a valid request (valid token and invalid clientId)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
        
        // TODO: placeholder for getting us some tokens
    
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'gibberish',
          'token': 'placeholder for a token'
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });    
    });

    xdescribe('sending a valid request (invalid token and valid clientId: android)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {
            
        url_path = tl.current_env.version_mobile + '/auth/light-registration';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'clientId': 'android',
          'token': 'gibberish'
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      xit('placeholder', async function(){

      });
      
      xit('placeholder', async function(){

      });   

    });

  });

  xdescribe('/auth/full-registration', async function(){

    xdescribe('sending a valid request', async function(){

      before( async function() {
    
      });
    
      after( async function() {
        
      });
    
      it('placeholder', async function(){
    
      });
    
    });

    xdescribe('placeholder for sending a invalid request', async function(){

      before( async function() {
    
      });
    
      after( async function() {
        
      });
    
      it('placeholder', async function(){
    
      });
    
    });

    xdescribe('placeholder for sending a invalid request', async function(){

      before( async function() {
    
      });
    
      after( async function() {
        
      });
    
      it('placeholder', async function(){
    
      });
    
    });
  
  });

  describe('/auth/register', async function(){
      
    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};

    describe('sending a request with valid user data via android', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/register';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'firstName': user.data.fname,
          'lastName': user.data.lname,
          'email': case_spec_userdata.email,
          'username': case_spec_userdata.username,
          'password': case_spec_userdata.password,
          'dob': user.data.date_of_birth,
          'gender': user.data.gender,
          'marketingEmails': user.config.allow_marketing_emails,
          'tsncsAgreed': user.config.user_agreement,
//          'oauthTempToken': 'string',
          'clientId': 'android',
          'referred_by': '',
          'founderUsername': user.config.founder_username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting one user to be returned', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users');
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value.length, 1)
      });
      
      it('expecting the user to have a userId', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users[0].userId');
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value.length, 1)
      });

      it('expecting the user to have the username sent during registration', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users[0].username').pop();
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value, case_spec_userdata.username)
      });

      it('expecting the user to have the email sent during registration', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users[0].email').pop();
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value, case_spec_userdata.email)
      });

    });

    describe('sending a request with valid user data via ios', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/register';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'firstName': user.data.fname,
          'lastName': user.data.lname,
          'email': case_spec_userdata.email,
          'username': case_spec_userdata.username,
          'password': case_spec_userdata.password,
          'dob': user.data.date_of_birth,
          'gender': user.data.gender,
          'marketingEmails': user.config.allow_marketing_emails,
          'tsncsAgreed': user.config.user_agreement,
//          'oauthTempToken': 'string',
          'clientId': 'ios',
          'referred_by': '',
          'founderUsername': user.config.founder_username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting one user to be returned', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users');
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value.length, 1)
      });
      
      it('expecting the user to have a userId', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users[0].userId');
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value.length, 1)
      });

      it('expecting the user to have the username sent during registration', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users[0].username').pop();
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value, case_spec_userdata.username)
      });

      it('expecting the user to have the email sent during registration', async function(){
        let actual_value = jp.query(actual_res_json, '$.entities.users[0].email').pop();
        logger.debug("Actual value: " + actual_value);
        assert.strictEqual(actual_value, case_spec_userdata.email)
      });

    });

    describe('sending a request with invalid user data with non-existent clientId', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/register';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'firstName': user.data.fname,
          'lastName': user.data.lname,
          'email': case_spec_userdata.email,
          'username': case_spec_userdata.username,
          'password': case_spec_userdata.password,
          'dob': user.data.date_of_birth,
          'gender': user.data.gender,
          'marketingEmails': user.config.allow_marketing_emails,
          'tsncsAgreed': user.config.user_agreement,
//          'oauthTempToken': 'string',
          'clientId': 'gibberish',
          'referred_by': '',
          'founderUsername': user.config.founder_username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));

      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting error code: 1005', async function(){
        let actual_value = jp.query(actual_res_json, '$.errorCode').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, 1005)
      });

      it('expecting error message: Invalid client id}', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + `${actual_value}`);
        assert.strictEqual(actual_value, 'Invalid client id')
      });

    });

  });

  describe('/auth/password-reset', async function(){

    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};

    describe('sending a valid request for password reset', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/password-reset';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'email': user.data.email
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });
    
      it('expecting status to be successful', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('sending a invalid request for password reset (non-existent email)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/password-reset';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'email': 'gibberish@mailinator.com'
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });
    
      it('expecting status to be successful', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });
  
  });

  describe('/auth/password-change', async function(){

    let authorizationCode;
    let authorization;
    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};

    describe('sending a valid request for password change', async function(){

      let response;
      let actual_res_json;
      let response_precondition;
      let response_precondition_json;
      let response2_precondition;
      let response2_precondition_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        // preparing first request with initial registration data (/auth/login)

          body = {
            'clientId': 'debug',
            'email': user.data.email,
            'password': user.data.password
          };
    
          url_path = tl.current_env.version_mobile + '/auth/login';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          request_data = tl.setRequestData(url, method, headers, body);
    
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data for the first precondition request: ' + JSON.stringify(request_data));
    
          response_precondition = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
    
          response_precondition_json = await response_precondition.json();
    
          logger.info('Precondition response 1: ' + JSON.stringify(response_precondition_json));
          logger.debug('Precondition response 1 headers are: ' + JSON.stringify(response_precondition.headers.raw()));
          logger.debug('Precondition response 1 authorizationCode is: ' +  JSON.stringify(jp.query(response_precondition_json, '$.results.authorizationCode').pop()));
        
        // preparing second request for token (/oauth/token)

          authorizationCode = jp.query(response_precondition_json, '$.results.authorizationCode').pop();
          url_path = tl.current_env.version_mobile + '/oauth/token';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };

          let urlencoded = new URLSearchParams();

          logger.debug("Value of urlencoded before append: " + urlencoded);
        
          urlencoded.append("code", authorizationCode);
          urlencoded.append("client_id", "debug");
          urlencoded.append("client_secret", "debug");
          urlencoded.append("grant_type", "authorization_code");

          logger.debug("Value of urlencoded after append: " + urlencoded);

          body = urlencoded;

          request_data = tl.setRequestData(url, method, headers, body);
    
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data for the precondition request 2: ' + JSON.stringify(request_data));
          logger.info('Request body for the precondition request 2: ' + String(request_data.body));
    
          response2_precondition = await tl.fetchResponseRawBody(request_data.url, request_data.method, request_data.headers, request_data.body);
    
          response2_precondition_json = await response2_precondition.json();

          logger.info('Precondition response 2: ' + JSON.stringify(response2_precondition_json));
          logger.debug('Precondition response 2 headers are: ' + JSON.stringify(response2_precondition.headers.raw()));
          logger.debug('Precondition response 2 access token is: ' +  JSON.stringify(jp.query(response2_precondition_json, '$.access_token').pop()));
          logger.debug('Generated userdata: ' + JSON.stringify(case_spec_userdata));

          
        // preparing third (main) request using data from precondition request

          authorization = jp.query(response2_precondition_json, '$.access_token').pop();
          url_path = tl.current_env.version_mobile + '/auth/password-change';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization
          };  
          body = {
            'newPassword': case_spec_userdata.password_random_valid
          };

          request_data = tl.setRequestData(url, method, headers, body);

          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data: ' + JSON.stringify(request_data));
      
          response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
          
          actual_res_json = await response.json();

          logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });
    
      it('expecting status to be successful', async function(){
        let actual_value = jp.query(actual_res_json, '$.success').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });
    
    });

    describe('sending an invalid request for password change (password does not march requirements: lowercase letters only)', async function(){
      
      let response;
      let actual_res_json;
      let response_precondition;
      let response_precondition_json;
      let response2_precondition;
      let response2_precondition_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        // preparing first request with initial registration data (/auth/login)

          body = {
            'clientId': 'debug',
            'email': user.data.email,
            'password': user.data.password
          };
    
          url_path = tl.current_env.version_mobile + '/auth/login';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          request_data = tl.setRequestData(url, method, headers, body);
    
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data for the first precondition request: ' + JSON.stringify(request_data));
    
          response_precondition = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
    
          response_precondition_json = await response_precondition.json();
    
          logger.info('Precondition response 1: ' + JSON.stringify(response_precondition_json));
          logger.debug('Precondition response 1 headers are: ' + JSON.stringify(response_precondition.headers.raw()));
          logger.debug('Precondition response 1 authorizationCode is: ' +  JSON.stringify(jp.query(response_precondition_json, '$.results.authorizationCode').pop()));
        
        // preparing second request for token (/oauth/token)

          authorizationCode = jp.query(response_precondition_json, '$.results.authorizationCode').pop();
          url_path = tl.current_env.version_mobile + '/oauth/token';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };

          let urlencoded = new URLSearchParams();

          logger.debug("Value of urlencoded before append: " + urlencoded);
        
          urlencoded.append("code", authorizationCode);
          urlencoded.append("client_id", "debug");
          urlencoded.append("client_secret", "debug");
          urlencoded.append("grant_type", "authorization_code");

          logger.debug("Value of urlencoded after append: " + urlencoded);

          body = urlencoded;

          request_data = tl.setRequestData(url, method, headers, body);
    
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data for the precondition request 2: ' + JSON.stringify(request_data));
          logger.info('Request body for the precondition request 2: ' + String(request_data.body));
    
          response2_precondition = await tl.fetchResponseRawBody(request_data.url, request_data.method, request_data.headers, request_data.body);
    
          response2_precondition_json = await response2_precondition.json();

          logger.info('Precondition response 2: ' + JSON.stringify(response2_precondition_json));
          logger.debug('Precondition response 2 headers are: ' + JSON.stringify(response2_precondition.headers.raw()));
          logger.debug('Precondition response 2 access token is: ' +  JSON.stringify(jp.query(response2_precondition_json, '$.access_token').pop()));
          logger.debug('Generated userdata: ' + JSON.stringify(case_spec_userdata));

          
        // preparing third (main) request using data from precondition request

          authorization = jp.query(response2_precondition_json, '$.access_token').pop();
          url_path = tl.current_env.version_mobile + '/auth/password-change';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization
          };  
          body = {
            'newPassword': 'mynewinvalidpassword'
          };

          request_data = tl.setRequestData(url, method, headers, body);

          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data: ' + JSON.stringify(request_data));
      
          response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
          
          actual_res_json = await response.json();

          logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });
    
      it('expecting an error code "1106" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.errorCode').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 1106);
      });

      it('expecting an error message "Invalid password" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'Invalid password');
      });

    });

    describe('sending an invalid request to reset to a value that have been used earlier', async function(){
      
      let response;
      let actual_res_json;
      let response_precondition;
      let response_precondition_json;
      let response2_precondition;
      let response2_precondition_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        // preparing first request with initial registration data (/auth/login)

          body = {
            'clientId': 'debug',
            'email': user.data.email,
            'password': user.data.password
          };
    
          url_path = tl.current_env.version_mobile + '/auth/login';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          request_data = tl.setRequestData(url, method, headers, body);
    
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data for the first precondition request: ' + JSON.stringify(request_data));
    
          response_precondition = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
    
          response_precondition_json = await response_precondition.json();
    
          logger.info('Precondition response 1: ' + JSON.stringify(response_precondition_json));
          logger.debug('Precondition response 1 headers are: ' + JSON.stringify(response_precondition.headers.raw()));
          logger.debug('Precondition response 1 authorizationCode is: ' +  JSON.stringify(jp.query(response_precondition_json, '$.results.authorizationCode').pop()));
        
        // preparing second request for token (/oauth/token)

          authorizationCode = jp.query(response_precondition_json, '$.results.authorizationCode').pop();
          url_path = tl.current_env.version_mobile + '/oauth/token';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };

          let urlencoded = new URLSearchParams();

          logger.debug("Value of urlencoded before append: " + urlencoded);
        
          urlencoded.append("code", authorizationCode);
          urlencoded.append("client_id", "debug");
          urlencoded.append("client_secret", "debug");
          urlencoded.append("grant_type", "authorization_code");

          logger.debug("Value of urlencoded after append: " + urlencoded);

          body = urlencoded;

          request_data = tl.setRequestData(url, method, headers, body);
    
          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data for the precondition request 2: ' + JSON.stringify(request_data));
          logger.info('Request body for the precondition request 2: ' + String(request_data.body));
    
          response2_precondition = await tl.fetchResponseRawBody(request_data.url, request_data.method, request_data.headers, request_data.body);
    
          response2_precondition_json = await response2_precondition.json();

          logger.info('Precondition response 2: ' + JSON.stringify(response2_precondition_json));
          logger.debug('Precondition response 2 headers are: ' + JSON.stringify(response2_precondition.headers.raw()));
          logger.debug('Precondition response 2 access token is: ' +  JSON.stringify(jp.query(response2_precondition_json, '$.access_token').pop()));
          logger.debug('Generated userdata: ' + JSON.stringify(case_spec_userdata));

          
        // preparing third (main) request using data from precondition request

          authorization = jp.query(response2_precondition_json, '$.access_token').pop();
          url_path = tl.current_env.version_mobile + '/auth/password-change';
          url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
          headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization
          };  
          body = {
            'newPassword': user.data.password
          };

          request_data = tl.setRequestData(url, method, headers, body);

          logger.debug('Selected user data: ' + JSON.stringify(user));
          logger.info('Request data: ' + JSON.stringify(request_data));
      
          response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
          
          actual_res_json = await response.json();

          logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });
    
      it('expecting an error code "2007" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.errorCode').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 2007);
      });

      it('expecting an error message "Please choose a password that you haven\'t used before" to be present', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual response value: " + actual_value);
        assert.strictEqual(actual_value, 'Please choose a password that you haven\'t used before');
      });

    });

  });

  describe('/auth/email-exists', async function(){

    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};
    
    describe('sending a valid request with an existing email', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/email-exists';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'email': user.data.email
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
      
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecing "emailExists":true', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.emailExists').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });

    });

    describe('sending a valid request with a non-existing email', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/email-exists';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'email': case_spec_userdata.email
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
      
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecing "emailExists":false', async function(){
        let actual_value = jp.query(actual_res_json, '$.results.emailExists').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });
    
    });

    describe('sending an invalid request with an empty email', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/email-exists';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'email': undefined
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
      
      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting message to be "ValidateError"', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, 'ValidateError');
      });
    
    });
  
  });

  describe('/auth/founder-exists', async function(){

    let url_path;
    let url;
    let method = 'post';
    let headers = {
      'Content-Type': 'application/json'};

    describe('sending a valid request (username exists and is_founder=true)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0007")]').pop();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/founder-exists';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'username': user.data.username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting "founderExists":true', async function(){
        let actual_value = jp.query(actual_res_json, '$.founderExists').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, true)
      });
    
    });

    describe('sending a valid request (username exists and is_founder=false)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/founder-exists';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'username': user.data.username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 200', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting "founderExists":false', async function(){
        let actual_value = jp.query(actual_res_json, '$.founderExists').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });
    
    });

    describe('sending an invalid request (username does not exists)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/founder-exists';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'username': case_spec_userdata.username
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting "founderExists":false', async function(){
        let actual_value = jp.query(actual_res_json, '$.founderExists').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, false)
      });
    
    });

    describe('sending an invalid request (username is empty)', async function(){

      let response;
      let actual_res_json;
      let body;
      let request_data;

      let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

      let case_spec_userdata = generateUserData();

      before( async function() {

        url_path = tl.current_env.version_mobile + '/auth/founder-exists';
        url = tl.buildUrl(tl.current_env.schema, tl.current_env.url_mobile, tl.current_env.port_mobile, url_path);
        body = {
          'username': undefined
        };

        request_data = tl.setRequestData(url, method, headers, body);

        logger.debug('Selected user data: ' + JSON.stringify(user));
        logger.info('Request data: ' + JSON.stringify(request_data));
    
        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        
        actual_res_json = await response.json();

        logger.debug("Response is: " + JSON.stringify(actual_res_json));
    
      });
    
      after( async function() {
        
      });
    
      it('expecting request status to be 400', async function(){
        let actual_res_status = await response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 400);
      });

      it('expecting error message "ValidateError"', async function(){
        let actual_value = jp.query(actual_res_json, '$.message').pop();
        logger.debug("Actual value: " + `${actual_value}`);
        assert.strictEqual(actual_value, 'ValidateError')
      });
    
    });

  });

  xdescribe('/auth/instagram/authorize', async function(){

    before( async function() {
  
    });
  
    after( async function() {
      
    });
  
    it('placeholder', async function(){
  
    });
  
  });

  xdescribe('/auth/instagram/callback', async function(){

    before( async function() {
  
    });
  
    after( async function() {
      
    });
  
    it('placeholder', async function(){
  
    });
  
  });

});