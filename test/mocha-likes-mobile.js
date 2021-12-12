'use strict'

describe('Likes - MobileINT', async function(){

  xdescribe('/likes/post', async function(){
  
    describe('request to get a post likes by passing valid post-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting current UserId to be present', async function(){
        
      });

      it('expecting current username to be present', async function(){
        
      });

      it('expecting current postId to be present', async function(){
        
      });

      it('expecting list of userIds who liked the post to be present', async function(){
        
      });

    });

    describe('request to get a post likes by passing invalid post-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting errorCode:2007', async function(){
        
      });

      it('expecting expecting an error message "post_ids must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/likes/comment', async function(){
  
    describe('request to get a comment likes by passing valid comment-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting current UserId to be present', async function(){
        
      });

      it('expecting current username to be present', async function(){
        
      });

      it('expecting current commentId to be present', async function(){
        
      });

      it('expecting list of UserIds who liked the comment to be present', async function(){
        
      });

    });

    describe('request to get a comment likes by passing invalid comment-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting errorCode:2007', async function(){
        
      });

      it('expecting expecting an error message "comment_ids must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/likes/wishlist', async function(){
  
    describe('request to get a wishlist likes by passing valid wishlist-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting current UserId to be present', async function(){
        
      });

      it('expecting current username to be present', async function(){
        
      });

      it('expecting current wishlistId to be present', async function(){
        
      });

      it('expecting list of UserIds who liked the wishlist to be present', async function(){
        
      });

    });

    describe('request to get a wishlist likes by passing invalid wishlist-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting errorCode:2007', async function(){
        
      });

      it('expecting expecting an error message "wishlist_ids must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/likes/wishlist-item', async function(){
  
    describe('request to get a wishlist-item likes by passing valid wishlist-item-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting current UserId to be present', async function(){
        
      });

      it('expecting current username to be present', async function(){
        
      });

      it('expecting current wishlist-item-id to be present', async function(){
        
      });

      it('expecting list of UserIds who liked the wishlist-item to be present', async function(){
        
      });

    });

    describe('request to get a wishlist-item likes by passing invalid wishlist-item-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting errorCode:2007', async function(){
        
      });

      it('expecting expecting an error message "wishlist_ids must be a valid UUID" to be present', async function(){
        
      });

    });

  });

});
