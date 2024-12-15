"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationDefaultOptions = void 0;
exports.cn = cn;
exports.getColor = exports.colors = void 0;
var _clsx = require("clsx");
var _tailwindMerge = require("tailwind-merge");
var _lottieJson = _interopRequireDefault(require("../assests/lottie-json.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function cn() {
  for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
    inputs[_key] = arguments[_key];
  }
  return (0, _tailwindMerge.twMerge)((0, _clsx.clsx)(inputs));
}
const colors = exports.colors = ["bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]", "bg-[#ffd60a2a] text-[#ffd06a] border-[1px] border-[#ffd60abb]", "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]", "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]"];
const getColor = color => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};
exports.getColor = getColor;
const animationDefaultOptions = exports.animationDefaultOptions = {
  loop: true,
  autoPlay: true,
  animationData: _lottieJson.default
};