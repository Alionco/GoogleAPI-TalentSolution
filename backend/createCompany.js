// import da biblioteca do google cloud talent v4
const talent = require('@google-cloud/talent').v4;

/**
 * Create Company
 *
 * @param projectId {string} Your Google Cloud Project ID
 */
async function createCompany(projectId, tenantId, displayName, externalId) {

    // client que vai fazer a requisição
    const client = new talent.CompanyServiceClient();

    // o método createCompany exige um path completo até o tenant
    const formattedParent = client.tenantPath(projectId, tenantId);

    // construção do objeto company
    const company = {
        displayName: displayName,
        externalId: externalId, 
    }

    // construção da request
    const request = {
        parent: formattedParent,
        company: company,
    }

    var response = await client.createCompany(request);

    console.log(response);

}

createCompany("senai-lap19", "cebd7e6b-ac00-0000-0000-0035d67ebd73","SENAI LAP19 DISPLAY NAME", "senai lap19 external id");


