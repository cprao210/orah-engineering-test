import React from "react"
import { Provider } from "react-redux"
import { Routes, Route } from "react-router-dom"
import "shared/helpers/load-icons"
import { Header } from "staff-app/components/header/header.component"
import { HomeBoardPage } from "staff-app/daily-care/home-board.page"
import { ActivityPage } from "./platform/activity.page"
// import { ActivityPage } from "staff-app/platform/activity.page"
import { store } from "./store"

function App() {
  return (
    <>
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="daily-care" element={<HomeBoardPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="*" element={<div>No Match</div>} />
      </Routes></Provider>
    </>
  )
}

export default App
