function sucess(response, content) {
  response.setHeader("Content-Type", "application/json");
  response.status(200).json({ sucess: true, ...content });
}

function failure(response, content) {
  response.setHeader("Content-Type", "application/json");
  response.status(500).json({ sucess: false, ...content });
}

exports.sucess = sucess;
exports.failure = failure;
