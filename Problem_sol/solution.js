const fs=require('fs');
const path=require('path');

const fPath=path.join(__dirname, 'example1.json');
function decodeValue(val,bs) {
    return parseInt(val,bs); 
}


fs.readFile(fPath,'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        const inputData = JSON.parse(data);
        const valueAns = calcSec(inputData);
        console.log("The constant term is:", valueAns);
    } catch (err) {
        console.error(err);
    }
});

function usingLagrange(array) {
    let ans = 0;
    const k=array.length;
    for (let i=0;i<k;i++) {
        let xi=array[i].x;
        let yi=array[i].y;
        let li=1; 
        for (let j = 0;j<k;j++) {
            if (i!==j) {
                let temp=array[j].x;
                li*=(0-temp)/(xi-temp); 
            }
        }
        ans+= yi*li; 
    }
    return ans;
}

function gettingPoints(inp) {
    const array = [];
    const { keys } = inp;
    for (const key in inp) {
        if (key !== "keys") {
            const x=parseInt(key); 
            const bs = parseInt(inp[key].bs); 
            const val=inp[key].val; 
            const y=decodeValue(val, bs);
            array.push({ x, y });
        }
    }
    return array;
}
function calcSec(inp) {
    const array=gettingPoints(inp);
    const {k} = inp.keys;
    const ans = usingLagrange(array.slice(0, k)); 
    return ans;
}


