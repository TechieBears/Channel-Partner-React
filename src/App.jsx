import ProjectRoutes from "../routes/ProjectRoutes";
import "./App.css";
import { Provider } from 'react-redux'
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
let persistor = persistStore(store);
import { PrimeReactProvider } from 'primereact/api';
import { getToken } from "firebase/messaging";
import { useEffect } from "react";
import { messaging } from "./firebase";


const App = () => {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BCNE5irFD6vNPpidF6AKkRjZ5KVq_g4M8HSAPGtRd9j9JGHgTVwQ085FCpW73Xp1rO_Dj0fUVhCpUtjC3mk0fT4",
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);
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
