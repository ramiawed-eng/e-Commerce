const notFound = (req, res, next) => {
  const CostumError = new Error(`Page Not Found: ${req.originalUrl}`);
  res.status(404);
  next(CostumError);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
