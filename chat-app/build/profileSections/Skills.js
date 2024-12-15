"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skills = void 0;
var _button = require("@/components/ui/button");
var _multipleselect = _interopRequireDefault(require("@/components/ui/multipleselect"));
var _select = require("@/components/ui/select");
var _axios = _interopRequireDefault(require("axios"));
var _react = require("react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Skills = _ref => {
  let {
    item,
    edit,
    setEdit,
    skills,
    fetchData,
    setSelectedSkills,
    selectedSkills,
    languages,
    selectedLanguages,
    setSelectedLanguages
  } = _ref;
  const [selectedRole, setSelectedRole] = (0, _react.useState)("");
  const handleSave = async () => {
    const editData = {
      current_role: selectedRole,
      skills: selectedSkills?.map?.(i => i?.label),
      languages: selectedLanguages?.map?.(i => i?.label),
      title: "Skills"
    };
    const resp = await _axios.default.put('http://localhost:3030/posts/2', editData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if (resp?.data) {
      console.log("Updated Successfully", resp.data);
      setSelectedRole("");
      setSelectedSkills([]);
      setSelectedLanguages([]);
      setEdit(null);
      fetchData();
    }
  };
  const handleCancel = () => {
    setSelectedRole("");
    setSelectedSkills([]);
    setSelectedLanguages([]);
    setEdit(null);
    fetchData();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, edit ? /*#__PURE__*/React.createElement("div", {
    className: " px-5 w-[100vw] lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 mt-3 w-[50vw]"
  }, /*#__PURE__*/React.createElement("p", null, "Currently role is ", item.current_role), /*#__PURE__*/React.createElement("p", null, "Main skills are ", item.skills?.map?.(i => {
    return i + " ";
  }), " "), /*#__PURE__*/React.createElement("p", null, "Languages known are ", item.languages?.map?.(i => {
    return i + " ";
  })))) : item.title === "Skills" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "Select your current role:"), /*#__PURE__*/React.createElement(_select.Select, {
    onValueChange: setSelectedRole
  }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
    className: "w-[280px]"
  }, /*#__PURE__*/React.createElement(_select.SelectValue, {
    placeholder: selectedRole || "Select role"
  })), /*#__PURE__*/React.createElement(_select.SelectContent, {
    className: "bg-[white] overflow-scroll"
  }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectLabel, null, "Software Engineering"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Backend Development"
  }, "Backend Development"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Big Data / DWH / ETL"
  }, "Big Data / DWH / ETL"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Embedded / Kernel Development"
  }, "Embedded / Kernel Development"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Frontend Development"
  }, "Frontend Development"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Full-Stack Development"
  }, "Full-Stack Development"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Mobile Development"
  }, "Mobile Development"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "QA / SDET"
  }, "QA / SDET"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Other Software Development"
  }, "Other Software Development")), /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectLabel, null, "Technical Management"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Engineering Management"
  }, "Engineering Management"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Product Management"
  }, "Product Management"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Project Management"
  }, "Project Management")), /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectLabel, null, "Data Science and Analysis"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Data Analysis / Business Intelligence"
  }, "Data Analysis / Business Intelligence"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Data Science / Machine Learning"
  }, "Data Science / Machine Learning")), /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectLabel, null, "Design and Creative"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Graphic Design / Animation"
  }, "Graphic Design / Animation"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Photography / Videography"
  }, "Photography / Videography"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "UX / Visual Design"
  }, "UX / Visual Design"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Other Design"
  }, "Other Design"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "Highlight your unique skills to recruiters and get personalized job recommendations Add up to 15 skills to enhance your profile"), /*#__PURE__*/React.createElement(_multipleselect.default, {
    className: "rounded-lg  border-none py-2",
    dropdownClassName: "bg-[white]" // Ensure this is supported by the component
    ,
    optionClassName: "bg-[white] text-black hover:bg-gray-200" // Style individual options
    ,
    inputClassName: "bg-[white] text-black" // Style the input field for typing/searching
    ,
    options: skills,
    onChange: setSelectedSkills,
    placeholder: "Search work availability",
    value: selectedSkills
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "Select up to 5 languages you speak. Click on suggestions or type a different one."), /*#__PURE__*/React.createElement(_multipleselect.default, {
    className: "rounded-lg bg-[white]  border-none py-2 bg-none",
    options: languages,
    onChange: setSelectedLanguages,
    placeholder: "Search work availability",
    value: selectedLanguages
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(_button.Button, {
    onClick: handleSave
  }, "Save Changes"), /*#__PURE__*/React.createElement(_button.Button, {
    onClick: handleCancel
  }, "Cancle")))) : null);
};
exports.Skills = Skills;