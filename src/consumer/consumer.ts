

import kafka from 'kafka-node'

const Consumer  = kafka.Consumer;
const client    = new kafka.KafkaClient(); 

interface iConsume {
    options : any
}

class Consumers {

    receive() {
        let params: iConsume = {
            options: [{ topic: "cat", partition: 0 }]
        }

        this.consume(params);
    }

    consume(params: iConsume) {
        
        const consumer  = new Consumer(client, params.options, {
            autoCommit: false
        });

        consumer.on("message", function(message) {
            console.log('Receive - ', message);
          });
    }


}

let consumer$ = new Consumers;
consumer$.receive();