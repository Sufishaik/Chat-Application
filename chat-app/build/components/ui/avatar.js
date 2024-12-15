"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvatarImage = exports.AvatarFallback = exports.Avatar = void 0;
var React = _interopRequireWildcard(require("react"));
var AvatarPrimitive = _interopRequireWildcard(require("@radix-ui/react-avatar"));
var _utils = require("@/lib/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Avatar = exports.Avatar = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    className,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(AvatarPrimitive.Root, _extends({
    ref: ref,
    className: (0, _utils.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)
  }, props));
});
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = exports.AvatarImage = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  let {
    className,
    ...props
  } = _ref2;
  return /*#__PURE__*/React.createElement(AvatarPrimitive.Image, _extends({
    ref: ref,
    className: (0, _utils.cn)("aspect-square h-full w-full", className)
  }, props));
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = exports.AvatarFallback = /*#__PURE__*/React.forwardRef((_ref3, ref) => {
  let {
    className,
    ...props
  } = _ref3;
  return /*#__PURE__*/React.createElement(AvatarPrimitive.Fallback, _extends({
    ref: ref,
    className: (0, _utils.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted", className)
  }, props));
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;