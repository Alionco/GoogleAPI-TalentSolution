const talent = require('@google-cloud/talent').v4;
const fs = require('fs')
const { parse } = require('csv/sync');
const { delimiter } = require('path');

function removeTags(string){

    return string.replace(/<[^>]*>/g, ' ')
                 .replace(/\s{2,}/g, ' ')
                 .trim();
}

function getJobs(csv, company) {
    
    jobArray = []
    
    var arq = fs.readFileSync(csv);
    var tabela = parse(arq, {delimiter: "\t", from_line: 2});
    
    for(row of tabela) {
        jobArray.push({
            company: company,
            requisitionId: 'req-' + row[0],
            title: row[2],
            description: (removeTags(row[3])).replace(/\'/g, "\""),
            languageCode: "pt-BR" 
        })
    }
    
    return jobArray;
}

/**
 * Batch Create Job
 *
 * @param projectId {string} Your Google Cloud Project ID
 * @param tenantId {string} Identifier of the Tenant
 * @param companyId {string} Identifier of the Company
 * @param requisitionId {string} Job requisition ID, aka Posting ID. Unique per job.
 * @param title {string} The title of the job, such as "Software Engineer".
 * @param description {string} The description of the job.
 */
async function createBatchJob(projectId, tenantId, companyId, csv) {

    const client = new talent.JobServiceClient();

    // a request exige um path completo até o tenant, e o job exige um path completo até a company
    const formattedParent = client.tenantPath(projectId, tenantId);
    const formatedCompany = client.companyPath(projectId, tenantId, companyId);

    // Construção do array de jobs. Campos obrigatorios são company, requisitionId, title, description, https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants.jobs#Job
    const jobs = await getJobs(csv, formatedCompany); 
    
    // construção da request. É obrigatório ter um parent e um array de jobs no body. Ver https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants.jobs/create
    const request = {
        parent: formattedParent,
        jobs: jobs,
    }

    var response = await client.batchCreateJobs(request);

}

createBatchJob('senai-lap19', 'cebd7e6b-ac00-0000-0000-0035d67ebd73','c3c265be-a717-4e0c-94bb-17e25e948759', "./tabela.tsv");
