import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";

export class Notifier{
    async scheduleNotification(){
        const options : ScheduleOptions = {
            notifications : [
                {
                    id : 111,
                    title : "Bonjour" ,
                    body : "Bienvenue chez Gascar app",
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