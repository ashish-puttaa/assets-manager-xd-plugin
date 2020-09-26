const useCombinedReducers = (combinedReducers) => {
   const state = Object.keys(combinedReducers).reduce(
      (acc, key) => ({ ...acc, [key]: combinedReducers[key][0] }),
      {}
   );

   const dispatch = (action) =>
      Object.keys(combinedReducers)
         .map((key) => combinedReducers[key][1])
         .forEach((fn) => fn(action));

   return [state, dispatch];
};

module.exports = useCombinedReducers;

/*
   EXAMPLE:

   import React from 'react';
   import useCombinedReducers from 'use-combined-reducers';

   const App = () => {
      const [state, dispatch] = useCombinedReducers({
         user: React.useReducer(userReducer, userInitialState),
         cart: React.useReducer(cartReducer, cartIntitialState),
      });

      const { user, cart } = state;

      ...
   }

   export default App;
*/
