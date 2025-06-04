import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Copy, Trash, SquareCheckBig } from "lucide-react";
import { url } from "../../api";
import ConfirmDialog from "./ConfirmDialog"; // Adjust path if needed

// import toast from "react-hot-toast";

const ApiKeyManager = ({ orgId }) => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);

  const fetchKeys = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.get(`${url}organizations/${orgId}/api-keys`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Fetched API Keys:", res.data);
      setKeys(res.data.apiKeys || []); // ✅ ensure it's always an array
    } catch (err) {
      console.error(err);
      // toast.error("Failed to fetch API keys");
    }
  };
  useEffect(() => {
    console.log("API Keys:", keys);
  }, [keys]);

  const generateKey = async () => {
    const token = localStorage.getItem("authToken");
    try {
      setLoading(true);
      const res = await axios.post(
        `${url}organizations/${orgId}/api-keys`,
        {
          // Additional data can be sent here if needed
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setKeys((prev) => [...prev, res.data.apiKey]); // Add new key
      // toast.success("API key generated");
    } catch (err) {
      console.error(err);
      // toast.error("Failed to generate key");
    } finally {
      setLoading(false);
    }
  };

  const toggleKey = async (keyId, active) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.patch(
        `${url}organizations/${orgId}/api-keys/${keyId}/toggle`,
        {
          active: !active,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setKeys((prev) =>
        prev.map((k) => (k._id === keyId ? { ...k, active: !active } : k))
      );
    } catch (err) {
      console.error(err);
      // toast.error("Failed to toggle key status");
    }
  };

  const deleteKey = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(
        `${url}organizations/${orgId}/api-keys/${keyToDelete}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setKeys((prev) => prev.filter((k) => k._id !== keyToDelete));
      setKeyToDelete(null);
      setConfirmOpen(false);
      // toast.success("API key deleted");
    } catch (err) {
      console.error(err);
      // toast.error("Failed to delete key");
    }
  };

  const copyToClipboard = (key, keyId) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(keyId); // Use the ID here
    console.log("Copied key:", key);
    setTimeout(() => setCopiedKeyId(null), 2000); // Reset after 2 seconds
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <>
      <div className="w-full mx-auto mt-6 p-4 bg-[#F5F8FA] rounded-md">
        <div className="flex flex-row flex-wrap w-full items-center justify-between mb-4">
          <h2 className="text-sm font-bold">API Key Management</h2>

          <Button onClick={generateKey} disabled={loading} className="text-xs">
            {loading ? "Generating..." : "Add API Key"}
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {keys.length === 0 ? (
            <p className="text-sm text-gray-500">No API keys yet.</p>
          ) : (
            keys.map((k) => (
              <div
                key={k._id}
                className="p-3 border rounded-lg flex items-center justify-between gap-4"
              >
                <div className="flex-1 gap-2 flex flex-col">
                  <p className="font-mono text-sm break-all">{k?.key}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(k?.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <Switch
                    checked={k.active}
                    onCheckedChange={() => toggleKey(k._id, k.active)}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copyToClipboard(k.key, k._id)}
                  >
                    {copiedKeyId === k._id ? (
                      <SquareCheckBig size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>

                  {/* <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteKey(k._id)}
                >
                  <Trash size={16} />
                </Button> */}

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => {
                      setKeyToDelete(k._id);
                      setConfirmOpen(true);
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={deleteKey}
        title="Delete API Key"
        message="This action cannot be undone. Are you sure you want to delete this API key?"
      />
    </>
  );
};

export default ApiKeyManager;
