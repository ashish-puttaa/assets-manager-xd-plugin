const React = require('react');
const useCombinedReducers = require('../hooks/useCombinedReducers.js');

const settingsReducer = require('./settings/settings.reducer.js');
const categoriesReducer = require('./categories/categories.reducer.js');
const assetsReducer = require('./assets/assets.reducer.js');

const DispatchContext = React.createContext();
const StateContext = React.createContext();

function GlobalState({ children }) {
   const [state, dispatch] = useCombinedReducers({
      settings: React.useReducer(settingsReducer, settingsReducer.initialState),
      categories: React.useReducer(categoriesReducer, categoriesReducer.initialState),
      assets: React.useReducer(assetsReducer, assetsReducer.initialState),
   });

   return (
      <DispatchContext.Provider value={dispatch}>
         <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
   );
}

GlobalState.DispatchContext = DispatchContext;
GlobalState.StateContext = StateContext;

const useGlobalState = () => {
   const dispatch = React.useContext(DispatchContext);
   const context = React.useContext(StateContext);

   return [context, dispatch];
};

GlobalState.useGlobalState = useGlobalState;

module.exports = GlobalState;
