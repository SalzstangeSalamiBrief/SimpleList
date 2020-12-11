import { Request, Response, NextFunction } from 'express';

export default async function blockList(
	req: Request, res: Response, next: NextFunction,
): Promise<void> {
	const isReqFromLocalHost = /127.0.0.1$/.test(req.ip);
	if (isReqFromLocalHost) {
		return next();
	}
	return res.status(401).end();
}
