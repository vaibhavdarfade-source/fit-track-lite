// server.js  –  ES modules
import express from 'express';
import axios   from 'axios';
import dotenv  from 'dotenv';
dotenv.config();

const app = express();
app.use(express.static('public'));

// Fitbit OAuth config
const CLIENT_ID     = process.env.FITBIT_CLIENT_ID;
const CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET;
const REDIRECT_URI  = process.env.REDIRECT_URI; // https://your-app.onrender.com/callback

// 1. Redirect user to Fitbit
app.get('/auth/fitbit', (_req, res) => {
  const scope = 'activity heartrate nutrition';
  const url = 'https://www.fitbit.com/oauth2/authorize?' +
    new URLSearchParams({
      client_id    : CLIENT_ID,
      response_type: 'code',
      scope,
      redirect_uri : REDIRECT_URI,
    }).toString();
  res.redirect(url);
});

// 2. Handle callback
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');

  // Exchange code for token
  const tokenResp = await axios.post(
    'https://api.fitbit.com/oauth2/token',
    new URLSearchParams({
      client_id    : CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type   : 'authorization_code',
      redirect_uri : REDIRECT_URI,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  const { access_token } = tokenResp.data;

  // Fetch today’s summary
  const today = new Date().toISOString().slice(0,10);
  const summary = await axios.get(
    `https://api.fitbit.com/1/user/-/activities/date/${today}.json`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  // Return JSON to front-end
  res.json(summary.data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Listening on ${PORT}`));
