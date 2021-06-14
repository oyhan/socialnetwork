import { CssBaseline, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import useUserLayout from './infrastructure/LayoutSelector';
import RTL from './infrastructure/Rtl';
import * as serviceWorker from './serviceWorker';
import { AppWrapper } from './statemanagement/AppContext';
import "./typings/yup/yup.nationalCode";


const useStyle = makeStyles(theme => ({
  toast: {
    borderRadius: 0
  }
}))

function App() {
  const classes = useStyle();

  const updateServiceWorker = (registration) => () => {

    const waitingWorker = registration && registration.waiting;
    waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  };

  const onNewUpdate = (registration) => {
    toast.info("برای بروزرسانی برنامه کلیک کنید", {
      onClick: updateServiceWorker(registration),
      autoClose: false,
    })
  }
  useEffect(() => {
    console.log("srego");
    serviceWorker.register({ onUpdate: onNewUpdate });

  })

  return (
    <AppWrapper>
      < RTL >
        <CssBaseline />
        <Router>
          {
            useUserLayout()
          }
        </Router>
        <ToastContainer toastClassName={classes.toast} bodyStyle={{ width: '100%', borderRadius: 0 }} rtl hideProgressBar />
      </RTL >
    </AppWrapper>
  );
}

export default App;
