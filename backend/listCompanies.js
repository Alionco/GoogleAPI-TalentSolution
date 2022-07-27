
const talent = require('@google-cloud/talent').v4;

/**
 * List Companies
 *
 * @param projectId {string} Your Google Cloud Project ID
 * @param tenantId {string} Identifier of the Tenant
 */
async function sampleListCompanies(projectId, tenantId) {

  //client que vai fazer a requisição
  const client = new talent.CompanyServiceClient();
  
  // o método listCompanies exige o path completo até o tenant.
  const formattedParent = client.tenantPath(projectId, tenantId);

  var response = await client.listCompanies({parent: formattedParent});

  console.log(response);
}

sampleListCompanies('senai-lap19', 'cebd7e6b-ac00-0000-0000-0035d67ebd73');