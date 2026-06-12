import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function RepositoryStructure() {
  const { repoId } = useParams();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStructure();
  }, []);

  const fetchStructure = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        `/api/analyze/structure/${repoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(res.data);
    } catch (error) {
      console.error("Error fetching structure:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading repository structure...</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Repository Structure
      </h1>

      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file._id}
              className="border rounded p-3 flex justify-between"
            >
              <div>
                <p className="font-medium">
                  {file.path}
                </p>

                <p className="text-sm text-gray-500">
                  Type: {file.type}
                </p>
              </div>

              <div>
                {file.size
                  ? `${file.size} bytes`
                  : "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RepositoryStructure;