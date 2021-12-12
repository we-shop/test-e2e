'use strict'

import jp from "jsonpath";
import * as tl from "./config/testlab.js";
import { loginWithUsernameAndPassword } from "./helpers/testdata/auth.js";
import logger from "./helpers/logger.js";
import chai, {assert} from "chai";
import fs from 'fs'
import path from 'path';
chai.should()


describe('Uploads - PlatformJS', async function(){

  let authToken;

  this.timeout(tl.mocha_timeout);

  before(async function () {
    let user = jp.query(tl.current_users, '$.user[?(@.id=="0001")]').pop();

    const authData = await loginWithUsernameAndPassword(user.data.username, user.data.password)

    authToken = authData['access-token']
  })

  const generateVideo = async () => {
    const uriCreateCommand = '/uploads/video/upload'

    const urlCreateVideo = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, uriCreateCommand);

    const requestData = tl.setRequestData(urlCreateVideo, "POST", {
      'Content-Type': 'application/json',
      'Cookie': `sss-authorization=${authToken}`
    }, {});

    const response = await tl.fetchResponse(requestData.url, requestData.method, requestData.headers, requestData.body);
    return  response.json()
  }

  const uploadVideo = async (url) => {

    const file = fs.readFileSync(path.resolve('./test/config/testdata/video/weShopIntro.mp4'))
    return  tl.fetchResponseRawBody(url, 'PUT', {
      'Content-Type': 'video/mp4'
    }, file)

  }

  const transcodeVideo = async (temp_media_uri) => {
    const uri = '/uploads/video/transcode'
    const url =  tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, uri);

    const requestData = tl.setRequestData(url, "POST", {
      'Content-Type': 'application/json',
      'Cookie': `sss-authorization=${authToken}`
    }, {
      temp_media_uri
    });

    await tl.fetchResponse(requestData.url, requestData.method, requestData.headers, requestData.body);
  }


  describe('/uploads/image/create', async function(){

    describe('request to upload an image', async function(){
      let response;
      let body;

      before(async function () {
        const url_path = '/uploads/image/create';
        const url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);

        const request_data = tl.setRequestData(url, "POST", {
          'Content-Type': 'application/json',
          'Cookie': `sss-authorization=${authToken}`
        }, {});

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        body = await response.json()
      })

      it('expecting request status to be 200', async function(){
        let actual_res_status = response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting image-upload-url to be present', async function(){
        logger.info("Image signed url: " + body['image-upload-url']);
        body.should.have.property('image-upload-url').to.be.a('string')
      });

      it('expecting temp-image-uri to be present', async function(){
        logger.info("temp-image-url: " + body['temp-image-uri']);
        body.should.have.property('temp-image-uri').to.be.a('string')
      });

      it('expecting temp-media-uri to be present', async function(){
        logger.info("temp-media-uri: " + body['temp-image-uri']);
        body.should.have.property('temp-media-uri').to.be.a('string')
      });

    });

  });

  describe('/uploads/import/image-url', async function(){

    describe('request to upload image by url', async function(){

      let response;
      let body;
      this.timeout(30000);
      before(async function () {
        const image_url = 'https://we.shop/s/static/images/weshop-logo-new.svg'
        const url_path = '/uploads/import/image-url';
        const url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, url_path);

        const request_data = tl.setRequestData(url, "POST", {
          'Content-Type': 'application/json',
          'Cookie': `sss-authorization=${authToken}`
        }, {
          image_url
        });

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        body = await response.json()
      })

      it('expecting request status to be 200', async function(){
        const actual_res_status = response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting temp-image-uri to be present', async function(){
        logger.info("temp-image-uri: " + body['temp-image-uri']);
        body.should.have.property('temp-image-uri').to.be.a('string')
      });

      it('expecting temp-image-url to be present', async function(){
        logger.info("temp-image-url: " + body['temp-image-url']);
        body.should.have.property('temp-image-url').to.be.a('string')
      });

    });

  });

  describe('/uploads/video/youtube', async function(){

    describe('request to upload media from youtube', async function(){

      let response;
      let body;

      before(async function () {
        const youtubeUrl = 'https://www.youtube.com/watch?v=h1yG92CibCo'
        const uri = `/uploads/video/youtube?url=${youtubeUrl}`;
        const url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, uri);

        const request_data = tl.setRequestData(url, "POST", {
          'Content-Type': 'application/json',
          'Cookie': `sss-authorization=${authToken}`
        }, {});

        response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
        body = await response.json()
      })

      it('expecting request status to be 200', async function(){
        const actual_res_status = response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting temp-media-uri to be present', async function(){
        logger.info("temp-media-uri: " + body['temp-media-uri']);
        body.should.have.property('temp-media-uri').to.be.a('string')
      });

      it('expecting media-type to be present', async function(){
        logger.info("media-type: " + body['media-type']);
        body.should.have.property('media-type').to.be.a('string')
      });

      it('expecting media-id to be present', async function(){
        logger.info("media-id: " + body['media-id']);
        body.should.have.property('media-id').to.be.a('string')
      });

      it('expecting youtube player-url to be present', async function () {
        logger.info("player-url: " + body['player-url']);

        body.should.have.property('sizes').property('youtube').property('player-url').to.be.a('string')
      });

      it('expecting youtube video-id to be present', async function(){
        logger.info("video-id: " + body['video-id']);
        body.should.have.property('sizes').property('youtube').property('video-id').to.be.a('string')
      });
    });
  });

  describe('/uploads/video/vimeo', async function(){

    describe('request to upload media from vimeo', async function(){
        let response;
        let body;

        before(async function () {
            const vimeoVideo = 'https://vimeo.com/327748348'
            const uri = `/uploads/video/vimeo?url=${vimeoVideo}`;
            const url = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, uri);

            const request_data = tl.setRequestData(url, "POST", {
                'Content-Type': 'application/json',
                'Cookie': `sss-authorization=${authToken}`
            }, {});

            response = await tl.fetchResponse(request_data.url, request_data.method, request_data.headers, request_data.body);
            body = await response.json()
        })


      it('expecting request status to be 200', async function(){
        const actual_res_status = response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting temp-media-uri to be present', async function(){
        logger.info("temp-media-uri: " + body['temp-media-uri']);
        body.should.have.property('temp-media-uri').to.be.a('string')
      });

      it('expecting media-type to be present', async function(){
        logger.info("media-type: " + body['media-type']);
        body.should.have.property('media-type').to.be.a('string')
      });

      it('expecting media-id to be present', async function(){
        logger.info("media-id: " + body['media-id']);
        body.should.have.property('media-id').to.be.a('string')
      });

      it('expecting player-url to be present', async function(){
        logger.info("player-url: " + body['player-url']);
        body.should.have.property('sizes').property('vimeo').property('player-url').to.be.a('string')
      });

      it('expecting video-id to be present', async function(){
        logger.info("video-id: " + body['video-id']);
        body.should.have.property('sizes').property('vimeo').property('video-id').to.be.a('number')
      });

    });

  });

  describe('/uploads/video/status', async function(){



    describe('request to get status of uploaded video', async function(){
      let response
      let body
      let videoId

      this.timeout(30000);

      before( async function() {
        const videoCommand = await generateVideo()
        await uploadVideo(videoCommand['video-upload-url'])
        await transcodeVideo(videoCommand['temp-media-uri'])

        const uri = '/uploads/video/status'
        const url =  tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, uri);

        const requestData = tl.setRequestData(url, "POST", {
          'Content-Type': 'application/json',
          'Cookie': `sss-authorization=${authToken}`
        }, {
          temp_media_uris: [videoCommand['temp-media-uri']]
        });

        videoId = videoCommand['temp-media-uri']
        response = await tl.fetchResponse(requestData.url, requestData.method, requestData.headers, requestData.body);
        body = await response.json()
      });

      it('expecting request status to be 200', async function(){
        const actual_res_status = response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting job-id to be present', async function(){
        logger.info("job-id: " + body['query/entities']['video-uploads'][videoId]['job-id']);
        body.should.have.property('query/entities')
            .property('video-uploads')
            .property(videoId)
            .property('job-id').to.be.a('string')
      });

      it('expecting status to be present', async function(){
        logger.info("status: " + body['query/entities']['video-uploads'][videoId]['status']);
        body.should.have.property('query/entities')
            .property('video-uploads')
            .property(videoId)
            .property('status').to.be.a('string')
      });

      it('expecting temp-media-uri to be present', async function(){
        logger.info("temp-media-uri: " + body['query/entities']['video-uploads'][videoId]['temp-media-uri']);
        body.should.have.property('query/entities')
            .property('video-uploads')
            .property(videoId)
            .property('temp-media-uri').to.be.a('string')
      });

      it('expecting temp-video-uri to be present', async function(){
        logger.info("temp-video-uri: " + body['query/entities']['video-uploads'][videoId]['temp-video-uri']);
        body.should.have.property('query/entities')
            .property('video-uploads')
            .property(videoId)
            .property('temp-video-uri').to.be.a('string')
      });

    });

  });

  describe('/uploads/video/upload', async function(){

    describe('request to upload an video', async function(){
      let response;
      let body;

      before( async function() {
        const uriCreateCommand = '/uploads/video/upload'

        const urlCreateVideo = tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, uriCreateCommand);

        const requestData = tl.setRequestData(urlCreateVideo, "POST", {
          'Content-Type': 'application/json',
          'Cookie': `sss-authorization=${authToken}`
        }, {});

        response = await tl.fetchResponse(requestData.url, requestData.method, requestData.headers, requestData.body);
        body = await response.json()
      });

      it('expecting request status to be 200', async function(){
        const actual_res_status = response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting temp-media-uri to be present', async function(){
        logger.info("temp-media-uri: " + body['temp-media-uri']);
        body.should.have.property('temp-media-uri').to.be.a('string')
      });

      it('expecting temp-video-uri to be present', async function(){
        logger.info("temp-video-uri: " + body['temp-video-uri']);
        body.should.have.property('temp-video-uri').to.be.a('string')
      });

      it('expecting video-upload-url to be present', async function(){
        logger.info("video-upload-url: " + body['video-upload-url']);
        body.should.have.property('video-upload-url').to.be.a('string')
      });

    });

  });

  describe('/uploads/video/transcode', async function(){

    describe('request to create transcode video process by temp-link', async function(){

      let response;
      let body;
      let videoId
      this.timeout(30000);
      before( async function() {
        const videoCommand = await generateVideo()
        await uploadVideo(videoCommand['video-upload-url'])

        const uri = '/uploads/video/transcode'
        const url =  tl.buildUrl(tl.current_env.schema, tl.current_env.url, tl.current_env.port, uri);

        const requestData = tl.setRequestData(url, "POST", {
          'Content-Type': 'application/json',
          'Cookie': `sss-authorization=${authToken}`
        }, {
          temp_media_uri: videoCommand['temp-media-uri']
        });

        videoId = videoCommand['temp-media-uri']
        response = await tl.fetchResponse(requestData.url, requestData.method, requestData.headers, requestData.body);
        body = await response.json()
      });

      it('expecting request status to be 200', async function(){
        const actual_res_status = response.status;
        logger.info("Response status is: " + JSON.stringify(actual_res_status));
        assert.strictEqual(actual_res_status, 200);
      });

      it('expecting job-id to be present', async function() {
        logger.info("job-id: " + body['query/entities']['video-uploads'][videoId]['job-id']);
        body.should.have.property('query/entities')
            .property('video-uploads')
            .property(videoId)
            .property('job-id').to.be.a('string')
      });

      it('expecting status to be present', async function(){
        logger.info("status: " + body['query/entities']['video-uploads'][videoId]['status']);
        body.should.have.property('query/entities')
            .property('video-uploads')
            .property(videoId)
            .property('status').to.be.a('string')
      });

      it('expecting temp-media-uri to be present', async function(){
        logger.info("temp-media-uri: " + body['query/entities']['video-uploads'][videoId]['temp-media-uri']);
        body.should.have.property('query/entities')
            .property('video-uploads')
            .property(videoId)
            .property('temp-media-uri').to.be.a('string')
      });

      it('expecting temp-video-uri to be present', async function(){
        logger.info("temp-video-uri: " + body['query/entities']['video-uploads'][videoId]['temp-video-uri']);
        body.should.have.property('query/entities')
            .property('video-uploads')
            .property(videoId)
            .property('temp-video-uri').to.be.a('string')
      });

    });

  });

});
