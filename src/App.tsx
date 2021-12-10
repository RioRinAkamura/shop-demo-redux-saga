import { useAppSelector } from 'app/hooks';
import { PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { User } from 'components/Layout/User';
import Cart from 'components/pages/Common/Cart';
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
  const currentUser = useAppSelector(state => state.authReducer.currentUser)

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
