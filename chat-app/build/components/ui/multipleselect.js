"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useDebounce = useDebounce;
var _cmdk = require("cmdk");
var _lucideReact = require("lucide-react");
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _badge = require("@/components/ui/badge");
var _command = require("@/components/ui/command");
var _utils = require("@/lib/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CommandEmpty = /*#__PURE__*/(0, _react.forwardRef)((_ref, forwardedRef) => {
  let {
    className,
    ...props
  } = _ref;
  const render = (0, _cmdk.useCommandState)(state => state.filtered.count === 0);
  if (!render) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: forwardedRef,
    className: (0, _utils.cn)("py-6 text-center text-sm", className),
    "cmdk-empty": "",
    role: "presentation"
  }, props));
});
CommandEmpty.displayName = "CommandEmpty";
const MultipleSelector = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  let {
    value,
    onChange,
    placeholder,
    defaultOptions: arrayDefaultOptions = [],
    options: arrayOptions,
    delay,
    onSearch,
    loadingIndicator,
    emptyIndicator,
    maxSelected = Number.MAX_SAFE_INTEGER,
    onMaxSelected,
    hidePlaceholderWhenSelected,
    disabled,
    groupBy,
    className,
    badgeClassName,
    selectFirstItem = true,
    creatable = false,
    triggerSearchOnFocus = false,
    commandProps,
    inputProps,
    hideClearAllButton = false
  } = _ref2;
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const mouseOn = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(value || []);
  const [options, setOptions] = React.useState(transToGroupOption(arrayDefaultOptions, groupBy));
  const [inputValue, setInputValue] = React.useState("");
  const debouncedSearchTerm = useDebounce(inputValue, delay || 500);
  React.useImperativeHandle(ref, () => ({
    selectedValue: [...selected],
    input: inputRef.current,
    focus: () => inputRef.current?.focus()
  }), [selected]);
  const handleUnselect = React.useCallback(option => {
    const newOptions = selected.filter(s => s.value !== option.value);
    setSelected(newOptions);
    onChange?.(newOptions);
  }, [onChange, selected]);
  const handleKeyDown = React.useCallback(e => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && selected.length > 0) {
          const lastSelectOption = selected[selected.length - 1];
          // If last item is fixed, we should not remove it.
          if (!lastSelectOption.fixed) {
            handleUnselect(selected[selected.length - 1]);
          }
        }
      }
      // This is not a default behavior of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, [handleUnselect, selected]);
  (0, _react.useEffect)(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);
  (0, _react.useEffect)(() => {
    /** If `onSearch` is provided, do not trigger options updated. */
    if (!arrayOptions || onSearch) {
      return;
    }
    const newOption = transToGroupOption(arrayOptions || [], groupBy);
    if (JSON.stringify(newOption) !== JSON.stringify(options)) {
      setOptions(newOption);
    }
  }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);
  (0, _react.useEffect)(() => {
    const doSearch = async () => {
      setIsLoading(true);
      const res = await onSearch?.(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
      setIsLoading(false);
    };
    const exec = async () => {
      if (!onSearch || !open) return;
      if (triggerSearchOnFocus) {
        await doSearch();
      }
      if (debouncedSearchTerm) {
        await doSearch();
      }
    };
    void exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);
  const CreatableItem = () => {
    if (!creatable) return undefined;
    if (isOptionsExist(options, [{
      value: inputValue,
      label: inputValue
    }]) || selected.find(s => s.value === inputValue)) {
      return undefined;
    }
    const Item = /*#__PURE__*/React.createElement(_command.CommandItem, {
      value: inputValue,
      className: "cursor-pointer",
      onMouseDown: e => {
        e.preventDefault();
        e.stopPropagation();
      },
      onSelect: value => {
        if (selected.length >= maxSelected) {
          onMaxSelected?.(selected.length);
          return;
        }
        setInputValue("");
        const newOptions = [...selected, {
          value,
          label: value
        }];
        setSelected(newOptions);
        onChange?.(newOptions);
      }
    }, `Create "${inputValue}"`);

    // For normal creatable
    if (!onSearch && inputValue.length > 0) {
      return Item;
    }

    // For async search creatable. avoid showing creatable item before loading at first.
    if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
      return Item;
    }
    return undefined;
  };
  const EmptyItem = React.useCallback(() => {
    if (!emptyIndicator) return undefined;

    // For async search that showing emptyIndicator
    if (onSearch && !creatable && Object.keys(options).length === 0) {
      return /*#__PURE__*/React.createElement(_command.CommandItem, {
        value: "-",
        disabled: true
      }, emptyIndicator);
    }
    return /*#__PURE__*/React.createElement(CommandEmpty, null, emptyIndicator);
  }, [creatable, emptyIndicator, onSearch, options]);
  const selectables = React.useMemo(() => removePickedOption(options, selected), [options, selected]);

  /** Avoid Creatable Selector freezing or lagging when paste a long string. */
  const commandFilter = React.useCallback(() => {
    if (commandProps?.filter) {
      return commandProps.filter;
    }
    if (creatable) {
      return (value, search) => {
        return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      };
    }
    // Using default filter in `cmdk`. We don't have to provide it.
    return undefined;
  }, [creatable, commandProps?.filter]);
  return /*#__PURE__*/React.createElement(_command.Command, _extends({}, commandProps, {
    onKeyDown: e => {
      handleKeyDown(e);
      commandProps?.onKeyDown?.(e);
    },
    className: (0, _utils.cn)("h-auto overflow-visible bg-transparent", commandProps?.className),
    shouldFilter: commandProps?.shouldFilter !== undefined ? commandProps.shouldFilter : !onSearch // When onSearch is provided, we don't want to filter the options. You can still override it.
    ,
    filter: commandFilter()
  }), /*#__PURE__*/React.createElement("div", {
    className: (0, _utils.cn)("min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2", {
      "px-3 py-2": selected.length !== 0,
      "cursor-text": !disabled && selected.length !== 0
    }, className),
    onClick: () => {
      if (disabled) return;
      inputRef.current?.focus();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3"
  }, selected.map(option => {
    return /*#__PURE__*/React.createElement(_badge.Badge, {
      key: option.value,
      className: (0, _utils.cn)("data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground bg-purple-500 p-2", "data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground", badgeClassName),
      "data-fixed": option.fixed,
      "data-disabled": disabled || undefined
    }, option.label, /*#__PURE__*/React.createElement("button", {
      className: (0, _utils.cn)("ml-1 rounded-full  outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2", (disabled || option.fixed) && "hidden"),
      onKeyDown: e => {
        if (e.key === "Enter") {
          handleUnselect(option);
        }
      },
      onMouseDown: e => {
        e.preventDefault();
        e.stopPropagation();
      },
      onClick: () => handleUnselect(option)
    }, /*#__PURE__*/React.createElement(_lucideReact.X, {
      className: "h-4 w-4 text-black  hover:text-purple-500"
    })));
  }), /*#__PURE__*/React.createElement(_cmdk.Command.Input, _extends({}, inputProps, {
    ref: inputRef,
    value: inputValue,
    disabled: disabled,
    onValueChange: value => {
      setInputValue(value);
      inputProps?.onValueChange?.(value);
    },
    onBlur: event => {
      if (mouseOn.current === false) {
        setOpen(false);
      }
      inputProps?.onBlur?.(event);
    },
    onFocus: event => {
      setOpen(true);
      triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
      inputProps?.onFocus?.(event);
    },
    placeholder: hidePlaceholderWhenSelected && selected.length !== 0 ? "" : placeholder,
    className: (0, _utils.cn)("flex-1 bg-transparent outline-none placeholder:text-muted-foreground", {
      "w-full": hidePlaceholderWhenSelected,
      "px-3 py-2": selected.length === 0,
      "ml-1": selected.length !== 0
    }, inputProps?.className)
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setSelected(selected.filter(s => s.fixed)),
    className: (0, _utils.cn)((hideClearAllButton || disabled || selected.length < 1 || selected.filter(s => s.fixed).length === selected.length) && "hidden")
  }, /*#__PURE__*/React.createElement(_lucideReact.X, null)))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, open && /*#__PURE__*/React.createElement(_command.CommandList, {
    className: "absolute top-1 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in",
    onMouseLeave: () => {
      mouseOn.current = false;
    },
    onMouseEnter: () => {
      mouseOn.current = true;
    },
    onMouseUp: () => {
      inputRef.current?.focus();
    }
  }, isLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, loadingIndicator) : /*#__PURE__*/React.createElement(React.Fragment, null, EmptyItem(), CreatableItem(), !selectFirstItem && /*#__PURE__*/React.createElement(_command.CommandItem, {
    value: "-",
    className: "hidden"
  }), Object.entries(selectables).map(_ref3 => {
    let [key, dropdowns] = _ref3;
    return /*#__PURE__*/React.createElement(_command.CommandGroup, {
      key: key,
      heading: key,
      className: "h-full overflow-auto"
    }, /*#__PURE__*/React.createElement(React.Fragment, null, dropdowns.map(option => {
      return /*#__PURE__*/React.createElement(_command.CommandItem, {
        key: option.value,
        value: option.value,
        disabled: option.disable,
        onMouseDown: e => {
          e.preventDefault();
          e.stopPropagation();
        },
        onSelect: () => {
          if (selected.length >= maxSelected) {
            onMaxSelected?.(selected.length);
            return;
          }
          setInputValue("");
          const newOptions = [...selected, option];
          setSelected(newOptions);
          onChange?.(newOptions);
        },
        className: (0, _utils.cn)("cursor-pointer", option.disable && "cursor-default text-muted-foreground")
      }, option.label);
    })));
  })))));
});
MultipleSelector.displayName = "MultipleSelector";
var _default = exports.default = MultipleSelector;
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  (0, _react.useEffect)(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
function transToGroupOption(options, groupBy) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      "": options
    };
  }
  const groupOption = {};
  options.forEach(option => {
    const key = option[groupBy] || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}
function removePickedOption(groupOption, picked) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption));
  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(val => !picked.find(p => p.value === val.value));
  }
  return cloneOption;
}
function isOptionsExist(groupOption, targetOption) {
  for (const [, value] of Object.entries(groupOption)) {
    if (value.some(option => targetOption.find(p => p.value === option.value))) {
      return true;
    }
  }
  return false;
}