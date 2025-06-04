import Fastify from 'fastify';
import {redis} from './redis';
import { processNotification } from './processor';

const fastify = Fastify();

redis.subscribe('laravel_database_notifications',(err,count)=>{
    if(err){
        console.log('Redis Subscribed Error:',err);
    }else{
        console.log(`Subscribed to Redis channel: notifications (${count} total)`);
    }
});

redis.on('message',async(channel,message)=>{
    if(channel === 'laravel_database_notifications'){
        try{
            const data = JSON.parse(message);
            await processNotification(data);
        }catch(err){
            console.error('Error parsing or processing notification:',err);
        }
    }
});

fastify.get('/',async()=>{
    return {status: 'Node microservice running'};
});

fastify.listen({port:3001},(err)=>{
    if(err) throw err;
    console.log(`Fastify listening at 3001`);
});