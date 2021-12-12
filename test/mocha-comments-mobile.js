'use strict'

describe('Comments - MobileINT', async function(){

  xdescribe('/comments/by-comment-id/{id}', async function(){
  
    describe('request to get a comment by passing valid comment-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting email to be present', async function(){
        
      });

      it('expecting commentId to be present', async function(){
        
      });

      it('expecting parentCommentId to be present', async function(){
        
      });

      it('expecting postId to be present', async function(){
        
      });

      it('expecting commentString to be present', async function(){
        
      });

      it('expecting likeCount to be present', async function(){
        
      });

    });

    describe('request to get a comment by passing invalid comment-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "commentId must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/comments/by-comment-id/{id}', async function(){
  
    describe('request to edit a a comment by passing valid comment-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting email to be present', async function(){
        
      });

      it('expecting postId to be present', async function(){
        
      });

      it('expecting commentId to be present', async function(){
        
      });

      it('expecting commentString to be present', async function(){
        
      });

      it('expecting likeCount to be present', async function(){
        
      });

    });

    describe('request to edit a comment that is created more that 1 hour ago', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting errorCode:1000', async function(){
        
      });

      it('expecting expecting an error message "Unable to edit comment created more that 1 hour ago" to be present', async function(){
        
      });

    });

    describe('request to edit a comment by passing invalid comment-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "commentId must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/comments/by-comment-id/{id}', async function(){
  
    describe('request to delete a comment by passing valid comment-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting success : true to be present', async function(){
        
      });

    });

    describe('request to delete a comment by passing invalid comment-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "commentId must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/comments/by-type-id', async function(){
  
    describe('request to get comments by passing valid type-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting email to be present', async function(){
        
      });

      it('expecting commentId to be present', async function(){
        
      });

      it('expecting postId to be present', async function(){
        
      });

      it('expecting commentString to be present', async function(){
        
      });

      it('expecting likeCount to be present', async function(){
        
      });

    });

  });

  xdescribe('/comments', async function(){
  
    describe('request to create a comment by passing valid parent_comment_id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting email to be present', async function(){
        
      });

      it('expecting commentId to be present', async function(){
        
      });

      it('expecting parentCommentId to be present', async function(){
        
      });

      it('expecting postId to be present', async function(){
        
      });

      it('expecting commentString to be present', async function(){
        
      });

      it('expecting likeCount to be present', async function(){
        
      });

    });

    describe('request to create a comment by passing invalid parent_comment_id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "parent_comment_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/comments/by-comment-id/{id}/like', async function(){
  
    describe('request to like a comment by passing valid comment-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting success : true to be present', async function(){
        
      });

    });

    describe('request to like a comment by passing invalid comment-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "commentId must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/comments/by-comment-id/{id}/unlike', async function(){
  
    describe('request to unlike a comment by passing valid comment-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting success : true to be present', async function(){
        
      });

    });

    describe('request to unlike a comment by passing invalid comment-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "commentId must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/comments/by-comment-id/{id}/report-content', async function(){
  
    describe('request to report a comment by passing valid comment-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting success : true to be present', async function(){
        
      });

    });

    describe('request to report a comment by passing invalid comment-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "commentId must be a valid UUID" to be present', async function(){
        
      });

    });

  });

});