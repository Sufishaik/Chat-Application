import { Button } from "@/components/ui/button"
import MultipleSelector from "@/components/ui/multipleselect"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios";
import { useEffect, useState } from "react";


export const JobPreferences = ({ item, fetchData, edit, setEdit, working_values, setSelectedWorkingValues, selectedWorkingValue }) => {
    const [location, setLocation] = useState("");
    const [openToWorking, setOpenToWorking] = useState(selectedWorkingValue);
    const [currentSalary, setCurrentSalary] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");
    const handleSave = async () => {
        const str = openToWorking?.map?.((val) => val?.label)
        const editData = {
            location,
            open_to_working: str.toString(),
            title: "Job Preferences",
            current_salary: currentSalary,
            notice_period: noticePeriod
        }
        const resp = await axios.put('http://localhost:3030/posts/1', editData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if (resp.data) {
            console.log("Updated Successfully", resp.data);
            setLocation("");
            setOpenToWorking([]);
            setCurrentSalary("");
            setNoticePeriod("");
            setEdit(null);
            fetchData()
        }
    };

    return (
        <>
            {
                edit ?
                    <div className=" px-5 w-[100vw] lg:w-[40vw]">
                        <div className="flex flex-col gap-2 mt-3 w-[50vw]">
                            <p>Currently located in {item.location}</p>
                            <p>Only willing to work in {item.open_to_working}</p>
                            <p>Current Salary Rs. {item.current_salary}</p>
                            <p>Can start working {item.notice_period}</p>
                        </div>
                    </div>
                    : item.title === "Job Preferences" ?
                        <>
                            <div className="px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]">
                                <div className="flex flex-col gap-2">
                                    <p>Where are you currently located?</p>
                                    <Select onValueChange={setLocation}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Select your location" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[white]">
                                            <SelectGroup>
                                                {/* <SelectLabel>Fruits</SelectLabel> */}
                                                <SelectItem value="India">India</SelectItem>
                                                <SelectItem value="China">China</SelectItem>
                                                <SelectItem value="Singapur">Singapure</SelectItem>
                                                <SelectItem value="London">London</SelectItem>
                                                <SelectItem value="Canada">Canada</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col ">
                                    <p>Where are you open to working?</p>
                                    <MultipleSelector
                                        className="rounded-lg   border-none py-2 bg-none"
                                        options={working_values}
                                        onChange={(values) => {
                                            setOpenToWorking(values);
                                            setSelectedWorkingValues(values);
                                        }}
                                        placeholder="Search work availability"
                                        value={openToWorking} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>What is your current annual salary? Don't specify offer in hand here.</p>
                                    <div className="flex">
                                        <span className="w-[50px] border-[1px] h-[30px] bg-gray-200 rounded-[2px] text-center">Rs.</span>
                                        <input type="number" name="" id="" className="w-[100px] text-center" value={currentSalary}
                                            onChange={(e) => setCurrentSalary(e.target.value)} />
                                        <span className="w-[50px] h-[30px] bg-gray-200 rounded-[2px] text-center">LPA</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>What is your notice period?</p>
                                    <Select onValueChange={setNoticePeriod}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Select Notice Period" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[white]">
                                            <SelectGroup>

                                                <SelectItem value="15 days">Immediately</SelectItem>
                                                <SelectItem value="15 days">15 days</SelectItem>
                                                <SelectItem value="1 month">1 month</SelectItem>
                                                <SelectItem value="2 months">2 months</SelectItem>
                                                <SelectItem value="3+ months">3+ months</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={handleSave}>Save Changes</Button>
                                    <Button onClick={() => setEdit(null)}>Cancle</Button>
                                </div>
                            </div>
                        </>
                        : null
            }
        </>
    )
}