

export const initFacebookSdk = () => {
    return new Promise((resolve, reject) => {
      // Load the Facebook SDK asynchronously
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: '2005692247496213', 
          cookie: true,
          xfbml: true,
          version: 'v19.0'
        });
        // Resolve the promise when the SDK is loaded
        resolve();
      };
    })
  }

export const getFacebookLoginStatus = () => {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus((response) => {
        resolve(response);
      });
    });
  };



  /*
  export const fbLogin = () => {
  return new Promise((resolve, reject) => {

    if (!window.FB) {
      reject("FB SDK not loaded");
      return;
    }

   window.FB.login(function(response) {

  if (response.status !== "connected") {
    reject("User not authenticated");
    return;
  }

  window.FB.api('/me', { fields: 'name,email' }, function(user) {

    if (!user || user.error) {
      reject(user.error);
      return;
    }

    response.extra = user;
    resolve(response);

  });

}, {
  scope: 'public_profile,email,pages_show_list,pages_read_engagement',
  auth_type: 'rerequest',   // 🔥 forces permission dialog
  return_scopes: true       // 🔥 ensures scopes are returned
});

  });
};

*/


export const fbLogin = () => {
    return new Promise((resolve, reject) => {
     
  window.FB.login(function(response) {

    window.FB.api('/me', {fields: 'name, email'}, function(response2) {

            response['extra']=response2;
            resolve(response)  
                           });          
            },{
              config_id:'990283140195791'
            });
      //

    })
  }


  

