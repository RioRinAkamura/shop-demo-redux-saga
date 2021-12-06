import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { User } from 'components/Layout/User';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
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
  );
}

export default App;
