import express from 'express';
import path from 'path';
import { fileURLtoPath } from 'url';

const __filename = fileURLtoPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index')});

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });