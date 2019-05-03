import express from 'express';

const app = express();


app.get('/', (req, res) => res.status(200).json({ message: 'Banka app' }));

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
