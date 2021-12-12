'use strict'

describe('Users-PlatformJS', async function(){

  xdescribe('/users/password-change/request', async function(){
  
    describe('password change request by passing new valid password', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

      it('expecting token to be present', async function(){
        
      });

    });

    describe('password change request by passing same password', async function(){


      before( async function() {


      });
      
      it('expecting request status to be 400', async function(){
        
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "Please choose a password that you have not used before" to be present', async function(){
        
      });

    });

    describe('password change request by passing invalid password - Passing less than 8 characters', async function(){


      before( async function() {


      });
      
      it('expecting request status to be 400', async function(){
        
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "new_password must be at least 8 characters" to be present', async function(){
        
      });

    });

    describe('password change request by passing invalid password - Passing more than 8 characters without any uppercase letters', async function(){


      before( async function() {


      });
      
      it('expecting request status to be 400', async function(){
        
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "new_password must contain at least 1 capital letter" to be present', async function(){
        
      });

    });

    describe('password change request by passing invalid password - Passing more than 8 characters without any numbers', async function(){


      before( async function() {


      });
      
      it('expecting request status to be 400', async function(){
        
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "new_password must contain at least 1 number" to be present', async function(){
        
      });

    });

    describe('password change request by passing invalid password - Passing more than 8 characters without any special characters', async function(){


      before( async function() {


      });
      
      it('expecting request status to be 400', async function(){
        
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "new_password must contain at least one special character', async function(){
        
      });

    });
  
  });

  xdescribe('/users/password-change/confirm', async function(){
  
    describe('users password-change confirmation request', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

  });
      
  xdescribe('/users/ledger', async function(){
  
    describe('users ledger request', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting ledger details to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/portfolioData', async function(){
  
    describe('users portfolioData request', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting totalValue to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/referred', async function(){
  
    describe('users portfolioData request', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting user_id of reffered users to be present', async function(){
        
      });

      it('expecting username of reffered users to be present', async function(){
        
      });

      it('expecting email of reffered users to be present', async function(){
        
      });

      it('expecting referring_user_id of referring user to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/update-allow-marketing-emails', async function(){
  
    describe('Update user marketing settings - Enable', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

    describe('Update user marketing settings - Disable', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

  });

  xdescribe('/users/settings/notification', async function(){
  
    describe('Update user notification settings - Enable', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

    describe('Update user notification settings - Disable', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

  });

  xdescribe('/users/suggested-users', async function(){
  
    describe('get suggested users list', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting user-id of suggesed users to be present', async function(){
        
      });

      it('expecting username of suggesed users to be present', async function(){
        
      });

      it('expecting email of suggesed users to be present', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/deactivate', async function(){
  
    describe('Deactivate user - Access only for support-admin, support-user', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

  });

  xdescribe('/users/ban', async function(){
  
    describe('Ban user - Access only for support-admin, support-user', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

  });

  xdescribe('/users/unban', async function(){
  
    describe('Unban user - Access only for support-admin, support-user', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

  });

  xdescribe('/users/email-change/request', async function(){
  
    describe('request to set new email by passing valid email id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

      it('expecting token to be present', async function(){
        
      });

    });

    describe('request to set new email by passing invalid email id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "new_email must be a valid email" to be present', async function(){
        
      });

    });

    describe('request to set new email by passing already existing email id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:EMAIL_EXISTS', async function(){
        
      });

      it('expecting expecting an error message "Email already exists" to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/email-change/confirm', async function(){
  
    describe('confirm new email', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true be present', async function(){
        
      });

    });

  });

  xdescribe('/users/social-activity', async function(){
  
    describe('Users social activity', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting socialActivity of user to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/coins', async function(){
  
    describe('Users coinsSummary', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting coinsSummary of user to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/agree-tsncs', async function(){
  
    describe('Update users agree-tsncs - Enable', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

    describe('Update users agree-tsncs - Disable', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

  });

  xdescribe('/users/follow/assert', async function(){
  
    describe('Follow a user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

    describe('Follow a user by passing valid user-id of an already existing followee', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

    describe('Follow a user by passing invalid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "followee_user_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/follow/retract', async function(){
  
    describe('Unfollow a user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

    describe('Unfollow a user by passing valid user-id of a user who is not a followee', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

    describe('Unfollow a user by passing invalid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
          
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "followee_user_id must be a valid UUID" to be present', async function(){
        
      });

    });

  });

  xdescribe('/users/update', async function(){
  
    describe('Update users profile', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
          
      });

      it('expecting success:true', async function(){
        
      });

    });

  });

  xdescribe('/users/reject-suggested-user', async function(){
  
    describe('reject suggested user', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting success:true', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/search', async function(){
  
    describe('get suggested users list', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting user-id of users to be present', async function(){
        
      });

      it('expecting username of users to be present', async function(){
        
      });

      it('expecting email of users to be present', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/list', async function(){
  
    describe('get users list', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting user-id of users to be present', async function(){
        
      });

      it('expecting username of users to be present', async function(){
        
      });

      it('expecting email of users to be present', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/hide', async function(){
  
    describe('Hide a user, Access only for support-admin, support-user.', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting success:true', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/unhide', async function(){
  
    describe('Unhide a user, Access only for support-admin, support-user.', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting success:true', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/me-query', async function(){
  
    describe('Current user details', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting current user-id of current user', async function(){
        
      });

      it('expecting username of current user to be present', async function(){
        
      });

      it('expecting email of current user to be present', async function(){
        
      });

      it('expecting post-counts of current user to be present', async function(){
        
      });

      it('expecting mobile-number of current user to be present', async function(){
        
      });

      it('expecting question-count of current user to be present', async function(){
        
      });

      it('expecting wishlist-counts of current user to be present', async function(){
        
      });

      it('expecting connection-counts for followees and followers of current user to be present', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/user-search', async function(){
  
    describe('get users', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting user-id of user to be present', async function(){
        
      });

      it('expecting username of user to be present', async function(){
        
      });

      it('expecting email of user to be present', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/user-query-by-id', async function(){
  
    describe('get users details by passing user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting user-id of user to be present', async function(){
        
      });

      it('expecting username of user to be present', async function(){
        
      });

      it('expecting mobile-number of user to be present', async function(){
        
      });
  
    });

    describe('request users details by passing invalid user-id', async function(){


      before( async function() {


      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "userIds[0] must be a valid UUID" to be present', async function(){
        
      });

    });
    
  });

  xdescribe('/users/get-blocked-users', async function(){
  
    describe('get blocked users', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting user-id of blocked user to be present', async function(){
        
      });

      it('expecting username of blocked user to be present', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/block-user-command', async function(){
  
    describe('block a user by passing valid user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });
  
    });

    describe('block a user by passing already blocked user-id', async function(){


      before( async function() {


      });

      it('expecting request status to be 400', async function(){
        
      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "userIds[0] must be a valid UUID" to be present', async function(){
        
      });
  
    });

    describe('block a user by passing invalid user-id', async function(){


      before( async function() {


      });

      it('expecting code:VALIDATION_ERROR', async function(){
        
      });

      it('expecting expecting an error message "blockeeUserId must be a valid UUID', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/unblock-user-command', async function(){
  
    describe('unblock a user', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/update-user-profile-command', async function(){
  
    describe('Update user profile - Access only for support-admin, support-user.', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('Return - modified user details - Access only for support-admin, support-user', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/update-user-bio', async function(){
  
    describe('unblock a user', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('Return - modified user details - Access only for support-admin, support-user', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/update-user-profile-image-command', async function(){
  
    describe('unblock a user', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('Return - modified user details - Access only for support-admin, support-user', async function(){
        
      });
  
    });
    
  });

  xdescribe('/users/suggested-usernames', async function(){
  
    describe('suggested usernames', async function(){


      before( async function() {


      });

      it('expecting request status to be 200', async function(){
        
      });

      it('expecting usernameSuggestions to be present', async function(){
        
      });
  
    });
    
  });


});