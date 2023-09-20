import express from 'express';
import rp from 'request-promise';
import cheerio from 'cheerio';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

app.get('/scrape', async (req, res) => {
    const {url, element} = req.query;

    if (!url) {
        return res.status(400).send('URL is missing');
    }

    try {
        const html = await rp(url as string);
        const $ = cheerio.load(html);
        const content = $(element as string).length ? $(element as string).html() : html;


        res.json({
            content,
        });
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}`);
});
