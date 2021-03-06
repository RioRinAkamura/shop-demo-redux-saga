import categoryApi from 'api/categoryApi';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // useEffect(()=>{
  //   categoryApi.getAll().then((response)=>console.log(response));

  // })

  return (
    <div>
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout/>  
        </PrivateRoute>

        <Route >
          <NotFound/>
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
  );
}

export default App;
