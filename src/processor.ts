import httpClient from "./httpClient";

export async function processNotification(data: any,attempt =1){
    console.log(`Notifying: ${data.user_id} -> ${data.message}`);
    
    try{
        const response = await httpClient.put(`/notifications/${data.id}/status`,{
            status: 'processed'
        });

        console.log('Status Updated in Laravel:',response.data);
    }catch(error){
        console.error('Failed to Update status in Laravel',error);

        if(attempt < 3){
            setTimeout(()=>{
                console.log(`Retrying notification ${data.id}`);
                processNotification(data,attempt+1);
            },5000);
        }else{
            console.error(`Notification ${data.id} failed after 3 attempts.`);

            try{
                await httpClient.put(`/notifications/${data.id}/status`,{
                    status: 'failed'
                });
            }catch(e){
                console.error(`Final update to mark as failed also failed`,e);

            }
        }
       
    }
}