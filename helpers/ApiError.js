// handle ketika proses dalam router handler mengalami error
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

module.exports = ApiError;
