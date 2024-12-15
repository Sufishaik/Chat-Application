import axios from "axios";
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";
import MultipleSelector from "./components/ui/multipleselect";
import { Button } from "./components/ui/button";
import { JobPreferences } from "./profileSections/JobPreferences";
import { Skills } from "./profileSections/Skills";
import { WorkExperience } from "./profileSections/WorkExperience";
import { Education } from "./profileSections/Education";
import { DiversityInfo } from "./profileSections/DiversityInfo";

export const ProfileInsta = () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(null)

    const fetchData = async () => {
        const resp = await axios.get('http://localhost:3030/posts');
        setData(resp.data);
    }
    useEffect(() => {
        if (!data?.length) {
            fetchData()
        }
    }, [data, setData])

    const [selectedWorkingValue, setSelectedWorkingValues] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [qualifications, setQualifications] = useState([{ id: 1 }]);

    const handleAddQualification = () => {
        setQualifications([...qualifications, { id: qualifications.length + 1 }]);
    };

    const handleRemoveQualification = (id) => {
        setQualifications(qualifications.filter((qual) => qual.id !== id));
    };
    const working_values = [{ label: "Work From Home / Remote", value: "remote" },
    { label: "---Region----", value: "region" },
    { label: "Anywhere in India", value: "india" },
    { label: "North India", value: "north" },
    { label: "South India", value: "south" },]

    const skills =
        [
            { label: "HTML", value: "html" },
            { label: "CSS", value: "CSS" },
            { label: "Javascript", value: "javascript" },
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Typescript", value: "typescript" },
        ]
    const languages = [{ label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "French", value: "french" },
    { label: "Urdu", value: "urdu" },
    { label: "Russian", value: "russian" },
    ]
    const ProfileSection = ({ title, isEditing, onEdit, disabled, children }) => (
        <div className="px-5 w-[100vw] lg:w-[40vw]">
            <div className="flex justify-between items-center gap-4">
                <p className="text-[18px] font-bold">{title}</p>
                {!isEditing && (
                    <span
                        className={`text-blue-600 font-bold cursor-pointer ${disabled ? "opacity-50 pointer-events-none" : ""}`}
                        onClick={onEdit}
                    >
                        Edit
                    </span>
                )}
            </div>
            <hr className="w-[97vw] mx-auto mt-1 lg:w-[38vw]" />
            <div className="mt-3">{children}</div>
        </div>
    );

    return (
        <>
            <div className="flex flex-col gap-5 mt-10 items-start justify-center">
                {
                    data?.map?.((item) => {
                        return (
                            <>
                                <div className="">

                                    <ProfileSection
                                        key={item.id}
                                        title={item.title}
                                        isEditing={edit === item.id}
                                        disabled={edit !== null && edit !== item.id} // Disable other edit buttons
                                        onEdit={() => setEdit(item.id)}
                                    ></ProfileSection>

                                    {
                                        item.title === "Job Preferences" &&
                                        <JobPreferences edit={edit !== item.id} item={item} setEdit={setEdit} working_values={working_values} setSelectedWorkingValues={setSelectedWorkingValues} selectedWorkingValue={selectedWorkingValue} fetchData={fetchData} />

                                    }
                                    {
                                        item.title === "Skills" &&
                                        <Skills edit={edit !== item.id} item={item} skills={skills} setSelectedSkills={setSelectedSkills} selectedSkills={selectedSkills} languages={languages} selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} setEdit={setEdit} fetchData={fetchData} />

                                    }
                                    {
                                        item.title === "Work Experience" &&
                                        <WorkExperience edit={edit !== item.id} setEdit={setEdit} item={item} />
                                    }
                                    {
                                        item.title === "Education" &&
                                        <Education edit={edit !== item.id} item={item} setEdit={setEdit} handleRemoveQualification={handleRemoveQualification} qualifications={qualifications} handleAddQualification={handleAddQualification} setQualifications={setQualifications} />
                                    }
                                    {
                                        item.title === "Diversity information" &&
                                        <DiversityInfo edit={edit !== item.id} item={item} setEdit={setEdit} />
                                    }
                                </div>
                            </>
                        )
                    })
                }

            </div >
        </>
    )
}