const http = require('http');

function addTreatment(data) {
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:3000/add-treatment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data))
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

function getTreatments() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000/treatments', (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Adding treatment 1...');
  console.log(await addTreatment({ patientId: 'P001', service: 'Consultation', cost: 500 }));
  
  console.log('Adding treatment 2...');
  console.log(await addTreatment({ patientId: 'P001', service: 'Blood Test', cost: 800 }));
  
  console.log('Fetching all treatments...');
  const treatments = await getTreatments();
  console.log(JSON.stringify(treatments, null, 2));
}

run().catch(console.error);
