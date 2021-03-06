import { Request } from 'express';
// Array for whitelisted URLs
const whitelist = [
	'http://localhost:9090',
	'http://127.0.0.1:9090',
	'http://localhost:9091',
	'http://127.0.0.1:9091',
];

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
	const origin = req.header('Origin');
	const isOriginWhitelisted = whitelist.includes(origin);
	callback(null, { origin: isOriginWhitelisted });
}
