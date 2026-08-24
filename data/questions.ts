export type Question = { id:'q1'|'q2'|'q3'|'q4'|'q5'|'q6'; prompt:string; options:{id:string;label:string}[]; helper?:string };
const options=(labels:string[])=>labels.map((label,index)=>({id:String.fromCharCode(65+index),label}));
export const questions:Question[]=[
  {id:'q1',prompt:'Cuéntame, ¿cómo es tu experiencia con los lazos y las manualidades?',options:options(['Nunca he hecho un lazo','Ya hice algunas manualidades por hobby','Ya sé hacer algunos lazos','Ya hago productos artesanales y quiero vender más'])},
  {id:'q2',prompt:'¿Qué es lo que más te frena para comenzar a crear y vender lazos hoy?',options:options(['No sé por dónde empezar','No sé qué materiales comprar','No sé cuánto cobrar','No sé cómo conseguir clientes'])},
  {id:'q3',prompt:'¿Qué significaría para ti tener una nueva fuente de ingresos desde casa?',options:options(['Ayudar con los gastos de mi hogar','Tener mi propio dinero','Pasar más tiempo con mi familia','Construir mi propio pequeño negocio'])},
  {id:'q4',prompt:'{name}, ¿cuánto tiempo podrías dedicar al día para aprender y crear tus lazos?',options:options(['Hasta 1 hora por día','De 1 a 2 horas por día','De 2 a 4 horas por día','Solo los fines de semana']),helper:'Incluso empezando con poco tiempo, puedes avanzar paso a paso en tus primeros modelos.'},
  {id:'q5',prompt:'{name}, ¿dónde te gustaría comenzar a ofrecer tus lazos?',options:options(['WhatsApp','Instagram y Facebook','A personas de mi ciudad','Todavía no sé cómo venderlos'])},
  {id:'q6',prompt:'{name}, si tuvieras un paso a paso desde tu primer lazo hasta aprender a publicarlo y ofrecerlo por Internet, ¿estarías dispuesta a comenzar?',options:options(['Sí, quiero comenzar','Sí, pero necesito que sea sencillo','Quiero aprender desde cero','Primero quiero conocer el método'])},
];
