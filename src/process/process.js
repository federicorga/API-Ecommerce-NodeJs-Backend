process.on('exit', code=>{
    console.log(code);
    console.log('Justo antes de salir del proceso');
});

process.on('uncaughtException', erro=>{ 
    console.log('Atrapa exepciones no controladas');
    console.log(erro);
   
}); 

process.on('message',data=>{
    console.log(data);
});

