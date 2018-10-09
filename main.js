const rxjs = require('rxjs-compat');
const fs = require('fs');
const observable = rxjs.Observable;
const fileExist = observable.bindCallback(fs.stat);

function isFileExists(fileName) {
    return fileExist(fileName) ;1        
}
function mkdirRecursive(path) {
    return observable.from(path.split('/')
        .filter(x => x !== ''))
        .scan(function (acc, curr) { return acc + '/' + curr })
        .map(x => {
            return isFileExists(x);
        })
        .concatAll()
        .filter(x => x.path) 
        .do( x => fs.mkdir(x.path,(result)=> {
            console.log(result,'Created dir');
        }))
}


//  Put your directory sequence in mkdirRecursive function parameter Default: "/tmp/a/b/c"
// Checkout if you have the permission for creating Directory in the Parent Folder

mkdirRecursive('/tmp/a/b/c').subscribe(x => console.log());