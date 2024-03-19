import express from 'express';

import dotenv from 'dotenv';
import router from './src/routes';
import logger from './src/utils/logger';

dotenv.config();

const app = express();
const port = 3000;

app.use(logger)
app.use(router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});