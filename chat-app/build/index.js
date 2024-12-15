"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
require("./App.css");
var _App2 = _interopRequireDefault(require("./App"));
var _sonner = require("sonner");
var _Socket = require("./store/Socket.jsx");
var _react2 = require("redux-persist/integration/react");
var _reactRedux = require("react-redux");
var _store = require("./store");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const container = document.getElementById("root");
const root = (0, _client.createRoot)(container);
console.log('Initial State:', _store.store.getState());
root.render(
/*#__PURE__*/
// <React.StrictMode>
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: _store.store
}, /*#__PURE__*/_react.default.createElement(_Socket.SocketProvider, null, /*#__PURE__*/_react.default.createElement(_react2.PersistGate, {
  loading: null,
  persistor: _store.persistor,
  onBeforeLift: () => {
    console.log('Persisted State on Load:', _store.store.getState().chat.contacts);
  }
}, /*#__PURE__*/_react.default.createElement(_App2.default, null)))), /*#__PURE__*/_react.default.createElement(_sonner.Toaster, {
  closeButton: true
}))

// </React.StrictMode>
);