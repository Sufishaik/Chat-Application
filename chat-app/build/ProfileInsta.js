"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileInsta = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _react = require("react");
var _select = require("./components/ui/select");
var _multipleselect = _interopRequireDefault(require("./components/ui/multipleselect"));
var _button = require("./components/ui/button");
var _JobPreferences = require("./profileSections/JobPreferences");
var _Skills = require("./profileSections/Skills");
var _WorkExperience = require("./profileSections/WorkExperience");
var _Education = require("./profileSections/Education");
var _DiversityInfo = require("./profileSections/DiversityInfo");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProfileInsta = () => {
  const [data, setData] = (0, _react.useState)([]);
  const [edit, setEdit] = (0, _react.useState)(null);
  const fetchData = async () => {
    const resp = await _axios.default.get('http://localhost:3030/posts');
    setData(resp.data);
  };
  (0, _react.useEffect)(() => {
    if (!data?.length) {
      fetchData();
    }
  }, [data, setData]);
  const [selectedWorkingValue, setSelectedWorkingValues] = (0, _react.useState)([]);
  const [selectedSkills, setSelectedSkills] = (0, _react.useState)([]);
  const [selectedLanguages, setSelectedLanguages] = (0, _react.useState)([]);
  const [qualifications, setQualifications] = (0, _react.useState)([{
    id: 1
  }]);
  const handleAddQualification = () => {
    setQualifications([...qualifications, {
      id: qualifications.length + 1
    }]);
  };
  const handleRemoveQualification = id => {
    setQualifications(qualifications.filter(qual => qual.id !== id));
  };
  const working_values = [{
    label: "Work From Home / Remote",
    value: "remote"
  }, {
    label: "---Region----",
    value: "region"
  }, {
    label: "Anywhere in India",
    value: "india"
  }, {
    label: "North India",
    value: "north"
  }, {
    label: "South India",
    value: "south"
  }];
  const skills = [{
    label: "HTML",
    value: "html"
  }, {
    label: "CSS",
    value: "CSS"
  }, {
    label: "Javascript",
    value: "javascript"
  }, {
    label: "React",
    value: "react"
  }, {
    label: "Vue",
    value: "vue"
  }, {
    label: "Angular",
    value: "angular"
  }, {
    label: "Typescript",
    value: "typescript"
  }];
  const languages = [{
    label: "English",
    value: "english"
  }, {
    label: "Hindi",
    value: "hindi"
  }, {
    label: "French",
    value: "french"
  }, {
    label: "Urdu",
    value: "urdu"
  }, {
    label: "Russian",
    value: "russian"
  }];
  const ProfileSection = _ref => {
    let {
      title,
      isEditing,
      onEdit,
      disabled,
      children
    } = _ref;
    return /*#__PURE__*/React.createElement("div", {
      className: "px-5 w-[100vw] lg:w-[40vw]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-center gap-4"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[18px] font-bold"
    }, title), !isEditing && /*#__PURE__*/React.createElement("span", {
      className: `text-blue-600 font-bold cursor-pointer ${disabled ? "opacity-50 pointer-events-none" : ""}`,
      onClick: onEdit
    }, "Edit")), /*#__PURE__*/React.createElement("hr", {
      className: "w-[97vw] mx-auto mt-1 lg:w-[38vw]"
    }), /*#__PURE__*/React.createElement("div", {
      className: "mt-3"
    }, children));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-5 mt-10 items-start justify-center"
  }, data?.map?.(item => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: ""
    }, /*#__PURE__*/React.createElement(ProfileSection, {
      key: item.id,
      title: item.title,
      isEditing: edit === item.id,
      disabled: edit !== null && edit !== item.id // Disable other edit buttons
      ,
      onEdit: () => setEdit(item.id)
    }), item.title === "Job Preferences" && /*#__PURE__*/React.createElement(_JobPreferences.JobPreferences, {
      edit: edit !== item.id,
      item: item,
      setEdit: setEdit,
      working_values: working_values,
      setSelectedWorkingValues: setSelectedWorkingValues,
      selectedWorkingValue: selectedWorkingValue,
      fetchData: fetchData
    }), item.title === "Skills" && /*#__PURE__*/React.createElement(_Skills.Skills, {
      edit: edit !== item.id,
      item: item,
      skills: skills,
      setSelectedSkills: setSelectedSkills,
      selectedSkills: selectedSkills,
      languages: languages,
      selectedLanguages: selectedLanguages,
      setSelectedLanguages: setSelectedLanguages,
      setEdit: setEdit,
      fetchData: fetchData
    }), item.title === "Work Experience" && /*#__PURE__*/React.createElement(_WorkExperience.WorkExperience, {
      edit: edit !== item.id,
      setEdit: setEdit,
      item: item
    }), item.title === "Education" && /*#__PURE__*/React.createElement(_Education.Education, {
      edit: edit !== item.id,
      item: item,
      setEdit: setEdit,
      handleRemoveQualification: handleRemoveQualification,
      qualifications: qualifications,
      handleAddQualification: handleAddQualification,
      setQualifications: setQualifications
    }), item.title === "Diversity information" && /*#__PURE__*/React.createElement(_DiversityInfo.DiversityInfo, {
      edit: edit !== item.id,
      item: item,
      setEdit: setEdit
    })));
  })));
};
exports.ProfileInsta = ProfileInsta;