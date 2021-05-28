import { removeCredentials } from "../helper/cookieHelper";



const UserManager = {
     Save: function (user) {
          localStorage.setItem("user",JSON.stringify(user));
    },

    Load: function () {
        
        var userString = localStorage.getItem("user");
        if(userString){
            return JSON.parse(userString);
        }

        return null;
    },
    Login: function (httpContext, httpClient) {

    },

    IsAuthenticated: function () {
        const result = this.Load() != null;

        return result;
    },
    // ,
    // RefreshToken: async function (httpContext, httpClient) {
    //     refreshToken = cookieCutter.get("refreshToken");
    //     var refreshTokenHeader =
    //         { Cookie: refreshTokenHeader };
    //     httpClient.header = refreshTokenHeader;
    //     var response = await httpClient.Post("/User/RefreshToken/refresh-token", null, refreshTokenHeader)
        

    // }
    Signout : function(){
        this.Save("");
        removeCredentials();
        window.location.href="/start";
    }
}

export default UserManager;