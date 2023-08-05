import app from './app';

const port: number = Number(process.env.PORT) || 8000;

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`);
});
