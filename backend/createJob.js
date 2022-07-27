const talent = require('@google-cloud/talent').v4;

/**
 * Create Job
 *
 * @param projectId {string} Your Google Cloud Project ID
 * @param tenantId {string} Identifier of the Tenant
 * @param companyId {string} Identifier of the Company
 * @param requisitionId {string} Job requisition ID, aka Posting ID. Unique per job.
 * @param title {string} The title of the job, such as "Software Engineer".
 * @param description {string} The description of the job.
 */
async function createJob(projectId, tenantId, companyId, requisitionId, title, description) {

    const client = new talent.JobServiceClient();

    // a request exige um path completo até o tenant, e o job exige um path completo até a comopany
    const formattedParent = client.tenantPath(projectId, tenantId);
    const formatedCompany = client.companyPath(projectId, tenantId, companyId);

    // Construção do job. Campos obrigatorios são company, requisitionId, title, description, https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants.jobs#Job
    const job = {
        company: formatedCompany,
        requisitionId: requisitionId,
        title: title,
        description: description,
    }

    // construção da request. É obrigatório ter um parent e um job no body. Ver https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants.jobs/create
    const request = {
        parent: formattedParent,
        job: job,
    }

    var response = await client.createJob(request);

    console.log(response);
}

createJob('senai-lap19', 'cebd7e6b-ac00-0000-0000-0035d67ebd73','c3c265be-a717-4e0c-94bb-17e25e948759', 'senai-lap19-requisitionId field', 'BOLSISTA SENAI E C3SL', 'Bolsista do C3SL estudando API do google jobs');
