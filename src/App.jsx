import ProjectRoutes from "../routes/ProjectRoutes";
import "./App.css";
import { Provider } from 'react-redux'
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
let persistor = persistStore(store);
import { PrimeReactProvider } from 'primereact/api';


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimeReactProvider>
          <ProjectRoutes />
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
