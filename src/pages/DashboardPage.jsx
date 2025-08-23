import React, { useEffect, useState, useContext } from "react";
import { Package, FileStack, User, MonitorCheck, MonitorX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { url } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, setLoading } from "../features/user/userSlice";
import CopyRight from "../components/CopyRight";
import MyJobsTable from "@/components/MyJobsTable";
import JobApplicationsTable from "@/components/JobApplicationsTable";
import axios from "axios";

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPostedJobs, setTotalPostedJobs] = useState(0);
  const [applicationReceived, setApplicationReceived] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [expiredJobs, setExpiredJobs] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${url}users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Ensure Bearer token format
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // Log non-JSON responses (e.g., 401 errors)
          console.error("Error Response:", errorText);
          throw new Error(`Failed to fetch profile: ${errorText}`);
        }

        const data = await response.json();
        dispatch(setUserDetails(data));
        dispatch(setLoading(false));
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchMyJobs = async () => {
      try {
        const response = await axios.get(`${url}jobs`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Ensure Bearer format
          },
        });
        setTotalPostedJobs(response.data.jobs.length);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error Response:", error.response.data);
        } else if (error.request) {
          // Request was made but no response
          console.error("No response received:", error.request);
        } else {
          // Other errors
          console.error("Error setting up request:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="card-body flex flex-col gap-3 p-0 md:flex-row">
        <div className="flex h-[100px] w-full flex-row items-center justify-start gap-4 rounded-md bg-[#F1F5F9] p-4 md:w-1/2">
          <div className="w-fit rounded-full bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
            <User size={20} />
          </div>
          <div className="gap-0 p-0">
            <p className="font-bold text-3xl">{totalPostedJobs}</p>
            <p className="text-xs">Total Posted Jobs</p>
          </div>
        </div>
        <div className="flex h-[100px] w-full flex-row items-center justify-start gap-4 rounded-md bg-[#F1F5F9] p-4 md:w-1/2">
          <div className="w-fit rounded-full bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
            <FileStack size={20} />
          </div>
          <div className="gap-0 p-0">
            <p className="font-bold text-3xl">{applicationReceived}</p>
            <p className="text-xs">Application Received</p>
          </div>
        </div>
        <div className="flex h-[100px] w-full flex-row items-center justify-start gap-4 rounded-md bg-[#F1F5F9] p-4 md:w-1/2">
          <div className="w-fit rounded-full bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
            <MonitorCheck size={20} />
          </div>
          <div className="gap-0 p-0">
            <p className="font-bold text-3xl">{activeJobs}</p>
            <p className="text-xs">Active Jobs</p>
          </div>
        </div>
        <div className="flex h-[100px] w-full flex-row items-center justify-start gap-4 rounded-md bg-[#F1F5F9] p-4 md:w-1/2">
          <div className="w-fit rounded-full bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
            <MonitorX size={20} />
          </div>
          <div className="gap-0 p-0">
            <p className="font-bold text-3xl">{expiredJobs}</p>
            <p className="text-xs">Expired Jobs</p>
          </div>
        </div>
      </div>
      <MyJobsTable />
      <JobApplicationsTable />
      <CopyRight />
    </div>
  );
};

export default DashboardPage;
