import { useAppSelector } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { User } from 'components/Layout/User';
import { UserContext } from 'context/UserContext';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  // useEffect(()=>{
  //   categoryApi.getAll().then((response)=>console.log(response));

  // })
  const currentUser = useAppSelector(state => state.auth.currentUser)

  return (
      <UserContext.Provider value = {currentUser}>
        <div>
          <Switch>
                <PrivateRoute path="/admin">
                  <AdminLayout/>  
                </PrivateRoute>

                <Route path="/login">
                  <LoginPage/>
                </Route>

              <Route path="/">
                <User/>
              </Route>

            
            {/* <Route >
              <NotFound/>
            </Route> */}

          </Switch>
          <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        </div>
    </UserContext.Provider>
    
  );
}

export default App;
