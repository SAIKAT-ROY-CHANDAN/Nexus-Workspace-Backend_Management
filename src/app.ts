import express, { Application, Request, Response } from 'express'
import cors from 'cors'


const app: Application = express()

app.use(express.json());
app.use(cors())

const test = (req: Request, res: Response) => {
    const a = 'Hello from the Nexus Workspace'
    res.send(a)
}

app.get('/', test)

app.listen(5000, () => {
    console.log("server is running");
})