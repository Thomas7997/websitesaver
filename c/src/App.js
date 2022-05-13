import {
  useEffect
} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Provider } from 'react-redux';
import store from './store';
import RoutesComponents from './components/common/Routes';

function App() {
  // useEffect(() => {
  //   window.location.reload(false);
  // });

  return (
    <Provider store={store}>
      <RoutesComponents />
    </Provider>
  );
}

export default App;
