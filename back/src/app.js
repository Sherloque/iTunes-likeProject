import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { jwtMiddleware } from './middlewares/auth.middleware.js';
import errorHandler from './middlewares/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import trackRoutes from './routes/track.routes.js';
import playlistRoutes from './routes/playlist.routes.js';
import externalRoutes from './routes/external.routes.js'

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/external', externalRoutes);
app.use(jwtMiddleware);


app.get('/', (_, res) => res.json({ ok: true }));
app.use(errorHandler);

export default app;
