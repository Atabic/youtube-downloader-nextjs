import ytdl from 'ytdl-core';
import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware';
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)
export default async (req, res) => {
    // // Run cors
    await cors(req, res)

    // // Rest of the API logic

    // // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
    // // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
    // // TypeScript: import ytdl = require('ytdl-core'); with neither of the above
    var URL = req.query.URL;
    console.log('I came here bro')
    const videoMetaData = await ytdl.getBasicInfo(URL);
    res.setHeader('Content-Disposition', `attachment; filename="${videoMetaData.videoDetails.title}.mp3"`,
    'User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36');
    ytdl(URL, {
        format: 'mp3'
    }).pipe(res);
}
