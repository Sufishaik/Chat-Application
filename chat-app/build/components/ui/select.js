"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectValue = exports.SelectTrigger = exports.SelectSeparator = exports.SelectScrollUpButton = exports.SelectScrollDownButton = exports.SelectLabel = exports.SelectItem = exports.SelectGroup = exports.SelectContent = exports.Select = void 0;
var React = _interopRequireWildcard(require("react"));
var SelectPrimitive = _interopRequireWildcard(require("@radix-ui/react-select"));
var _lucideReact = require("lucide-react");
var _utils = require("@/lib/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Select = exports.Select = SelectPrimitive.Root;
const SelectGroup = exports.SelectGroup = SelectPrimitive.Group;
const SelectValue = exports.SelectValue = SelectPrimitive.Value;
const SelectTrigger = exports.SelectTrigger = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    className,
    children,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(SelectPrimitive.Trigger, _extends({
    ref: ref,
    className: (0, _utils.cn)("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className)
  }, props), children, /*#__PURE__*/React.createElement(SelectPrimitive.Icon, {
    asChild: true
  }, /*#__PURE__*/React.createElement(_lucideReact.ChevronDown, {
    className: "h-4 w-4 opacity-50"
  })));
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = exports.SelectScrollUpButton = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  let {
    className,
    ...props
  } = _ref2;
  return /*#__PURE__*/React.createElement(SelectPrimitive.ScrollUpButton, _extends({
    ref: ref,
    className: (0, _utils.cn)("flex cursor-default items-center justify-center py-1", className)
  }, props), /*#__PURE__*/React.createElement(_lucideReact.ChevronUp, {
    className: "h-4 w-4"
  }));
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = exports.SelectScrollDownButton = /*#__PURE__*/React.forwardRef((_ref3, ref) => {
  let {
    className,
    ...props
  } = _ref3;
  return /*#__PURE__*/React.createElement(SelectPrimitive.ScrollDownButton, _extends({
    ref: ref,
    className: (0, _utils.cn)("flex cursor-default items-center justify-center py-1", className)
  }, props), /*#__PURE__*/React.createElement(_lucideReact.ChevronDown, {
    className: "h-4 w-4"
  }));
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = exports.SelectContent = /*#__PURE__*/React.forwardRef((_ref4, ref) => {
  let {
    className,
    children,
    position = "popper",
    ...props
  } = _ref4;
  return /*#__PURE__*/React.createElement(SelectPrimitive.Portal, null, /*#__PURE__*/React.createElement(SelectPrimitive.Content, _extends({
    ref: ref,
    className: (0, _utils.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
    position: position
  }, props), /*#__PURE__*/React.createElement(SelectScrollUpButton, null), /*#__PURE__*/React.createElement(SelectPrimitive.Viewport, {
    className: (0, _utils.cn)("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")
  }, children), /*#__PURE__*/React.createElement(SelectScrollDownButton, null)));
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = exports.SelectLabel = /*#__PURE__*/React.forwardRef((_ref5, ref) => {
  let {
    className,
    ...props
  } = _ref5;
  return /*#__PURE__*/React.createElement(SelectPrimitive.Label, _extends({
    ref: ref,
    className: (0, _utils.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold", className)
  }, props));
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = exports.SelectItem = /*#__PURE__*/React.forwardRef((_ref6, ref) => {
  let {
    className,
    children,
    ...props
  } = _ref6;
  return /*#__PURE__*/React.createElement(SelectPrimitive.Item, _extends({
    ref: ref,
    className: (0, _utils.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
  }, /*#__PURE__*/React.createElement(SelectPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(_lucideReact.Check, {
    className: "h-4 w-4"
  }))), /*#__PURE__*/React.createElement(SelectPrimitive.ItemText, null, children));
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = exports.SelectSeparator = /*#__PURE__*/React.forwardRef((_ref7, ref) => {
  let {
    className,
    ...props
  } = _ref7;
  return /*#__PURE__*/React.createElement(SelectPrimitive.Separator, _extends({
    ref: ref,
    className: (0, _utils.cn)("-mx-1 my-1 h-px bg-muted", className)
  }, props));
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;