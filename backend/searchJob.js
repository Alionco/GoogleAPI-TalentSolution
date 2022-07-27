const talent = require('@google-cloud/talent').v4;

/**
 * Search Jobs
 *
 * @param projectId {string} Your Google Cloud Project ID
 * @param tenantId {string} Identifier of the Tenant
 */
async function searchJobs(projectId, tenantId) {
  
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
    query: "diretor",
    queryLanguageCode: "pt-BR"
  };

  // construção da Request
  const request = {
    parent: formattedParent,
    JobQuery : JobQuery,
    requestMetadata: requestMetadata,
  };

  var response = await client.searchJobs(request);
  console.log(response[0].matchingJobs.length);
  console.log(response[0].matchingJobs);


}

searchJobs('senai-lap19', 'cebd7e6b-ac00-0000-0000-0035d67ebd73');