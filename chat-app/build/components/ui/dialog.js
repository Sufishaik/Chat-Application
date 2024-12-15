"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogTrigger = exports.DialogTitle = exports.DialogPortal = exports.DialogOverlay = exports.DialogHeader = exports.DialogFooter = exports.DialogDescription = exports.DialogContent = exports.DialogClose = exports.Dialog = void 0;
var React = _interopRequireWildcard(require("react"));
var DialogPrimitive = _interopRequireWildcard(require("@radix-ui/react-dialog"));
var _lucideReact = require("lucide-react");
var _utils = require("@/lib/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Dialog = exports.Dialog = DialogPrimitive.Root;
const DialogTrigger = exports.DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = exports.DialogPortal = DialogPrimitive.Portal;
const DialogClose = exports.DialogClose = DialogPrimitive.Close;
const DialogOverlay = exports.DialogOverlay = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    className,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(DialogPrimitive.Overlay, _extends({
    ref: ref,
    className: (0, _utils.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)
  }, props));
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = exports.DialogContent = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  let {
    className,
    children,
    ...props
  } = _ref2;
  return /*#__PURE__*/React.createElement(DialogPortal, null, /*#__PURE__*/React.createElement(DialogOverlay, null), /*#__PURE__*/React.createElement(DialogPrimitive.Content, _extends({
    ref: ref,
    className: (0, _utils.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className)
  }, props), children, /*#__PURE__*/React.createElement(DialogPrimitive.Close, {
    className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
  }, /*#__PURE__*/React.createElement(_lucideReact.X, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Close"))));
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = _ref3 => {
  let {
    className,
    ...props
  } = _ref3;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: (0, _utils.cn)("flex flex-col space-y-1.5 text-center sm:text-left", className)
  }, props));
};
exports.DialogHeader = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = _ref4 => {
  let {
    className,
    ...props
  } = _ref4;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: (0, _utils.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)
  }, props));
};
exports.DialogFooter = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = exports.DialogTitle = /*#__PURE__*/React.forwardRef((_ref5, ref) => {
  let {
    className,
    ...props
  } = _ref5;
  return /*#__PURE__*/React.createElement(DialogPrimitive.Title, _extends({
    ref: ref,
    className: (0, _utils.cn)("text-lg font-semibold leading-none tracking-tight", className)
  }, props));
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = exports.DialogDescription = /*#__PURE__*/React.forwardRef((_ref6, ref) => {
  let {
    className,
    ...props
  } = _ref6;
  return /*#__PURE__*/React.createElement(DialogPrimitive.Description, _extends({
    ref: ref,
    className: (0, _utils.cn)("text-sm text-muted-foreground", className)
  }, props));
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;