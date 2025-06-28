import { Request, Response } from 'express';

export function getHello(req: Request, res: Response) {
	res.send('The server is running successfully.');
}
