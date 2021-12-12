'use strict'

describe('Users-MobileINT', async function(){

  xdescribe('/users/by-user-id/{id}', async function(){
  
    describe('request to get specific user details by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user-id to be present', async function(){
    
      });

      it('expecting username to be present', async function(){
    
      });

      it('expecting publicWishlists count to be present', async function(){
        
      });

      it('expecting privateWishlists count to be present', async function(){
        
      });

      it('expecting post count to be present', async function(){
        
      });

      it('expecting followees count to be present', async function(){
    
      });

      it('expecting followers count to be present', async function(){
    
      });

      it('expecting question count to be present', async function(){
    
      });

      it('expecting recommendation count to be present', async function(){
    
      });


    });

    describe('request to get specific user details by passing invalid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 1000', async function(){
        
      });

      it('expecting expecting an error message "Unknown" to be present', async function(){
        
      });

    });

  });  

  xdescribe('/users/by-user-id/{id}/followers', async function(){
  
    describe('request to get followers of a specific user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user-id to be present', async function(){
    
      });

      it('expecting username to be present', async function(){
    
      });

      it('expecting postCounts to be present', async function(){
        
      });

      it('expecting followees count count to be present', async function(){
        
      });

      it('expecting followers count to be present', async function(){
        
      });

      it('expecting questionCount to be present', async function(){
    
      });

      it('expecting recommendationCount to be present', async function(){
    
      });

      it('expecting followers userId to be present', async function(){
    
      });

      it('expecting followers username to be present', async function(){
    
      });

      it('expecting followers postCount to be present', async function(){
    
      });

      it('expecting followers questionCount to be present', async function(){
    
      });

      it('expecting followers recommendationCount to be present', async function(){
    
      });

      it('expecting followers connectionCounts to be present', async function(){
    
      });


    });

    describe('request to get followers of a specific user by passing invalid user-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 1000', async function(){
        
      });

      it('expecting expecting an error message "Unknown" to be present', async function(){
        
      });

    });

  });  

  xdescribe('/users/by-user-id/{id}/followees', async function(){
  
    describe('request to get followees of a specific user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user-id to be present', async function(){
    
      });

      it('expecting username to be present', async function(){
    
      });

      it('expecting postCounts to be present', async function(){
        
      });

      it('expecting followees count count to be present', async function(){
        
      });

      it('expecting followers count to be present', async function(){
        
      });

      it('expecting questionCount to be present', async function(){
    
      });

      it('expecting recommendationCount to be present', async function(){
    
      });

      it('expecting followees userId to be present', async function(){
    
      });

      it('expecting followees username to be present', async function(){
    
      });

      it('expecting followees postCount to be present', async function(){
    
      });

      it('expecting followees questionCount to be present', async function(){
    
      });

      it('expecting followees recommendationCount to be present', async function(){
    
      });

      it('expecting followees connectionCounts to be present', async function(){
    
      });


    });

    describe('request to get followees of a specific user by passing invalid user-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 1000', async function(){
        
      });

      it('expecting expecting an error message "Unknown" to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/by-user-id/{id}/follow', async function(){
  
    describe('request to follow a specific user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

      it('expecting user-id to be present', async function(){
    
      });

      it('expecting current username to be present', async function(){
    
      });

      it('expecting followees count to be present', async function(){
    
      });

      it('expecting followers count to be present', async function(){
    
      });

    });

    describe('request to follow a specific user by passing invalid user-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 2007', async function(){
        
      });

      it('expecting expecting an error message "followee_user_id must be a valid UUID" to be present', async function(){
        
      });

    });

    describe('request to follow by passing current user-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 1000', async function(){
        
      });

      it('expecting expecting an error message "User cannot follow himself" to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/by-user-id/{id}/unfollow', async function(){
  
    describe('request to unfollow a specific user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

      it('expecting user-id to be present', async function(){
    
      });

      it('expecting current username to be present', async function(){
    
      });

      it('expecting followees count to be present', async function(){
    
      });

      it('expecting followers count to be present', async function(){
    
      });

    });

    describe('request to unfollow a specific user by passing invalid user-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 2007', async function(){
        
      });

      it('expecting expecting an error message "followee_user_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/by-user-id/{id}/posts', async function(){
  
    describe('request to get posts by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting post-id to be present', async function(){
    
      });

      it('expecting user-id to be present', async function(){
    
      });

      it('expecting productIds to be present', async function(){
    
      });

      it('expecting captionString to be present', async function(){
    
      });

      it('expecting commentCount to be present', async function(){
    
      });

      it('expecting likeCount to be present', async function(){
    
      });

      it('expecting postType to be present', async function(){
    
      });

    });

    describe('request to get posts by passing invalid user-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 1000', async function(){
        
      });

      it('expecting expecting an error message "Unknown', async function(){
        
      });

    });

  });

  xdescribe('/users/get-blocked-users', async function(){
  
    describe('request to get blocked users', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user-id of current user to be present', async function(){
    
      });

      it('expecting username of blocked users to be present', async function(){
    
      });

      it('expecting user-id of blocked users to be present', async function(){
    
      });

      it('expecting username of blocked users to be present', async function(){
    
      });

    });

  });

  xdescribe('/users/by-user-id/{id}/block', async function(){
  
    describe('request to block a user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

      it('expecting current user-id to be present', async function(){
    
      });

    });

    describe('request to block a user by passing invalid user-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 1000', async function(){
        
      });

      it('expecting expecting an error message "blockeeUserId must be a valid UUID', async function(){
        
      });

    });

    describe('request to block already blocked user', async function(){

        before( async function() {
  
  
        });
  
        it('expecting request status to be 400', async function(){
          
        });
  
        it('expecting "errorCode": 2007', async function(){
          
        });
  
        it('expecting expecting an error message "User is already blocked', async function(){
          
        });
  
      });

  });

  xdescribe('/users/by-user-id/{id}/unblock', async function(){
  
    describe('request to unblock a user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

      it('expecting current user-id to be present', async function(){
    
      });

    });

    describe('request to unblock a user by passing invalid user-id', async function(){

      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting "errorCode": 1000', async function(){
        
      });

      it('expecting expecting an error message "blockeeUserId must be a valid UUID', async function(){
        
      });

    });

    describe('request to unblock an user who is not blocked', async function(){

        before( async function() {
  
  
        });
  
        it('expecting request status to be 400', async function(){
          
        });
  
        it('expecting "errorCode": 2007', async function(){
          
        });
  
        it('expecting expecting an error message "User is not blocked or was not blocked by you', async function(){
          
        });
  
      });

  });

  xdescribe('/users/suggested-usernames', async function(){
  
    describe('request to get suggested usernames', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting usernameSuggestions to be present', async function(){
        
      });

    });

  });

});


