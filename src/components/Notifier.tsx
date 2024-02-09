import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";

export class Notifier{
    async scheduleNotification(){
        const options : ScheduleOptions = {
            notifications : [
                {
                    id : 111,
                    title : "Message de Toky" ,
                    body : "Bonjour , je suis interessé par votre Mercedess",
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