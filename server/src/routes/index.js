import { Router } from 'express'

const main = Router()

const universalLoader = require('../universal')

main.get('/', universalLoader)

export default main
