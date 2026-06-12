import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/api/repositories/github",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepos(res.data);
    } catch (error) {
      console.error("Fetch repositories error:", error);
    }
  };

const startAnalysis = async (repoMongoId) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Step 5: Repository Structure Analysis
    const analysisResponse = await api.post(
      `/api/analyze/${repoMongoId}`,
      {},
      config
    );

    console.log(
      "Analysis Result:",
      analysisResponse.data
    );

    // Step 6: Generate Code Chunks
    const chunkResponse = await api.post(
      `/api/chunks/${repoMongoId}`,
      {},
      config
    );

    console.log(
      "Chunk Result:",
      chunkResponse.data
    );

  } catch (error) {
    console.error(
      "Analysis error:",
      error
    );
  }
};

  const analyzeRepo = async (repo) => {
    try {
      const token = localStorage.getItem("token");

      const saveResponse = await api.post(
        "/api/repositories/save",
        {
          repoId: repo.id,
          repoName: repo.name,
          owner: repo.owner.login,
          language: repo.language,
          repoUrl: repo.html_url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const savedRepo = saveResponse.data;

      console.log("Saved Repo:", savedRepo);

      await startAnalysis(savedRepo._id);
    } catch (error) {
      console.error("Analyze Repo Error:", error);
    }
  };

  return (
    <div>
      <h1>My Repositories</h1>

      {repos.map((repo) => (
        <div key={repo.id}>
          <h3>{repo.name}</h3>

          <button onClick={() => analyzeRepo(repo)}>
            Analyze
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;