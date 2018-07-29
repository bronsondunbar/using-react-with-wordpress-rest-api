import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './app/reducers'

const loggerMiddleware = createLogger()

export default function configureStore(history) {
  const store = createStore(
    combineReducers({
      rootReducer,
      router: routerReducer
    }),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerMiddleware(history)
    )
  )

  return store
}