import express from 'express';
import qr from 'qr-image';

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON and URL-encoded bodies using Express built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Render the index page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle the form submission
app.post('/qr', (req, res) => {
  const url = req.body.url;
  const qrImage = qr.imageSync(url, { type: 'png' });
  res.render('index', { title: 'Home', qrImage: `data:image/png;base64,${qrImage.toString('base64')}` });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
