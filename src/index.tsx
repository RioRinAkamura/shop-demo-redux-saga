import { ConnectedRouter } from 'connected-react-router';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from 'translation/i18n';
import { history } from 'utils';
import App from './App';
import { store } from './app/store';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
        <ConnectedRouter history={history}>
          <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div>loading</div>}>
              <App />
            </Suspense>
          </I18nextProvider>
        </ConnectedRouter>
      {/* </BrowserRouter> */}
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
