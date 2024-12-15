import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";

export const WorkExperience = ({ item, edit, setEdit }) => {
    const [workExperience, setWorkExperience] = useState({
        yearsOfExperience: "",
        currentJobTitle: "",
        currentCompany: "",
        previousCompanies: [],
        industries: [],
    });
    const handleInputChange = (field, value) => {
        setWorkExperience((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        // Logic to save the updated data or pass it back to the parent
        console.log("Updated Work Experience: ", workExperience);
    };
    return (
        <>
            {
                edit ?
                    <div className=" px-5 w-[100vw] lg:w-[40vw]">

                        <div className="flex flex-col gap-2 mt-3">
                            <p>Fresher - Interned at {item.company_name}</p>
                            <p>Total professional experience of {item.year_of_exp} year</p>
                            <p>Industry experience in {item.industry_exp}</p>
                        </div>
                    </div>
                    : item.title === "Work Experience" ?
                        <>
                            <div className="px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]">
                                <div>Are you currently on career break? <span>Update your profile</span></div>
                                <div className="flex flex-col gap-2">
                                    <p>How many years of work experience do you have? Don't include internships.</p>
                                    <div className="flex">
                                        <input type="text" name="" id="" value={workExperience.yearsOfExperience}
                                            onChange={(e) =>
                                                handleInputChange("yearsOfExperience", e.target.value)
                                            } className="w-[100px] text-center" />
                                        <span className="w-[50px] h-[30px] bg-gray-200 rounded-[2px] text-center">years</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p>What is your current job title and company?</p>
                                    <div className="flex gap-2">
                                        <Select value={workExperience.currentJobTitle}
                                            onValueChange={(value) =>
                                                handleInputChange("currentJobTitle", value)
                                            }>
                                            <SelectTrigger className="w-[280px]">
                                                <SelectValue placeholder="eg. Software Engineer" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[white]">
                                                <SelectGroup>
                                                    <SelectItem value="Intern">Fresher - Interned</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Select value={workExperience.currentCompany}
                                            onValueChange={(value) =>
                                                handleInputChange("currentCompany", value)
                                            }>
                                            <SelectTrigger className="w-[280px]">
                                                <SelectValue placeholder="eg. Amazon" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[white]">
                                                <SelectGroup>
                                                    <SelectItem value="Atomic Loops">Atomic Loops</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Which companies have you previously worked at?</p>
                                    <Select value={workExperience.previousCompanies.join(", ")}
                                        onValueChange={(value) =>
                                            handleInputChange("previousCompanies", [
                                                ...workExperience.previousCompanies,
                                                value,
                                            ])
                                        }>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="eg. Amazon" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[white]">
                                            <SelectGroup>
                                                <SelectItem value="Atomic Loops">Atomic Loops</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Select up to 3 industries your current or previous companies operate in.</p>
                                    <Select value={workExperience.industries.join(", ")}
                                        onValueChange={(value) =>
                                            handleInputChange("industries", [
                                                ...workExperience.industries,
                                                value,
                                            ])
                                        }>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Select or type industries" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[white]">
                                            <SelectGroup>
                                                <SelectItem value="Computer Software / IT / Internet">Computer Software / IT / Internet</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                                    <Button onClick={() => setEdit(null)}>Cancle</Button>
                                </div>
                            </div>
                        </>
                        : null
            }
        </>
    )
}