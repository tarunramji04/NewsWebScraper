import express from 'express'
import { initializeFirebaseApp, firestoreDb } from './firebase.js'
import { getDocs, collection, query } from 'firebase/firestore'
import cors from 'cors'

const app = express();
const port = 5000;

initializeFirebaseApp();

app.use(express.json());
app.use(cors());

app.get('/data/:day/:source', async (req, res) => {
    const { day, source } = req.params;
    
    try {
        const collectionPath = collection(firestoreDb, 'scrapedData', day, source);
        const headlinesQuery = query(collectionPath);
        const results = await getDocs(headlinesQuery);

        const uniques = new Set();
        const headlines = [];

        results.docs.forEach(doc => {
            const data = doc.data();
            const headline = data.headlineText;

            if (!uniques.has(headline)) {
                uniques.add(headline);
                headlines.push(data);
            }
        });
        res.status(200).send({ data: headlines });
    } catch (error) {
        res.status(500).send({ 'message': error.message });
    }
});

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})
