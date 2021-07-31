import { CircularProgress } from '@material-ui/core';
import { Suspense } from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import NotFoundPage from '../pages/404/NotFound';
import BaseLayout from './BaseLayout';
import Routes from './Routes';


export const AppLoader = () => {
    return <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />
}


export default function useUserLayout() {

    return (
        <BaseLayout>
            <Suspense fallback={<AppLoader />}>
                <Switch>

                    {Routes.user.map((r, i) => {
                        return r.private ?
                            <PrivateRoute key={i} exact path={r.path}>
                                {r.component}
                            </PrivateRoute> :
                            <Route key={i} exact path={r.path}>
                                {r.component}
                            </Route>
                    }
                    )}

                    <Route path="/404" component={NotFoundPage} />
                    <Redirect to="/404" />
                </Switch>
            </Suspense>
        </BaseLayout >
    )

}




