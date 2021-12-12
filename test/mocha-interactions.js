'use strict'

describe('Interactions-PlatformJS', async function(){

  xdescribe('/interactions/like/assert', async function(){
  
    describe('request to like a post by passing valid post-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

    describe('request to like a post by passing invalid post-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/interactions/like/retract', async function(){
  
    describe('request to unlike a post by passing valid post-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

    describe('request to unlike a post by passing invalid post-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/interactions/likes', async function(){
  
    describe('request to get likes by passing valid post-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting likes entities to be present', async function(){
        
      });

    });

    describe('request to get likes by passing invalid post-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "entity.post_ids must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/interactions/comment/create', async function(){
  
    describe('request to comment one of post/wishlist/wishlistItem by passing valid post_id/wishlist_id/wishlistItem_id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting comment_id to be present', async function(){
        
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting post_id/wishlist_id/wishlistItem_id to be present', async function(){
        
      });

      it('expecting post_type to be present', async function(){
        
      });

      it('expecting comment_text to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting email to be present', async function(){
        
      });

    });

    describe('request to comment one of post/wishlist/wishlistItem by passing invalid post/wishlist/wishlistItem', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/interactions/comment/post/create', async function(){
  
    describe('request to comment to a post by passing valid post_id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting comment_id to be present', async function(){
        
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting post_id to be present', async function(){
        
      });

      it('expecting post_type to be present', async function(){
        
      });

      it('expecting comment_text to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting email to be present', async function(){
        
      });

    });

    describe('request to comment to a post by passing invalid post_id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "post_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/interactions/comment/wishlist/create', async function(){
  
    describe('request to comment to a wishlist by passing valid wishlist_id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting comment_id to be present', async function(){
        
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting wishlist_id to be present', async function(){
        
      });

      it('expecting wishlist_title to be present', async function(){
        
      });

      it('expecting comment_text to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting email to be present', async function(){
        
      });

    });

    describe('request to comment to a wishlist by passing invalid wishlist_id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "wishlist_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/interactions/comment/post/edit', async function(){
  
    describe('request to edit comment by passing valid comment_id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting comment_id to be present', async function(){
        
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting post_id to be present', async function(){
        
      });

      it('expecting post_type to be present', async function(){
        
      });

      it('expecting comment_text to be present', async function(){
        
      });

      it('expecting username to be present', async function(){
        
      });

      it('expecting email to be present', async function(){
        
      });

    });

    describe('request to edit a comment that is created more that 1 hour ago', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:EDIT_COMMENT_ERROR', async function(){
        
      });

      it('expecting expecting an error message "Unable to edit comment created more that 1 hour ago" to be present', async function(){
        
      });

    });

    describe('request to edit comment by passing invalid comment_id', async function(){

        before( async function() {
  
  
        });
  
        it('expecting request status to be 400', async function(){
            
        });
  
        it('expecting code:VALIDATION_ERROR', async function(){
          
        });
  
        it('expecting expecting an error message "comment_id must be a valid UUID" to be present', async function(){
          
        });
  
      });

  });

  xdescribe('/interactions/comment/post/delete', async function(){
  
    describe('request to delete a comment by passing valid comment_id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

    describe('request to delete a comment by passing invalid comment_id', async function(){

      before( async function() {
  
  
      });
  
      it('expecting request status to be 400', async function(){
            
      });
  
      it('expecting code:VALIDATION_ERROR', async function(){
          
      });
  
      it('expecting expecting an error message "comment_id must be a valid UUID" to be present', async function(){
          
      });
  
    });

  });

  xdescribe('/interactions/comment/list', async function(){
  
    describe('request to get comments list by passing valid post_id / wishlist_id / wishlist_item_id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting comment_id to be present', async function(){
        
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting post_id / wishlist_id / wishlist_item_id to be present', async function(){
        
      });

      it('expecting comment_text to be present', async function(){
        
      });

    });

    describe('request to get comments list by passing invalid post_id / wishlist_id / wishlist_item_id', async function(){

      before( async function() {
  
  
      });
  
      it('expecting request status to be 400', async function(){
            
      });
  
      it('expecting code:VALIDATION_ERROR', async function(){
          
      });
  
      it('expecting expecting an error message "post_id / wishlist_id / wishlist_item_id must be a valid UUID" to be present', async function(){
          
      });
  
    });

  });

  xdescribe('/interactions/comment/child', async function(){
  
    describe('request to get child comments list by passing valid comment_id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting comment_id to be present', async function(){
        
      });

      it('expecting user_id to be present', async function(){
        
      });

      it('expecting post_id / wishlist_id / wishlist_item_id to be present', async function(){
        
      });

      it('expecting comment_text to be present', async function(){
        
      });

    });

    describe('request to get child comments list by passing invalid comment_id', async function(){

      before( async function() {
  
  
      });
  
      it('expecting request status to be 400', async function(){
            
      });
  
      it('expecting code:VALIDATION_ERROR', async function(){
          
      });
  
      it('expecting expecting an error message "comment_id must be a valid UUID" to be present', async function(){
          
      });
  
    });

  });

  xdescribe('/interactions/followees', async function(){
  
    describe('request to get user followees by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting current user-id to be present', async function(){
        
      });

      it('expecting current username to be present', async function(){
        
      });

      it('expecting current user followee count to be present', async function(){
        
      });

      it('expecting current user follower count to be present', async function(){
        
      });

      it('expecting current user question-count to be present', async function(){
        
      });

      it('expecting current user recommendation-count to be present', async function(){
        
      });

      it('expecting followees-user-id to be present', async function(){
        
      });

      it('expecting followees username to be present', async function(){
        
      });

      it('expecting followees question-count to be present', async function(){
        
      });

      it('expecting followees recommendation-count to be present', async function(){
        
      });

      it('expecting followees connection-counts to be present', async function(){
        
      });

    });

    describe('request to get user followees by passing invalid user-id', async function(){

      before( async function() {
  
  
      });
  
      it('expecting request status to be 400', async function(){
            
      });
  
      it('expecting code:VALIDATION_ERROR', async function(){
          
      });
  
      it('expecting expecting an error message "user-id must be a valid UUID" to be present', async function(){
          
      });
  
    });

  });

  xdescribe('/interactions/followers', async function(){
  
    describe('request to get user followers by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting current user-id to be present', async function(){
        
      });

      it('expecting current username to be present', async function(){
        
      });

      it('expecting current user followee count to be present', async function(){
        
      });

      it('expecting current user follower count to be present', async function(){
        
      });

      it('expecting current user question-count to be present', async function(){
        
      });

      it('expecting current user recommendation-count to be present', async function(){
        
      });

      it('expecting followers user-id to be present', async function(){
        
      });

      it('expecting followers username to be present', async function(){
        
      });

      it('expecting followers question-count to be present', async function(){
        
      });

      it('expecting followers recommendation-count to be present', async function(){
        
      });

      it('expecting followers connection-counts to be present', async function(){
        
      });

    });

    describe('request to get user followers by passing invalid user-id', async function(){

      before( async function() {
  
  
      });
  
      it('expecting request status to be 400', async function(){
            
      });
  
      it('expecting code:VALIDATION_ERROR', async function(){
          
      });
  
      it('expecting expecting an error message "user-id must be a valid UUID" to be present', async function(){
          
      });
  
    });

  });

});