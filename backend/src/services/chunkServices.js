function createChunks(
  code
) {

  const chunks = [];

  const functions =
    code.split("function ");

  functions.forEach(
    (item,index) => {

      if(index === 0)
        return;

      chunks.push({

        type:"function",

        content:
        "function " + item

      });

    }
  );

  return chunks;
}

module.exports = {
  createChunks
};