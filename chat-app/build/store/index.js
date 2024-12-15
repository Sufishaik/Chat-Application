"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.resetPersistedStore = exports.persistor = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _reducers = require("./reducers");
var _reduxPersist = require("redux-persist");
var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));
var _autoMergeLevel = _interopRequireDefault(require("redux-persist/lib/stateReconciler/autoMergeLevel2"));
var _chatIndex = require("./reducers/chatIndex");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const persistConfig = {
  key: 'root',
  // Key for the storage
  storage: _storage.default,
  // You can use localStorage or sessionStorage
  whitelist: ['auth', 'chat'],
  stateReconciler: _autoMergeLevel.default
};
const rootReducer = (0, _toolkit.combineReducers)({
  auth: _reducers.authSlice.reducer,
  chat: _chatIndex.chatSlice.reducer
});
const persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, rootReducer);
const store = exports.store = (0, _toolkit.configureStore)({
  reducer: persistedReducer
  // Add any middleware you need
});
const persistor = exports.persistor = (0, _reduxPersist.persistStore)(store);
const resetPersistedStore = () => {
  persistor.purge(); // Clears the persisted storage
};
exports.resetPersistedStore = resetPersistedStore;