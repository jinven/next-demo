import { people } from '../../../data'

export default (req, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type': 'application/json'
  })
  res.json(people)
}
