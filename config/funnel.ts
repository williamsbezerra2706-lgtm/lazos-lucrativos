export const funnelConfig = {
  expert: { name: 'Mercedes', image: '/images/mercedes-placeholder.jpg', alt: 'Mercedes, especialista en lazos artesanales' },
  currency: 'US$', fullPrice: 147, finalPrice: 17,
  checkoutUrl: 'https://pay.hotmart.com/F107343958P' as string, vslEnabled: false, offerTimerEnabled: false,
  exitOfferPrice: 15.90,
  exitOfferCheckoutUrl: 'https://pay.hotmart.com/F107343958P?off=ii9p83wb' as string,
  rewardDurationMs: 1050,
  increments: { q1: 20, q2: 20, q3: 20, lead: 20, q4: 20, q5: 15, q6: 15 },
  images: {
    expertEntry: '/images/mercedes-entry.png',
    expertMessage: '/images/mercedes-message.png',
    bowKit: '/images/mercedes-message.png',
    appMockup: '/images/app-preview.png',
  },
  analytics: { metaPixelId: '1939958330006245', ga4Id: 'G-B60TEQ109Y' },
  offerItems: ['Método completo paso a paso','Acceso al aplicativo','Guías de materiales y herramientas','Modelos de lazos para principiantes','Moldes y medidas','Guía de precios','Fotos y catálogo','Cómo publicar en redes sociales','Cómo utilizar WhatsApp para mostrar tus productos','Cómo dar tus primeros pasos para ofrecer tus lazos'],
  bonuses: [
    { title:'Guía de primeros lazos', value:20 },{ title:'Moldes y medidas listas para usar', value:25 },
    { title:'Guía para calcular tus precios', value:25 },{ title:'Pack para WhatsApp e Instagram', value:20 },
    { title:'Guía de fotos con el celular', value:20 },{ title:'Guía de kits y combinaciones', value:20 },
  ],
} as const;

export const maxUnlockedBenefit = funnelConfig.fullPrice - funnelConfig.finalPrice;
export const configuredRewardTotal = Object.values(funnelConfig.increments).reduce((sum,value)=>sum+value,0);
if (configuredRewardTotal !== maxUnlockedBenefit) throw new Error('La suma de beneficios no coincide con fullPrice - finalPrice.');
