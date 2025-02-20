import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import { combineReducers } from 'redux';

const contactsTransform = createTransform(
  inboundState => {
    return Array.isArray(inboundState) ? inboundState : [];
  },
  outboundState => {
    if (!Array.isArray(outboundState)) {
      return [];
    }
    return outboundState;
  },
  { whitelist: ['contacts'] }
);


const contactsPersistConfig = {
  key: 'contacts',
  storage,
  transforms: [contactsTransform], 
};

const persistedContactsReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

const rootReducer = combineReducers({
  contacts: persistedContactsReducer, 
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store, null, () => {
  console.log(
    '✅ Redux Persist State after rehydration:',
    store.getState().contacts
  );
});
