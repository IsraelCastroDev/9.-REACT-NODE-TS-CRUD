import server from "./server";

const port = 5000;

server.listen(port, () => {
  console.log(`REST API listening on port ${port}`);
});
