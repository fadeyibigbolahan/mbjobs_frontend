import React, { useEffect, useState, useContext } from "react";
import { Package, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { url } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, setLoading } from "../features/user/userSlice";
import CopyRight from "../components/CopyRight";

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invitationLink, setInvitationLink] = useState("");
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

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

  const handleCopy = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="card col-span-1 md:col-span-2 lg:col-span-4">
          <div className="card-header">
            <p className="card-title">Overview</p>
          </div>
          {!profile?.isVerified && (
            <div className="flex flex-col justify-center items-center w-full p-3 bg-yellow-100 rounded-md border-2 border-yellow-500">
              <p className="text-yellow-700 text-sm text-center">
                ⚠️ Your account is not yet verified. Some operations may be
                limited.
              </p>
              <button
                onClick={() => navigate("/verification")}
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Verify Now
              </button>
            </div>
          )}
          <div className="card-body flex flex-col gap-3 p-0 md:flex-row">
            <div className="flex h-[100px] w-full flex-row items-center justify-start gap-2 rounded-md bg-[#F1F5F9] p-4 md:w-1/2">
              <div className="w-fit rounded-full bg-green-500/20 p-2 text-green-500 transition-colors dark:bg-green-600/20 dark:text-green-600">
                <Package size={20} />
              </div>
              <div className="gap-0 p-0">
                <p className="font-bold">{`${
                  profile?.earnings || "0.00"
                } NGN`}</p>
                <p className="text-sm">Earning Balance</p>
              </div>
            </div>
            <div className="flex h-[100px] w-full flex-row items-center justify-start gap-2 rounded-md bg-[#F1F5F9] p-4 md:w-1/2">
              <div className="w-fit rounded-full bg-green-500/20 p-2 text-green-500 transition-colors dark:bg-green-600/20 dark:text-green-600">
                <Package size={20} />
              </div>
              <div className="gap-0 p-0">
                <p className="font-bold">{`${
                  profile?.totalEarnings || "0.00"
                } NGN`}</p>
                <p className="text-sm">Total Earnings</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card-header">
            <p className="card-title">Affiliate Link</p>
          </div>
          <div className="relative card-body flex flex-row items-center justify-between gap-3 p-0">
            <div className="flex flex-col gap-2 p-0 w-[90%]">
              <p className="text-sm font-semibold text-black break-words w-full">
                {invitationLink}
              </p>
              <p className="text-xs text-gray-500">
                Copy and share your link to earn commissions.
              </p>
            </div>
            <Copy
              onClick={() => handleCopy(invitationLink)}
              className="cursor-pointer rounded-md bg-[#22C55E] p-1 text-white shadow-lg absolute right-0"
            />
          </div>
          {copied && (
            <span style={{ color: "green", marginLeft: "10px", fontSize: 12 }}>
              Copied!
            </span>
          )}
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default DashboardPage;
