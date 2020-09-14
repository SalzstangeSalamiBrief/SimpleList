function calcTimePartials(time: number): string {
  return time < 10 ? `0${time}` : String(time);
}

export default async function ({ request: req }, next) {
  const date = new Date();
  const dateString = `${calcTimePartials(date.getHours())}:${calcTimePartials(
    date.getMinutes(),
  )}:${calcTimePartials(date.getSeconds())}`;

  console.log(
    `${dateString} - Method: ${req.method} -  Sender: ${req.ip} - Target: ${req.url}`,
  );
  await next();
}
