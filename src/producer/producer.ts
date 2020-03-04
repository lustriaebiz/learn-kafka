
import kafka from 'kafka-node'

interface iSendToQueue {
    payloads : any
}

const Producer  = kafka.Producer;
const client    = new kafka.KafkaClient(); 
const producer  = new Producer(client);

class Producers {

    send() {
        let that = this;

        producer.on('ready', function() {

            let count = 2;

            let payloads = [
                { topic: "cat", messages: `I have ${count} cats`, partition: 0 }
            ];

            let params = {
                payloads: payloads
            };

            that.sendToQueue(params);

        });

        producer.on("error", function(err) {
            console.log(err);
        });

    }

    sendToQueue(params : iSendToQueue) {
    
        producer.send(params.payloads, function(err, data) {
            console.log('Sent - ', data);
            
        });

    }

}


let producer$ = new Producers;
producer$.send();