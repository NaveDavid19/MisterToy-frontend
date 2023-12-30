import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import "./assets/style/main.scss"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { store } from "./store/store"
import { AppHeader } from "./cmps/AppHeader"
import { ToyIndex } from "./pages/ToyIndex"
import { ToyDetails } from "./cmps/ToyDetails"
import { AppFooter } from "./cmps/AppFooter"
import { ToyEdit } from "./cmps/ToyEdit"
import { UserMsg } from "./cmps/UserMsg"
import { Dashboard } from "./pages/Dashboard"
import { ShoppingCart } from "./cmps/ShoppingCart"

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          <AppHeader />
          <main className="main-layout full">
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<Dashboard />} path="/dashboard" />
            </Routes>
            <UserMsg />
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}
