import { Request, Response } from 'express';

export default async function (req: Request, res: Response, next): Promise<void> {
	if (!/127.0.0.1$/.test(req.ip)) {
		// not local
		res.status = 401;
		return;
	}
	await next();
}
