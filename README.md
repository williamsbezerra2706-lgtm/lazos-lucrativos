# Lazos con Mercedes — Quiz

Funil interativo mobile-first em espanhol LATAM. O fluxo inclui entrada, seis perguntas gamificadas, captura de nome e WhatsApp, telas intermediárias, benefícios, oferta e saída para checkout.

## Rodar localmente

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Onde alterar

- `config/funnel.ts`: Mercedes, preços, checkout, valores dos benefícios, itens da oferta, imagens, Meta Pixel, GA4, VSL e contador.
- `data/questions.ts`: textos e alternativas das seis perguntas.
- `public/images/`: substitua os placeholders pelas fotos finais mantendo estes nomes: `mercedes-placeholder.jpg`, `bow-kit-placeholder.jpg`, `app-mockup-placeholder.png`, `bow-1.jpg`, `bow-2.jpg` e `bow-3.jpg`.
- `app/page.tsx`: fluxo, componentes, persistência e eventos.
- `app/globals.css`: identidade visual responsiva.

A soma dos benefícios é validada automaticamente contra `fullPrice - finalPrice`. O checkout provisório é `#`; defina `checkoutUrl` antes da publicação. Os IDs de analytics ficam em `analytics.metaPixelId` e `analytics.ga4Id`. Os eventos nunca recebem nome ou telefone.

## Progresso e reset

O estado e as UTMs ficam no `localStorage` sob a chave `mercedes-bows-funnel-v1`. Em desenvolvimento aparece o botão **Reset Quiz**. Em produção ele não é renderizado.

## Publicar no Vercel

Importe este diretório em um repositório GitHub, conecte-o ao Vercel e use os padrões de Next.js (`npm run build`). Confirme previamente o preço real, a URL do checkout, as imagens finais e os IDs de analytics.
