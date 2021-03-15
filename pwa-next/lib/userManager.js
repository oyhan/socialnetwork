
import Cookies from 'cookies'


var UserManager = {
    Context: null,
    cookies: null,

    Save: function (user) {

    },

    Load: function (cookies) {
        if (!cookies.user) return null;

        var user = JSON.parse(cookies.user)
        // const user = this.cookies.get("user");
        

        return user;
    },
    Login: function (httpContext, httpClient) {

    },

    IsAuthenticated: function () {
        const result = this.Load() != null;

        return result;
    }
    ,
    RefreshToken: async function (httpContext, httpClient) {
        const cookies = new Cookies(httpContext.req, httpContext.res);
        
        refreshToken = cookies.get("refreshToken");
        var refreshTokenHeader =
            { Cookie: refreshTokenHeader };
        httpClient.header = refreshTokenHeader;
        var response = await httpClient.Post("http://localhost:12089/User/RefreshToken/refresh-token", null, refreshTokenHeader)
        

    }
}

export default function UserManagerBuilder(context) {
    UserManager.Context = context;
    const cookies = new Cookies(context.req, context.res);
    UserManager.cookies = cookies;
    return UserManager;
}
