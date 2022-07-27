// import da biblioteca do google cloud talent v4
const talent = require('@google-cloud/talent').v4;

/**
 * List Tenants
 *
 * @param projectId {string} Your Google Cloud Project ID
 */
async function listTenant(projectId) {

    // criação do client
    const client = new talent.TenantServiceClient();

    // construção do corpo da request. Ver https://cloud.google.com/nodejs/docs/reference/talent/latest/talent/protos.google.cloud.talent.v4beta1.ilisttenantsrequest
    // Embora a API diga que o request deve estar vazio, não consigo resposta se não dizer o projectId
    const request = {
        parent: client.projectPath(projectId), //função que monta a string formatada do projectPath
    }

    // chamada da função da API que lista os tenants da conta. Ver https://cloud.google.com/nodejs/docs/reference/talent/latest/talent/v4.tenantserviceclient
    var response = await client.listTenants(request);

    // a resposta é um array, com um array de objetos de tenants. Aqui so temos um, o default. Ver https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants/list
    console.log(response[0][0].name);

}

// o projectId está na pagina do cloud console
listTenant("senai-lap19"); 