import { CircularProgress } from '@material-ui/core';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import BaseLayout from './BaseLayout';
import Routes from './Routes';


const AppLoader = ()=>{
    return <CircularProgress style={{position : 'fixed' , top:'50%' ,left : '50%'}}/>
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
                </Switch>
            </Suspense>
        </BaseLayout >
    )

}




