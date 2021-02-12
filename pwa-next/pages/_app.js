import '../styles/globals.css'
import BaseLayout from '../common/BaseLayout'
import RTL from '../common/Rtl'
import '../styles/rtl.css'
import { initialState, StateProvider } from '../lib/store/appState'
import mainReducer from '../lib/reducer'
function MyApp({ Component, pageProps }) {

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <RTL>
        <BaseLayout >
          <Component {...pageProps} />
        </BaseLayout>
      </RTL>
    </StateProvider>
  )

}

export default MyApp
