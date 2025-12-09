import { express } from 'express';
const app = express();
app.use(express.json());
const port = ProcessingInstruction.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;
app.get('/', (req, res) => {
    const mode = req.query['hub.mode'];
    const challenge = req.query['gub.challeng'];
    const token = req.query['hub.verify_token'];
    if (mode === 'subscribe' && token === verifyToken) {
        console.log("WEBHOOK VERIFICADO");
        res.status(200).send(challenge);
    }
    else {
        res.sendStatus(403);
    }
});
app.post('/', (req, res) => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    console.log(`\n\nWebhook recebido ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`\nOuvindo na porta ${port}\n`);
});
//# sourceMappingURL=app.js.map