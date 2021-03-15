import '../styles/globals.css'
import BaseLayout from '../common/BaseLayout'
import RTL from '../common/Rtl'
import '../styles/rtl.css'
import { initialState, StateProvider } from '../lib/store/appState'
import mainReducer from '../lib/reducer'
import 'leaflet/dist/leaflet.css';
import "../lib/typings/yup/yup.nationalCode";
import { CookiesProvider } from "react-cookie"
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'


function MyApp({ Component, pageProps }) {

  return (
    
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <RTL>
        <CookiesProvider>
          <BaseLayout >
            <Component {...pageProps} />
          </BaseLayout>
          <ToastContainer />
        </CookiesProvider>
      </RTL>
    </StateProvider>
  )

}
export default appWithTranslation(MyApp)

