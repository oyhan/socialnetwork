import '../styles/globals.css'
import BaseLayout from '../common/BaseLayout'
import RTL from '../common/Rtl'
import '../styles/rtl.css'
import { initialState, StateProvider } from '../lib/store/appState'
import mainReducer from '../lib/reducer'
import "../lib/typings/yup/yup.nationalCode";
import { CookiesProvider } from "react-cookie"
import { ToastContainer } from 'react-toastify'

import { appWithTranslation } from 'next-i18next'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  toast: {
    borderRadius: 0
  }
}))

function MyApp({ Component, pageProps }) {
  const classes = useStyle();
  return (

    <StateProvider initialState={initialState} reducer={mainReducer}>
      <RTL>
        <CookiesProvider>
          <BaseLayout >
            <Component {...pageProps} />
            <ToastContainer toastClassName={classes.toast} bodyStyle={{ width: '100%', borderRadius: 0 }} rtl hideProgressBar />
          </BaseLayout>
        </CookiesProvider>
      </RTL>
    </StateProvider>
  )

}
export default appWithTranslation(MyApp)

