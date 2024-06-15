import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFoundRoute';



const app: Application = express()

app.use(express.json());
app.use(cors())
app.use('/api', router)

const test = (req: Request, res: Response) => {
    const a = 'Hello from the Nexus Workspace'
    res.send(a)
}

app.get('/', test)
app.use(globalErrorHandler)
app.use(notFound)
// app.use(checkForNoData)
export default app