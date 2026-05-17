// Hata yönetimini standart hale getiren bir sınıf
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Beklenen hatalar olduğunu işaretler

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;