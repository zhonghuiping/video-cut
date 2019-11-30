import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRouter, routerMiddleware, push } from 'connected-react-router'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import user from './reducers/user'
import userActions from './actions/user'
import file from './reducers/file'
import fileActions from './actions/file'

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory)

  const actionCreators = {
    ...userActions,
    ...fileActions,
    push,
  }

  const reducers = {
    router: connectRouter(routerHistory),
    user,
    file,
  }

  const middlewares = [thunk, router]

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators })
    }
    return compose
  })()

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState())
  const rootReducer = combineReducers(reducers)

  return createStore(rootReducer, initialState, enhancer)
}
