import { Request, Response, NextFunction } from 'express';

export default async function blockList(
	req: Request, res: Response, next: NextFunction,
): Promise<void> {
	if (!/127.0.0.1$/.test(req.ip)) {
		// not local
		return res.status(401).end();
	}
	return next();
}
