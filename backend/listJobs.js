const talent = require('@google-cloud/talent').v4;

/**
 * List Jobs
 *
 * @param projectId {string} Your Google Cloud Project ID
 * @param tenantId {string} Identifier of the Tenant
 */
async function listJobs(projectId, tenantId) {
  
  // client que vai fazer a requisição
  const client = new talent.JobServiceClient();

  // o método searchJobs exige um path completo até o tenant
  const formattedParent = client.tenantPath(projectId, tenantId);

  // o método searchJobs também requer um requestMetadata
  const requestMetadata = {
    domain: "www.memataporfavor.com",
    sessionId: "lap19",
    userId: "senai-lap19",
  };

  // construção da jobQuery
  const JobQuery = {
    query: "engineer",
  };

  // construção da Request
  const request = {
    parent: formattedParent,
    searchMode : "JOB_SEARCH",
    JobQuery : JobQuery,
    requestMetadata: requestMetadata,
  };

  var response = await client.searchJobs(request);
  console.log(response[0].matchingJobs);

}

listJobs('senai-lap19', 'cebd7e6b-ac00-0000-0000-0035d67ebd73');