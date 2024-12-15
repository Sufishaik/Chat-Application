"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@refinedev/core");
var _devtools = require("@refinedev/devtools");
var _kbar = require("@refinedev/kbar");
var _reactRouterV = _interopRequireWildcard(require("@refinedev/react-router-v6"));
var _simpleRest = _interopRequireDefault(require("@refinedev/simple-rest"));
var _reactRouterDom = require("react-router-dom");
require("./App.css");
var _auth = require("./pages/auth");
var _chat = require("./pages/chat");
var _profile = require("./pages/profile");
var _reactRedux = require("react-redux");
var _ChannelProfile = require("./pages/chat/contact/ChannelProfile");
var _ProfileInsta = require("./ProfileInsta");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function App() {
  const userInfo = (0, _reactRedux.useSelector)(state => state?.auth?.userInfo);
  const PrivateRoute = _ref => {
    let {
      children
    } = _ref;
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/auth"
    });
  };
  const AuthRoute = _ref2 => {
    let {
      children
    } = _ref2;
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/"
    }) : children;
  };
  return /*#__PURE__*/React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/React.createElement(_kbar.RefineKbarProvider, null, /*#__PURE__*/React.createElement(_devtools.DevtoolsProvider, null, /*#__PURE__*/React.createElement(_core.Refine, {
    dataProvider: (0, _simpleRest.default)("https://chat-application-4std.onrender.com"),
    routerProvider: _reactRouterV.default
    // authProvider={authProvider}
    ,
    options: {
      syncWithLocation: true,
      warnWhenUnsavedChanges: true,
      useNewQueryKeys: true,
      projectId: "AizJQk-tSUiPs-UenYIW"
    }
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/auth",
    element: /*#__PURE__*/React.createElement(AuthRoute, null, /*#__PURE__*/React.createElement(_auth.Auth, null))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/React.createElement(PrivateRoute, null, /*#__PURE__*/React.createElement(_chat.Chat, null))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/profile",
    element: /*#__PURE__*/React.createElement(PrivateRoute, null, /*#__PURE__*/React.createElement(_profile.Profile, null))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/groupprofile",
    element: /*#__PURE__*/React.createElement(_ChannelProfile.CHannelProfile, null)
  })), /*#__PURE__*/React.createElement(_kbar.RefineKbar, null), /*#__PURE__*/React.createElement(_reactRouterV.UnsavedChangesNotifier, null), /*#__PURE__*/React.createElement(_reactRouterV.DocumentTitleHandler, null)))));
}
var _default = exports.default = App;