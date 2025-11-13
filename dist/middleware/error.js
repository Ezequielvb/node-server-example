import { logger } from '../utils/logger.js';
export function errorHandler(err, req, res, _next) {
    logger.error(`${req.method} ${req.path} - ${err.message}`);
    logger.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Error interno' });
}
//# sourceMappingURL=error.js.map