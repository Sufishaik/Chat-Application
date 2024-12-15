"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsTrigger = exports.TabsList = exports.TabsContent = exports.Tabs = void 0;
var React = _interopRequireWildcard(require("react"));
var TabsPrimitive = _interopRequireWildcard(require("@radix-ui/react-tabs"));
var _utils = require("../../lib/utils.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Tabs = exports.Tabs = TabsPrimitive.Root;
const TabsList = exports.TabsList = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    className,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(TabsPrimitive.List, _extends({
    ref: ref,
    className: (0, _utils.cn)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)
  }, props));
});
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = exports.TabsTrigger = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  let {
    className,
    ...props
  } = _ref2;
  return /*#__PURE__*/React.createElement(TabsPrimitive.Trigger, _extends({
    ref: ref,
    className: (0, _utils.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className)
  }, props));
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = exports.TabsContent = /*#__PURE__*/React.forwardRef((_ref3, ref) => {
  let {
    className,
    ...props
  } = _ref3;
  return /*#__PURE__*/React.createElement(TabsPrimitive.Content, _extends({
    ref: ref,
    className: (0, _utils.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)
  }, props));
});
TabsContent.displayName = TabsPrimitive.Content.displayName;