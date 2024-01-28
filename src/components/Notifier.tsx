import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";

export class Notifier{
    async scheduleNotification(){
        const options : ScheduleOptions = {
            notifications : [
                {
                    id : 111,
                    title : "Message from Mendrika" ,
                    body : "Notification de messages",
                    largeBody : "Fa ahoana anga , misy olana ? toa niditra ianao ranamana huhuhus",
                }
            ]
        }

        try {
            await LocalNotifications.schedule(options)
        } catch (error) {
            alert(error)
        }
    }
}