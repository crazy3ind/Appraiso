import "./App.css"
import {PrimeReactProvider} from "primereact/api"
import {BrowserRouter} from "react-router-dom"
import Index from "./common/routes/Index"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import {Provider} from "react-redux"
import Store from "./Store"

function App() {
  return (
    <>
      <Provider store={Store}>
        <PrimeReactProvider>
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        </PrimeReactProvider>
      </Provider>
    </>
  )
}

export default App
