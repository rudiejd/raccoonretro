import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { AddSprintForm } from './features/sprints/AddSprintForm'
import { SprintsList } from './features/sprints/SprintList'
import { SprintPage } from './features/sprints/SprintPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddSprintForm />
                <SprintsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/sprints/:sprintId" component={SprintPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
