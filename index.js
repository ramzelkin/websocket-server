const https = require('https')
const options = {
  hostname: 'https://www.nbrb.by/api/exrates/rates/dynamics/{cur_id}',
  port: 443,
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
