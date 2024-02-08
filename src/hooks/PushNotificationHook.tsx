import { Toast } from "@capacitor/toast";
import { useState } from "react";
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';


// const nullEntry: any[] = []
// const [notifications, setnotifications] = useState(nullEntry);

export const checkOnce = ()=>{
    PushNotifications.checkPermissions().then((res) => {
        if (res.receive !== 'granted') {
          PushNotifications.requestPermissions().then((res) => {
            if (res.receive === 'denied') {
              showToast('Push Notification permission denied');
            }
            else {
              showToast('Push Notification permission granted');
              register();
            }
          });
        }
        else {
          register();
        }
      });
}

const t : Token = {
    value : ""
} 
// export const [fcmToken,setFcmToken] = useState(t);
export const register = () => {
    console.log('Initializing HomePage');

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
        (token: Token) => {
            showToast('Push registration success');
            window.localStorage.setItem("fcmToken",token.value);
        }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
        (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
        }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
            // setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
        }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
            // setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
        }
    );
}

export const showToast = async (msg: string) => {
    await Toast.show({
        text: msg
    })
}
