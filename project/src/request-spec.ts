import * as request from 'request';
import * as url from 'url';

describe("Elaborate on forward proxy", () => {
    fit("Happy flow", () => {
        console.log('Hallo');
        request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {json:true} ,(error, response,body)=>{
            console.log('bla bla');
            if(error) { return console.log('error' , error); };
            console.log('response', response)
            console.log('body', body);
        });
    });
 
} );
