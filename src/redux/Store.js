import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './RootReducer'
import thunk from 'redux-thunk';

//Is used to manage Redux store
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f, // Connect to redux devTool extention if exists
    )
);

export default store