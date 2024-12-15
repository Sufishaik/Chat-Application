import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { chatSlice } from './reducers/chatIndex';


const persistConfig = {
    key: 'root', // Key for the storage
    storage, // You can use localStorage or sessionStorage
    whitelist: ['auth', 'chat'],
    stateReconciler: autoMergeLevel2,
};


const rootReducer = combineReducers({
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    // Add any middleware you need
});





const persistor = persistStore(store);

export const resetPersistedStore = () => {
    persistor.purge(); // Clears the persisted storage

};


export { store, persistor };
