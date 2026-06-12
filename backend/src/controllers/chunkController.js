const Repository =require("../models/Repository");

const RepositoryContent = require("../models/RepositoryContent");

const CodeChunk =require("../models/CodeChunk");

const {fetchFileContent}=require("../services/githubParser");

const {createChunks}=require("../services/chunkServices");

exports.generateChunks =
async (req,res)=>{

 try{

  const { repoId } =
  req.params;

  const repository =
  await Repository.findById(
    repoId
  );

  const files =
  await RepositoryContent.find({

   repoId,

   type:"file"

  });

  await CodeChunk.deleteMany({
   repoId
  });

  let totalChunks = 0;

  for(const file of files){

   if(
    !file.path.endsWith(".js")
   )
   continue;

   try{

    const code =
    await fetchFileContent(

      repository.owner,

      repository.repoName,

      file.path

    );

    const chunks =
    createChunks(code);

    const docs =
    chunks.map(chunk => ({

      repoId,

      filePath:
      file.path,

      chunkType:
      chunk.type,

      content:
      chunk.content

    }));

    if(docs.length){

      await CodeChunk.insertMany(
        docs
      );

      totalChunks +=
      docs.length;

    }

   }catch(err){

    console.log(
      file.path
    );

   }

  }

  res.json({

   success:true,

   totalChunks

  });

 }catch(error){

  res.status(500).json({

   message:
   error.message

  });

 }

};