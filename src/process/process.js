process.on('exit', code=>{
    console.log(code);
    console.log('Justo antes de salir del proceso');
});

process.on('uncaughtException', erro=>{ //uncaughtExcepcion es un evento no controlado es el nombre por defecto
    console.log('Atrapa exepciones no controladas');
    console.log(erro);
   
}); 

process.on('message',data=>{
    console.log(data);
});


//console.log('Hola mundo') //no da error

//console.log(test); // da error ya que es una variable no declarada o definida

/*codigos del proceso:
0 - Proceso finalizado normalmente
1 - Proceso finalizado por excepcion fatal
5 - Error fatal del motor V8
9 - Para argumentos invalidos al momento de la ejecucion

*/