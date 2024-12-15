"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;
var _avatar = require("@/components/ui/avatar");
var _react = require("react");
var _io = require("react-icons/io5");
var _fa = require("react-icons/fa");
var _input = require("@/components/ui/input");
var _button = require("@/components/ui/button");
var _reactRedux = require("react-redux");
var _reducers = require("@/store/reducers");
var _sonner = require("sonner");
var _axios = _interopRequireDefault(require("axios"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Profile = () => {
  const [image, setImage] = (0, _react.useState)(null);
  const [hovered, setHovered] = (0, _react.useState)(false);
  const [firstName, setFirstName] = (0, _react.useState)('');
  const [lastName, setLastName] = (0, _react.useState)('');
  const userInfo = (0, _reactRedux.useSelector)(state => state?.auth?.userInfo);
  const dispatch = (0, _reactRedux.useDispatch)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const validateProfile = () => {
    if (!firstName) {
      _sonner.toast.error('Please Enter First Name');
      return false;
    }
    if (!lastName) {
      _sonner.toast.error('Please Enter last Name');
      return false;
    }
    return true;
  };
  const fileInputRef = (0, _react.useRef)(null);
  const handleSave = async () => {
    if (validateProfile()) {
      try {
        const resp = await _axios.default.post('https://chat-application-4std.onrender.com/api/auth/updateProfile', {
          firstName,
          lastName
        }, {
          withCredentials: true
        });
        if (resp.status === 200 && resp.data.id) {
          dispatch((0, _reducers.setUserInfo)({
            ...resp.data
          }));
          _sonner.toast.success("Profile updated successfully");
          navigate("/");
        } else {
          _sonner.toast.error("Failed to update profile. Please try again.");
        }
      } catch (err) {
        console.log("Error", err);
        _sonner.toast.error("An error occurred while updating the profile.");
      }
    }
  };
  const handleInputFile = () => {
    fileInputRef.current.click();
  };
  const handleImageFunc = async event => {
    // const file = fileInputRef?.current?.files?.[0];
    const file = event?.target?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImg', file);
      try {
        const resp = await _axios.default.post('https://chat-application-4std.onrender.com/api/auth/addProfileImg', formData, {
          withCredentials: true
        });
        if (resp.status === 200) {
          const data = resp.data;
          if (data?.image) {
            const imageUrl = `https://chat-application-4std.onrender.com/${data.image}`;
            dispatch((0, _reducers.setUserInfo)({
              ...userInfo,
              image: data.image
            }));
            setImage(imageUrl);
            _sonner.toast.success("Image added successfully");
          } else {
            _sonner.toast.error("Failed to get image data from response");
          }
        }
      } catch (error) {
        console.error("Error uploading image", error);
        _sonner.toast.error("Failed to upload image");
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImg = async () => {
    try {
      const resp = await _axios.default.delete('https://chat-application-4std.onrender.com/api/auth/deleteImg', {
        withCredentials: true
      });
      if (resp.status === 200) {
        dispatch((0, _reducers.setUserInfo)({
          ...userInfo,
          image: null
        }));
        setImage(null);
        _sonner.toast.success("Image Deleted successfully");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  (0, _react.useEffect)(() => {
    if (userInfo?.profileSetup) {
      setFirstName(userInfo?.firstName || "");
      setLastName(userInfo?.lastName || "");
      if (userInfo?.image) {
        setImage(`https://chat-application-4std.onrender.com/${userInfo?.image}`);
      }
    }
  }, [userInfo]);
  (0, _react.useEffect)(() => {
    if (userInfo?.image) {
      setImage(`https://chat-application-4std.onrender.com/${userInfo.image}`);
    }
  }, [userInfo.image]); // De
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#1b1c24] h-[100vh]  flex items-center justify-center  md:justify-center flex-col gap-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-[80vw] md:w-max flex flex-col items-center justify-center gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fixed top-0 left-0"
  }, /*#__PURE__*/React.createElement(_io.IoArrowBack, {
    className: "text-4xl lg:text-6xl text-white/90 cursor-pointer "
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-[80vw]  flex justify-center items-center gap-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-2 flex-wrap items-center justify-center gap-[5rem]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full w-32 md:w-48 md:h-48 mx-auto relative items-center flex justify-center",
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, /*#__PURE__*/React.createElement(_avatar.Avatar, {
    className: "h-32 w-32 rounded-full overflow-hidden md:w-48 md:h-48"
  }, image ? /*#__PURE__*/React.createElement(_avatar.AvatarImage, {
    src: image,
    className: "object-cover w-full h-full bg-black"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center"
  }, "CN")), hovered && /*#__PURE__*/React.createElement("div", {
    className: "ring-fuchsia-50 rounded-full absolute inset-0 flex items-center justify-center bg-black/50"
  }, image ? /*#__PURE__*/React.createElement(_fa.FaTrash, {
    className: "text-white text-3xl cursor-pointer",
    onClick: handleDeleteImg
  }) : /*#__PURE__*/React.createElement(_fa.FaPlus, {
    className: "text-white text-3xl cursor-pointer",
    onClick: handleInputFile
  })), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".png, .jpg, .jpeg, .svg, .webp",
    ref: fileInputRef,
    className: "hidden",
    name: "profileImg",
    onChange: handleImageFunc
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-8 pl-7"
  }, /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "Enter Email",
    className: "text-white/50 rounded-full p-6 bg-[#2c2e3b] border-none",
    disabled: true,
    value: userInfo?.email
  }), /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "First Name",
    className: "text-white/50 rounded-full p-6 bg-[#2c2e3b] border-none",
    value: firstName,
    onChange: e => setFirstName(e.target.value)
  }), /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "Last Name",
    value: lastName,
    onChange: e => setLastName(e.target.value),
    className: "text-white/50 rounded-full p-6 bg-[#2c2e3b] border-none"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "w-[60vw] md:w-[80vw] lg:w-[35vw]"
  }, /*#__PURE__*/React.createElement(_button.Button, {
    className: "bg-purple-700 text-white/50 outline-none hover:bg-purple-900 transition-all w-full h-16 duration-300 rounded-full",
    onClick: handleSave
  }, "Save Changes")))));
};
exports.Profile = Profile;