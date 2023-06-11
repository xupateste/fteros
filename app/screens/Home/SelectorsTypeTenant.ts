

export function getTypeTenant(item): string {
  return 'My friend' + item;
}

export function getTestDaysLeft(createdAt): number {
  let t1 = new Date(null); 
  let t2 = new Date(Date.now()); 
  t1.setMilliseconds(3456000000 + createdAt); //40días
  // t1.setMilliseconds(864000000 + createdAt); //10días
  
  return days(t1,t2)
}


export function getNameTypeOf(typeTenant): string {
  switch (typeTenant) {
    case "free": {
      return 'GRATUITO';
    }
    case "test": {
      return 'INICIO';
    }
    case "pall": {
      return 'PREMIUM';
    }
    case "call": {
      return 'COMERCIAL';
    }
    default: { // it includes all p###
      return 'EMPRENDEDOR';
    }
  }
}

export function getIsItExceeds(typeTenant, numProds): boolean {
  let limitProds = getQtyProdsTypeOf(typeTenant);
  let diff = limitProds - numProds;
  if (diff <= 0) return true;
  return false;
}

export function getQtyProdsTypeOf(typeTenant): number {
  switch (typeTenant) {
    // todo: for COMERCIAL/PREMIUM/EMPRENDEDOR
    case "test": {return 500;} // free x 40 días
    case "p050": {return 50;} // S/ 3.00 x mes
    case "p100": {return 100;} // S/ 5.00 x mes
    case "p250": {return 250;} // S/ 8.00 x mes // desde aqui +S/5.00 x 200p
    case "p450": {return 450;} // S/ 13.00 x mes 
    case "p650": {return 650;} // S/ 18.00 x mes
    case "p850": {return 850;} // S/ 23.00 x mes
    case "p1k0": {return 1050;} // S/ 28.00 x mes
    case "p1k2": {return 1250;} // S/ 33.00 x mes
    case "p1k4": {return 1450;} // S/ 38.00 x mes
    case "p1k6": {return 1650;} // S/ 43.00 x mes
    case "p1k8": {return 1850;} // S/ 48.00 x mes
    case "p2k0": {return 2050;} // S/ 53.00 x mes
    case "p2k2": {return 2250;} // S/ 58.00 x mes
    case "p2k4": {return 2450;} // S/ 63.00 x mes
    case "p2k6": {return 2650;} // S/ 68.00 x mes
    case "p2k8": {return 2850;} // S/ 73.00 x mes
    case "p3k0": {return 3050;} // S/ 78.00 x mes
    default: {
      return 100;
    }
  }
}

export const getOrderId = () => {
  // Set characters
  // shortId.characters("0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÑ");

  // Generate order id
  return `sads`;
};

const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
};

export const getTenantBannerMessage = (typeTenant, createdAt) => {
  let message1 = `Tienes activado el Plan de Prueba por 40 días. ¡Puedes subir hasta 500 productos! Te quedan ${getTestDaysLeft(createdAt)} días.`;
  let message2 = "Fin del periodo de prueba ;)";
  let message3 = "Se activo el plan gratuito, puedes publicar hasta 100 productos";
  let message4 = "Excelente!";

  switch (typeTenant) {
  // if test -> 1:escenario mas opciones?   2:escenario fin prueba?
    case 'test' : {
      if (getTestDaysLeft(createdAt) <= 0) {
        return message2;
      }
      return message1;
    }
  // if free -> 1:se liminto a 10 p. escenario nuevos planes mas económicos?
    case 'free' : {
      return message3;
    }
  // if emprendedor / p###   -> escenario mas opciones?
    default : {
      return message4
    }
  }




}







