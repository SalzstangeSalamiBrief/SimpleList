import { Request } from 'express';
// Array for whitelisted URLs
const whitelist = ['http://localhost:8081', 'http://localhost:8080'];

/**
 * calculate if the header of the request needs cors enabled
 * @param {request} req
 * @param {function} callback
 */
export default function (req: Request, callback): void {
	const corsOptions = { origin: false };
	if (whitelist.includes(req.header('Origin'))) {
		corsOptions.origin = true;
	}
	callback(null, corsOptions);
}
