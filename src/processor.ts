import axios from 'axios';

export async function processNotification(data: any){
    console.log(`Notifying: ${data.user_id} -> ${data.message}`);
    
    try{
        const response = await axios.put(`http://127.0.0.1:8000/api/notifications/${data.id}/status`,{
            status: 'processed'
        });

        console.log('Status Updated in Laravel:',response.data);
    }catch(error){
        console.error('Failed to Update status in Laravel',error);

        setTimeout(()=>{
            console.log(`Retrying notification ${data.id}`);
            processNotification(data);
        },5000);
    }
}