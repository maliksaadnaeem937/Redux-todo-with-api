const errorMiddleWare = (err, res) => {
  const message = err.message || "Backend Error";
  const status = err.status || 500;

  return res.status(status).json({
    message: message,
    statusCode: status,
  });
};

export default errorMiddleWare;