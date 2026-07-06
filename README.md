# Landing Page de Alta Conversão — Elétrica Paraná

Esta é uma Landing Page (LP) de página única (single-page), desenvolvida em HTML5 semântico, CSS3 puro (com foco em design responsivo e moderno) e JavaScript vanilla. Foi projetada especificamente para campanhas de tráfego pago (Google Ads / Meta Ads), garantindo alta velocidade de carregamento (LCP < 2.5s) e conversão otimizada.

---

## Estrutura do Projeto

*   `index.html` — Estrutura semântica da LP, SEO local, marcações de acessibilidade, tags JSON-LD de negócio local e placeholders de tracking.
*   `styles.css` — Estilos visuais seguindo a identidade visual da marca (azul #0F315E, turquesa #52BBD1), animações e regras mobile-first.
*   `script.js` — Controle dinâmico do formulário, acordeão de perguntas frequentes e redirecionamento de conversão qualificada.
*   `assets/` — Diretório para armazenamento de favicons, logotipos e fotos das filiais.

---

## Configuração e Personalização (Substituição de Placeholders)

### 1. Conectar o Formulário ao WhatsApp Comercial
No arquivo [script.js](file:///Users/mac/Documents/El%C3%A9trica%20Paran%C3%A1/script.js) (linha 16), altere a constante `whatsappNumber` para o número do celular comercial da Elétrica Paraná (com o DDI `55` na frente + DDD + Número sem espaços ou traços):

```javascript
const CONFIG = {
    // Exemplo para o número (65) 99999-9999
    whatsappNumber: "5565999999999", 
};
```

Para atualizar os links diretos de WhatsApp distribuídos nos botões da página (Header, Hero, Linhas de Produto, Serviços e Rodapé), faça uma busca no [index.html](file:///Users/mac/Documents/El%C3%A9trica%20Paran%C3%A1/index.html) pelo termo `55659XXXXXXXX` e substitua pelo número real da mesma forma.

### 2. Integração de Rastreamento (Google Ads, GA4 e Meta Pixel)
No [index.html](file:///Users/mac/Documents/El%C3%A9trica%20Paran%C3%A1/index.html), foram inseridos blocos comentados prontos para as seguintes ferramentas. Remova os comentários HTML (`<!--` e `-->`) e substitua as chaves:

*   **Google Tag Manager (GTM):** Substitua `GTM-XXXXXXX` pelo ID da sua tag (linhas 34-40 no `<head>` e linhas 143-145 no `<body>`).
*   **Google Analytics 4 (GA4):** Substitua `G-XXXXXXX` pelo ID de fluxo de dados (linhas 44-52).
*   **Meta Pixel (Facebook Ads):** Substitua `PIXEL_ID` pelo ID do seu pixel do Facebook (linhas 56-72).

### 3. Eventos de Conversão no Google Tag Manager
A página já dispara os seguintes eventos customizados diretamente no `dataLayer` do navegador. Você pode usá-los como gatilhos no GTM para contar conversões:

1.  `whatsapp_click`: Disparado sempre que um cliente clica em um botão direto para o WhatsApp. Contém a variável `origem` (`hero`, `produto`, `servico`, `rodape`, `flutuante`).
2.  `form_orcamento_enviado`: Disparado no sucesso do envio do formulário qualificador. Contém os parâmetros `tipo_cliente`, `cidade`, `loja` e `urgencia`.

*Nota: Foi implementado um mecanismo contra cliques duplicados (`window.__epEnviado`) no envio do formulário para evitar a contagem de conversões duplicadas no Google Ads.*

### 4. Como enviar arquivos/anexos do Formulário por E-mail (Opcional)
Como a integração nativa com o WhatsApp não permite o envio automático de arquivos binários pesados por parâmetros da URL, o campo de upload de projeto está preparado no front-end. 

Para que o anexo chegue até a equipe comercial, você tem duas opções simples:
*   **Opção A (Sem Backend):** Utilizar um serviço de formulários estáticos de terceiros (como [Formspree](https://formspree.io/) ou [Web3Forms](https://web3forms.com/)). Basta alterar a tag `<form>` no HTML para apontar para a URL do serviço e os arquivos serão enviados diretamente para o seu e-mail corporativo.
*   **Opção B (Recomendada para CRM):** Integrar a API de captação da LP a um webhook de CRM de vendas (como RD Station, ActiveCampaign ou PipeRun) via backend em Node.js ou PHP.

---

## SEO & Boas Práticas
*   **Acessibilidade:** Todas as imagens possuem atributos `alt`, botões possuem tags descritivas, e os inputs do formulário estão associados a `<label>` com identificadores únicos.
*   **SEO Local:** O cabeçalho da página inclui metadados estruturados Schema.org (`LocalBusiness`) em JSON-LD configurados com os endereços e horários das 4 lojas de Mato Grosso, otimizando as buscas orgânicas na região.
