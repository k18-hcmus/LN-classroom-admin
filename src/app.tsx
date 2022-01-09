import { useEffect } from 'react';
import {
    Redirect, Route,
    Switch, useHistory, useLocation
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from './app/hooks';
import ListRouter from "./app/routes";
import AlertSnackBar from './core/components/alert';
import LoadingScreen from './core/components/loading-screen';
import PageNotFound from './core/components/page-not-found';
import LoginPage from './core/signin';
import UserProfile from './core/user-profile';
import UserProfileMapping from './core/user-profile/components/user-profile-mapping';
import Layout from './layout';
import { getAllClassroom } from './slices/classroom-slice';
import { checkAuthentication } from './slices/user-slice';

const PRE_URL = 'preUrl'

const App = () => {
    const isAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated)
    const isLoading = useAppSelector((state) => state.userReducer.isLoading)
    const history = useHistory()
    const location = useLocation()
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(checkAuthentication())
    }, [dispatch])

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAllClassroom())
            const preUrl = localStorage.getItem(PRE_URL) || "/"
            history && history.push(preUrl)
            localStorage.removeItem(PRE_URL)
        }

    }, [isAuthenticated, dispatch, history])

    return (
        <>
            {isLoading && <LoadingScreen />}
            {
                !isAuthenticated ?
                    (<Switch>
                        <Route exact path={"/login"} component={LoginPage} />
                        <Route path={"*"} render={() => {
                            if (location.pathname !== '/')
                                localStorage.setItem(PRE_URL, location.pathname)
                            return <Redirect to='/login' />
                        }} />
                    </Switch>) :
                    <Layout>
                        {ListRouter.map((route, index) => (
                            <Route
                                key={index}
                                exact={route.exactPath}
                                path={route.path}
                                render={() => (
                                    <route.component name={route.name} />
                                )}
                            />
                        ))}
                        <Route exact path={"/users/:userId"} component={UserProfileMapping} />
                        <Route exact path={"/profile"} component={UserProfile} />
                        <Route path={"*"} component={PageNotFound} />
                    </Layout>
            }
            <AlertSnackBar />
        </>
    );
}

export default App;