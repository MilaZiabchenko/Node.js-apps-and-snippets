import { createServer } from 'http';

createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
		<!DOCTYPE html>
		<html>
			<body style="background-color: darkblue; color: white; text-align: center">
				<h1>Hello, my dear Leo!</h1>
				<p>${req.method} request made for ${req.url}</p>
			</body>
		</html>
	`);
}).listen(3000);

console.log('Web server is listening on port 3000...');
