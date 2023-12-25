import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './cmps/ToyDetails'
import { AppFooter } from './cmps/AppFooter'
import { ToyEdit } from './cmps/ToyEdit'





export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}


