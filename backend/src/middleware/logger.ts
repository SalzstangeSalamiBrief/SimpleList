function calcTimePartials(time: Number) : String {
	return time < 10 ? `0${time}` : String(time);
}

export default async function ({ request: req } : any, next: any) {
	const date = new Date();
	const dateString = `${calcTimePartials(date.getHours())}:${calcTimePartials(date.getMinutes())}:${calcTimePartials(date.getSeconds())}`;

	console.log(`${dateString} - Method: ${req.method} -  Sender: ${req.ip} - Target: ${req.url}`);
	await next();
}
