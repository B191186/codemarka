import React from "react";
import { connect } from 'react-redux'
import {Switch,withRouter,Route} from 'react-router-dom';

import * as actions from './redux/actions/index';
import * as url from './config/url';

// const classrooom = React.lazy(() => import('./containers/classroom/Environment'));
const logout = React.lazy(() => import('./containers/auth/Logout'));

 const Home = React.lazy(() => import('./containers/public/Home/Home'));
const Login = React.lazy(() => import('./containers/auth/Login'));
const Register = React.lazy(() => import('./containers/auth/Register'));
const ForgotPassword = React.lazy(() => import('./containers/auth/ForgotPassword'));
const ChangePassword = React.lazy(() => import('./containers/auth/ChangePassword'));

const NotFound = React.lazy(() => import('./containers/public/404'));

const Routes = (props) => {
    let routes = (
        <Switch>  
<Route exact component={Home} path={url.HOME} />
<Route exact component={Login} path={url.AUTH_SIGN_IN} />
<Route exact component={Register} path={url.AUTH_SIGN_UP} />
<Route exact component={ForgotPassword} path={url.AUTH_FORGOT_PASSWORD} />
<Route component={NotFound} />

        </Switch>
      );
  
      if(props.isAutheticated){
        routes = (
  <Switch>
<Route exact component={Home} path={url.HOME} />
<Route exact component={ChangePassword} path={url.AUTH_CHANGE_PASSWORD} />
<Route exact component={logout} path={url.AUTH_LOGOUT} />

  </Switch>
        )
      }
    return (
<React.Fragment>
    {routes}
</React.Fragment>
    );
}
const mapStateToProps = state => {
    return {
      isAutheticated: state.auth.token !== null
    }
  }
  
  const matchDispatchToProps = (dispatch) => {
    return {
  onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
  };
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Routes));
  