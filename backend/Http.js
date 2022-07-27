const http = require('request');


function listJobs(projectId, tenantId, companyId) {

    const url = `https://jobs.googleapis.com/v4/parent=projects/${projectId}/tenants/${tenantId}/jobs`;




    console.log(url);


}

listJobs('senai-lap19', 'cebd7e6b-ac00-0000-0000-0035d67ebd73','c3c265be-a717-4e0c-94bb-17e25e948759');
