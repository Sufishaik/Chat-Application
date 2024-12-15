import { Button } from "@/components/ui/button"
import MultipleSelector from "@/components/ui/multipleselect"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios";
import { useState } from "react";

export const Skills = ({ item, edit, setEdit, skills, fetchData, setSelectedSkills, selectedSkills, languages, selectedLanguages, setSelectedLanguages }) => {
    const [selectedRole, setSelectedRole] = useState("");
    const handleSave = async () => {

        const editData = {
            current_role: selectedRole,
            skills: selectedSkills?.map?.((i) => i?.label),
            languages: selectedLanguages?.map?.((i) => i?.label),
            title: "Skills",
        }
        const resp = await axios.put('http://localhost:3030/posts/2', editData, {
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
            fetchData()
        }
    };

    const handleCancel = () => {
        setSelectedRole("");
        setSelectedSkills([]);
        setSelectedLanguages([]);
        setEdit(null);
        fetchData()
    };
    return (
        <>
            {
                edit ?
                    <div className=" px-5 w-[100vw] lg:w-[40vw]">

                        <div className="flex flex-col gap-2 mt-3 w-[50vw]">
                            <p>Currently role is {item.current_role}</p>
                            <p>Main skills are {item.skills?.map?.((i) => {
                                return i + " "
                            })} </p>
                            <p>Languages known are {item.languages?.map?.((i) => {
                                return i + " "
                            })}</p>

                        </div>
                    </div>
                    : item.title === "Skills" ?
                        <>
                            <div className="px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]">
                                <div className="flex flex-col gap-2">
                                    <p>Select your current role:</p>
                                    <Select onValueChange={setSelectedRole}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder={selectedRole || "Select role"} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[white] overflow-scroll">
                                            <SelectGroup>
                                                <SelectLabel>Software Engineering</SelectLabel>
                                                <SelectItem value="Backend Development">Backend Development</SelectItem>
                                                <SelectItem value="Big Data / DWH / ETL">Big Data / DWH / ETL</SelectItem>
                                                <SelectItem value="Embedded / Kernel Development">Embedded / Kernel Development</SelectItem>
                                                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                                <SelectItem value="Full-Stack Development">Full-Stack Development</SelectItem>
                                                <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                                                <SelectItem value="QA / SDET">QA / SDET</SelectItem>
                                                <SelectItem value="Other Software Development">Other Software Development</SelectItem>
                                            </SelectGroup>
                                            {/* Technical Management Group */}
                                            <SelectGroup>
                                                <SelectLabel>Technical Management</SelectLabel>
                                                <SelectItem value="Engineering Management">Engineering Management</SelectItem>
                                                <SelectItem value="Product Management">Product Management</SelectItem>
                                                <SelectItem value="Project Management">Project Management</SelectItem>
                                            </SelectGroup>
                                            {/* Data Science and Analysis Group */}
                                            <SelectGroup>
                                                <SelectLabel>Data Science and Analysis</SelectLabel>
                                                <SelectItem value="Data Analysis / Business Intelligence">Data Analysis / Business Intelligence</SelectItem>
                                                <SelectItem value="Data Science / Machine Learning">Data Science / Machine Learning</SelectItem>
                                            </SelectGroup>
                                            {/* Design and Creative Group */}
                                            <SelectGroup>
                                                <SelectLabel>Design and Creative</SelectLabel>
                                                <SelectItem value="Graphic Design / Animation">Graphic Design / Animation</SelectItem>
                                                <SelectItem value="Photography / Videography">Photography / Videography</SelectItem>
                                                <SelectItem value="UX / Visual Design">UX / Visual Design</SelectItem>
                                                <SelectItem value="Other Design">Other Design</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Highlight your unique skills to recruiters and get personalized job recommendations
                                        Add up to 15 skills to enhance your profile</p>
                                    <MultipleSelector
                                        className="rounded-lg  border-none py-2"
                                        dropdownClassName="bg-[white]" // Ensure this is supported by the component
                                        optionClassName="bg-[white] text-black hover:bg-gray-200" // Style individual options
                                        inputClassName="bg-[white] text-black" // Style the input field for typing/searching
                                        options={skills}
                                        onChange={setSelectedSkills}
                                        placeholder="Search work availability"
                                        value={selectedSkills}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Select up to 5 languages you speak. Click on suggestions or type a different one.</p>
                                    <MultipleSelector
                                        className="rounded-lg bg-[white]  border-none py-2 bg-none"
                                        options={languages}
                                        onChange={setSelectedLanguages}
                                        placeholder="Search work availability"
                                        value={selectedLanguages} />
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={handleSave}>Save Changes</Button>
                                    <Button onClick={handleCancel}>Cancle</Button>
                                </div>
                            </div>
                        </> : null
            }
        </>
    )
}