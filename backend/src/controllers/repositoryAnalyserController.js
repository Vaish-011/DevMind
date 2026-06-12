const Repository = require("../models/Repository");
const RepositoryContent = require("../models/RepositoryContent");

const { fetchContents } = require("../services/githubParser");

exports.analyzeRepository = async (req, res) => {
  try {
    const { repoId } = req.params;

    console.log("Analyzing Repo ID:", repoId);

    const repository = await Repository.findById(repoId);

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found",
      });
    }

    console.log("Repository Found:");
    console.log(repository);

    const contents = await fetchContents(
      repository.owner,
      repository.repoName
    );

    console.log(
      "Total files fetched:",
      contents.length
    );

    await RepositoryContent.deleteMany({
      repoId,
    });

    const documents = contents.map((item) => ({
      repoId,
      path: item.path,
      name: item.name,
      type: item.type,
      size: item.size || 0,
      githubUrl: item.html_url,
    }));

    if (documents.length > 0) {
      await RepositoryContent.insertMany(
        documents
      );
    }

    return res.status(200).json({
      success: true,
      message: "Repository analyzed successfully",
      totalFiles: documents.length,
    });
  } catch (error) {
    console.error(
      "ANALYZE REPOSITORY ERROR"
    );
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStructure = async (req, res) => {
  try {
    const { repoId } = req.params;

    const files =
      await RepositoryContent.find({
        repoId,
      }).lean();

    return res.status(200).json({
      success: true,
      count: files.length,
      files,
    });
  } catch (error) {
    console.error(
      "GET STRUCTURE ERROR"
    );
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};