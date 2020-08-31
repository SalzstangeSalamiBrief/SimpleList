export default async function ({ request: req, response: res } : any, next: any) {
	if (!(/127.0.0.1$/.test(req.ip))) {
		// not local
		res.status = 401;
		return;
	}
	await next();
}
