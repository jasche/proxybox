import * as request from 'request';
import * as url from 'url';
import {sleep} from './sleep';

describe("Elaborate on forward proxy", () => {
    it("Happy flow", async () => {
        console.log('Hallo');
        request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' ,(error, response,body)=>{
            console.log('bla bla');
            if(error) { return console.log('error' , error); };
//            console.log('response', response)
            console.log('body', body);
        });

        await sleep(5000);
    });
    it("Web proxy flow", async () => {
        console.log('Hallo');
        request({'url': 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
                 'proxy': 'http://localhost:5000' } ,(error, response,body)=>{
            console.log('bla bla');
            if(error) { return console.log('error' , error); };
            console.log('body', body);
        });

        await sleep(5000);
    });

   it("Web proxy flow", async () => {
        console.log('Hallo');
        request({'url': 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
                 'proxy': 'http://foo:bar@localhost:5000' } ,(error, response,body)=>{
            console.log('bla bla');
            if(error) { return console.log('error' , error); };
            console.log('body', body);
        });

        await sleep(5000);
    });

   fit("Web proxy flow with auth and defaults", async () => {
        console.log('Hallo');
        var r = request.defaults({'proxy': 'http://foo:bar@localhost:5000'});
        r({'url': 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' } ,(error, response,body)=>{
            console.log('bla bla');
            if(error) { return console.log('error' , error); };
            console.log('body', body);
        });

        await sleep(5000);
    });


   it("Web proxy flow with auth",  (done) => {
        setTimeout( ()=> {
            request({'url': 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
                     'proxy': 'http://foo:bar@localhost:5000' } ,(error, response,body)=>{
                console.log('bla bla');
                if(error) { return console.log('error' , error); };
                console.log('body', body);
                done();
            });
        }, 90000);

    });


 
} );
