import * as actions from "actions/userActions";
import { UserService } from "services/UserService";

export const userReducer = (state, action) => {
  



  var user = state;
  switch (action.type) {
    case actions.LOGIN:
      user = action.user;
      UserService.singin(user);
      return user;

    case actions.LOGOFF:
      user = UserService.Logout();
      return user;

    case actions.ISAUTHENTICATED:
      user = UserService.Get();
      user.isAuthenticated = action.isAuthenticated;
      return user;

    case actions.UPDATECREDIT:
      user.RemainedCredit += action.credit;
      localStorage.setItem('user', JSON.stringify(user));
      return user;

    case actions.SHOWPROXY:
      user.proxy = action.proxy;
      user.showproxy = true;
      
      return user;
    case actions.HIDEPROXY:

      user.showproxy = false;
    default:
      return state;
  }
};
