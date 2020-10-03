import { Request } from 'express';
// Array for whitelisted URLs
const whitelist = ['http://localhost:8081', 'http://localhost:8080'];

interface CorsOptions {
	origin: boolean;
}

/**
 * calculate if the header of the request needs cors enabled
 * @param {request} req
 * @param {function} callback
 */
export default function corsConfig(
	req: Request, callback: (a: null, b: CorsOptions) => void,
): void {
	const corsOptions:CorsOptions = { origin: false };
	if (whitelist.includes(req.header('Origin'))) {
		corsOptions.origin = true;
	}
	callback(null, corsOptions);
}
