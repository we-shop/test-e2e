'use strict'

describe('Newsfeed-PlatformJS', async function(){

  xdescribe('/newsfeed/feed', async function(){
  
    describe('request to get newsfeed', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting feed user-ids to be present', async function(){
        
      });

      it('expecting feed entry_user_ids to be present', async function(){
        
      });

      it('expecting feed post-id to be present', async function(){
        
      });

      it('expecting feed post_types to be present', async function(){
        
      });

      it('expecting feed usernames to be present', async function(){
        
      });

      it('expecting feed interaction_counts to be present', async function(){
        
      });

    });

  });

  xdescribe('/newsfeed/following', async function(){
  
    describe('request to get newsfeed - following ', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting feed user-ids to be present', async function(){
        
      });

      it('expecting feed entry_user_ids to be present', async function(){
        
      });

      it('expecting feed post-id to be present', async function(){
        
      });

      it('expecting feed usernames to be present', async function(){
        
      });

      it('expecting feed interaction_counts to be present', async function(){
        
      });

    });

  });

  xdescribe('/newsfeed/newsfeed-to-read', async function(){
  
    describe('request to get read marker', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user-id to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting recommendation-count to be present', async function(){
        
      });

      it('expecting newsfeed-read-marker - me to be present', async function(){
        
      });

      it('expecting newsfeed-read-marker - feed to be present', async function(){
        
      });

      it('expecting newsfeed-read-marker - following to be present', async function(){
        
      });

    });

  });

  xdescribe('/newsfeed/read-marker', async function(){
  
    describe('request to set newsfeed-read-marker by passing valid feed_type & read_entry_at', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting ok:true to be present', async function(){
        
      });

    });

    describe('request to set newsfeed-read-marker by passing invalid read_entry_at', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting expecting an error message "read_entry_at must be a date type, but the final value was: Invalid Date" to be present', async function(){
        
      });

    });

    describe('request to set newsfeed-read-marker by passing invalid feed_type', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting expecting an error message "feed_type must be one of the following values: feed, following, me" to be present', async function(){
        
      });

    });

  });

  xdescribe('/newsfeed/socialfeed', async function(){
  
    describe('request to get socialfeed', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting entry_id to be present', async function(){
        
      });

      it('expecting user-id to be present', async function(){
        
      });

      it('expecting post-id to be present', async function(){
        
      });

      it('expecting post-type to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting interaction_counts to be present', async function(){
        
      });

    });

  });

});