"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandShortcut = exports.CommandSeparator = exports.CommandList = exports.CommandItem = exports.CommandInput = exports.CommandGroup = exports.CommandEmpty = exports.CommandDialog = exports.Command = void 0;
var React = _interopRequireWildcard(require("react"));
var _cmdk = require("cmdk");
var _lucideReact = require("lucide-react");
var _utils = require("@/lib/utils");
var _dialog = require("@/components/ui/dialog");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Command = exports.Command = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    className,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(_cmdk.Command, _extends({
    ref: ref,
    className: (0, _utils.cn)("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className)
  }, props));
});
Command.displayName = _cmdk.Command.displayName;
const CommandDialog = _ref2 => {
  let {
    children,
    ...props
  } = _ref2;
  return /*#__PURE__*/React.createElement(_dialog.Dialog, props, /*#__PURE__*/React.createElement(_dialog.DialogContent, {
    className: "overflow-hidden p-0 shadow-lg"
  }, /*#__PURE__*/React.createElement(Command, {
    className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
  }, children)));
};
exports.CommandDialog = CommandDialog;
const CommandInput = exports.CommandInput = /*#__PURE__*/React.forwardRef((_ref3, ref) => {
  let {
    className,
    ...props
  } = _ref3;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center border-b px-3",
    "cmdk-input-wrapper": ""
  }, /*#__PURE__*/React.createElement(_lucideReact.Search, {
    className: "mr-2 h-4 w-4 shrink-0 opacity-50"
  }), /*#__PURE__*/React.createElement(_cmdk.Command.Input, _extends({
    ref: ref,
    className: (0, _utils.cn)("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props)));
});
CommandInput.displayName = _cmdk.Command.Input.displayName;
const CommandList = exports.CommandList = /*#__PURE__*/React.forwardRef((_ref4, ref) => {
  let {
    className,
    ...props
  } = _ref4;
  return /*#__PURE__*/React.createElement(_cmdk.Command.List, _extends({
    ref: ref,
    className: (0, _utils.cn)("max-h-[300px] overflow-y-auto overflow-x-hidden", className)
  }, props));
});
CommandList.displayName = _cmdk.Command.List.displayName;
const CommandEmpty = exports.CommandEmpty = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(_cmdk.Command.Empty, _extends({
  ref: ref,
  className: "py-6 text-center text-sm"
}, props)));
CommandEmpty.displayName = _cmdk.Command.Empty.displayName;
const CommandGroup = exports.CommandGroup = /*#__PURE__*/React.forwardRef((_ref5, ref) => {
  let {
    className,
    ...props
  } = _ref5;
  return /*#__PURE__*/React.createElement(_cmdk.Command.Group, _extends({
    ref: ref,
    className: (0, _utils.cn)("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className)
  }, props));
});
CommandGroup.displayName = _cmdk.Command.Group.displayName;
const CommandSeparator = exports.CommandSeparator = /*#__PURE__*/React.forwardRef((_ref6, ref) => {
  let {
    className,
    ...props
  } = _ref6;
  return /*#__PURE__*/React.createElement(_cmdk.Command.Separator, _extends({
    ref: ref,
    className: (0, _utils.cn)("-mx-1 h-px bg-border", className)
  }, props));
});
CommandSeparator.displayName = _cmdk.Command.Separator.displayName;
const CommandItem = exports.CommandItem = /*#__PURE__*/React.forwardRef((_ref7, ref) => {
  let {
    className,
    ...props
  } = _ref7;
  return /*#__PURE__*/React.createElement(_cmdk.Command.Item, _extends({
    ref: ref,
    className: (0, _utils.cn)("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className)
  }, props));
});
CommandItem.displayName = _cmdk.Command.Item.displayName;
const CommandShortcut = _ref8 => {
  let {
    className,
    ...props
  } = _ref8;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: (0, _utils.cn)("ml-auto text-xs tracking-widest text-muted-foreground", className)
  }, props));
};
exports.CommandShortcut = CommandShortcut;
CommandShortcut.displayName = "CommandShortcut";