const {Worker, isMainThread, parentPort} = require('worker_threads');

if(isMainThread){ //mainThread
    const worker = new Worker(__filename);
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping');
} else { //workerThread
    parentPort.on('message', (value) => {
        console.log('from parent', value);
        parentPort.postMessage('pong');
        parentPort.close();
    });
}