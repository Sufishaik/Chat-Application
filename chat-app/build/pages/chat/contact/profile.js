"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileContact = void 0;
var _avatar = require("@/components/ui/avatar");
var _reducers = require("@/store/reducers");
var _axios = _interopRequireDefault(require("axios"));
var _fi = require("react-icons/fi");
var _io = require("react-icons/io5");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _sonner = require("sonner");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProfileContact = () => {
  const userInfo = (0, _reactRedux.useSelector)(state => state?.auth?.userInfo);
  const navigate = (0, _reactRouterDom.useNavigate)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const handleLogout = async () => {
    try {
      const resp = await _axios.default.post('https://chat-application-4std.onrender.com/api/auth/logout', {}, {
        withCredentials: true
      });
      if (resp.status === 200) {
        _sonner.toast.success("Successfully Logout");
        navigate("/auth");
        dispatch((0, _reducers.setUserInfo)(null));
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex h-15 items-center justify-center mx-[0px auto] pr-10 gap-4 p-2 bg-[#2a2b33] w-full pl-10 absolute bottom-0 cursor-pointer"
  }, /*#__PURE__*/React.createElement(_avatar.Avatar, {
    className: "h-12 w-12  rounded-full overflow-hidden"
  }, userInfo.image ? /*#__PURE__*/React.createElement(_avatar.AvatarImage, {
    src: `https://chat-application-4std.onrender.com/${userInfo.image}`,
    className: "object-cover w-full h-full bg-black"
  }) : /*#__PURE__*/React.createElement("div", {
    className: `uppercase h-12 w-12 text-lg boder-[1px] flex items-center justify-center `
  }, userInfo.firstName ? userInfo.firstName.split("").shift() : userInfo?.email?.split("").shift())), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, `${userInfo?.firstName} ${userInfo?.lastName}`), /*#__PURE__*/React.createElement(_fi.FiEdit2, {
    className: "text-black",
    onClick: () => navigate("/profile")
  }), /*#__PURE__*/React.createElement(_io.IoPowerSharp, {
    className: "text-red-500",
    onClick: handleLogout
  }))));
};
exports.ProfileContact = ProfileContact;