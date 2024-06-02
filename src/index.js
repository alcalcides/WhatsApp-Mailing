import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Defina como true se quiser que o navegador funcione em segundo plano
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com', { waitUntil: 'networkidle0' });
  
  console.log("Espere 30 segundos para o usuário fazer login manualmente");
  await new Promise(resolve => setTimeout(resolve, 30000));

  console.log("Lista de contatos");
  const contatos = ["Anderson Bezerra", "Amor"];

  console.log("Mensagem a ser enviada");
  const mensagem = "Teste automatizado";

  // Loop pelos contatos
  for (const contato of contatos) {
    console.log("Selecione o contato da lista de contatos");
    await page.click(`span[title='${contato}']`);
    await page.waitForSelector('div[contenteditable="true"]');
    
    console.log("Digitar e enviar mensagem");
    await page.keyboard.type(mensagem);
    await page.keyboard.press('Enter');

    console.log("Aguarde um momento entre as mensagens");
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Fechar o navegador
  await browser.close();
})();
