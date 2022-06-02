import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./app/_app"
import storeReducer from './app/redux'

ReactDOM.render(
  <Provider store={storeReducer}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)