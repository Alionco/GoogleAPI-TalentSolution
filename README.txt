"One important thing to note about the Job Search API is that it's a search index of your jobs.
This means it's intended to work alongside your existing database by mirroring the contents and searching against it in a manner that's optimized to find the most relevant results to a search query.
This means it acts something like a middle layer for the underlying system.
In order for the API to best determine relevant search results, it stores information that you provide about the jobs and used a pretrained machine learning model with your provided data to return relevant results.
Once the API is integrated into your system, your users will see high-quality search results immediately. For many businesses, this improvement in search quality is more than sufficient.
You'll want to make sure that you keep your job database as the primary source of truth and use the Job Search API as a search index."

* RESUMO: essa API serve para empresas administrarem suas vagas e exibir resultados relevantes em suas próprias páginas, algo como um complemento ao serviço de RH. Parece que algumas empresas como a Siemens e empresas de recrutamento fazem bom uso disso. 

NÃO TEM NADA A VER COM A PESQUISA DE JOBS QUE A GOOGLE FAZ E APRESENTA NA SUA PÁGINA DE VAGAS! ISSO É OUTRO ESQUEMA, DEPENDE DA FORMA DE EXPOR A VAGA NA PÁGINA DA SUA EMPRESA E O GOOGLE CONSEGUIR IDENTIFICAR AQUILO COMO UMA VAGA - https://recooty.com/blog/how-to-post-a-job-on-google-free-job-listing/ 



-------------------------------------------------------------
***COMO COMEÇAR A USAR GOOGLE CLOUD TALENT SOLUTION API***

1. A referência é a página de quickstart do Google, disponível aqui : https://cloud.google.com/talent-solution/job-search/docs?hl=en

2. Precisa ter uma conta no google, criar uma conta de serviço no console e um monte de coisa. Basta seguir o tutorial da página https://cloud.google.com/talent-solution/job-search/docs/before-you-begin?hl=en

O processo de configuração da conta google termina quando vocẽ configurar o caminho da chave em formato JSON para uma variável de ambiente GOOGLE_APPLICATION_CREDENTIALS.

PODE OU NÃO SER NECESSÁRIO CONFIGURAR O gcloud NO TERMINAL, FAZER LOGIN COM A CONTA GOOGLE ETC. Basta seguir o tutorial disponível em https://cloud.google.com/sdk/docs/install?hl=en

Eu configurei no meu terminal, mas não sei dizer se ele é necessário ou não para usar a API.

Com a conta configurada, já é possível começar a usar a API.

4. Configure o ambiente para a linguagem que voce for usar. Por exemplo, instale o node/nvm, python3, etc.

5. Instale a biblioteca da linguagem que for usada, conforme indicado aqui https://cloud.google.com/talent-solution/job-search/docs/libraries?hl=en

Eu usei nodejs, parece que pra python dá pra instalar pelo pip apesar de não constar ali na página. Eles recomendam que você use um virtualenv, mas isso não parece ser obrigatório.

6. Existem vários exemplos disponíveis em https://cloud.google.com/talent-solution/job-search/docs/samples?hl=en

Nem todos os exemplos estão disponíveis em todas as linguagens, mas existem exemplos para praticamente todos os casos da v4 em nodejs e python.

7. Você pode procurar campos são obrigatórios para cada tipo de request na página de referências disponível em https://cloud.google.com/talent-solution/job-search/docs/apis

Não existe uma página de referência para node, mas os exemplos estão em https://github.com/googleapis/nodejs-talent/tree/main/samples/snippet

Dá para usar a referência REST (https://cloud.google.com/talent-solution/job-search/docs/reference/rest) para entender os recursos da API.

Por exemplo, o método que cria um Job (https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants.jobs/create) possui um parâmetro "parent" que é obrigatório e deve seguir determinado formato e o request body deve conter uma instância de Job. 

O Job por sua vez é um objeto com alguns campos obrigatórios (https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants.jobs#Job)

Usando esse exemplo, uma requisição para criar um job poderia ser essa:


    const client = new talent.CompanyServiceClient();

    const job = {
        company: formatedCompany,
        requisitionId: requisitionId,
        title: title,
        description: description,
    }

    const request = {
        parent: formattedParent,
        job: job,
    }

    var response = await client.createJob(request);

Outro exemplo importante seria o de listar os "tenants" do seu projectId. A documentação desse método está disponível em https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants/list e requer como parãmetro obrigatório o "parent" e um request body vazio. 

Em código ficaria assim:

    const client = new talent.TenantServiceClient();

    const request = {
        parent: client.projectPath(projectId)
    }

    var response = await client.listTenants(request);


Em outras palavras, para usar a API é essencial descobrir:

    a) Qual deve ser o client que vai ser criado (pode ser um CompanyServiceClient, TenantServiceClient, JobServiceClient ou outros, a depender do serviço que for chamado)

    b) O método que vocẽ quer chamar (listTenants, searchJobs, etc). A combinação client correto (TenantServiceClient) + método correto (client.listTenants) pode ser encontrada nos exemplos, já que só pela referência REST não dá para descobrir muito bem (ou eu que sou burro)

    c) O que deve estar dentro da request para que a chamada do método seja exitosa. Veja se o "parent" está correto, se ele precisa incluir o path do tenant ou tenant+company. Além disso, veja se há algum atributo obrigatório que precisa ser preenchido se a instância de alguma coisa também for passada na request. Uma instância de Job por exemplo precisa ter pelo menos os campos "company", "requisitionId", "title" e "description" preenchidos. Outro exemplo: o método JobServiceClient.searchJobs() exige um requestMetadata também.

8. A API diz que usar "tenancy"/"tenants" é opcional, mas se não passar ele em muitas das chamadas ocorre erro. Para descobrir o tenant, use a chamada da api para "TenantServiceClient.listTenants()", conforme exemplo acima. Faça isso antes de fazer qualquer outra coisa dentro da API.

Cada project já tem um "tenant" default, então não precisa criar um, basta encontrar o "name" dele através do listTenants. 

9. Cada coisa criada pela API (como job, company, tenant) possui um campo "name" que é preenchido pela própria API e é uma string única. SALVE ela em algum lugar pois você vai referenciar ela toda hora. Exemplo de nome: "cebd7e6b-ac00-0000-0000-0035d67ebd73"

"Note: Cloud Talent Solution creation calls return a unique name for each Company/Job. Store these names as they are used to update/delete/reference Companies/Jobs."


-----------------------------
E é isso. Encontrei pouco exemplo concreto na internet que não fosse feito pela própria google, e senti falta de alguns exemplos que me pegassem pela mão para entender o que estava acontecendo. Por isso resolvi escrever isso aqui.

Além disso, parece que a v4 surgiu no final de 2020 e o pouco material que encontrei na internet fazia referẽncia à v3, que não exigia "tenant" nas requisições. Não sei muito bem qual é a função dessa entidade tenant até agora (https://cloud.google.com/talent-solution/job-search/docs/reference/rest/v4/projects.tenants), mas é preciso encontrar a sua default e usar.




