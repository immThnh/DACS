import { Stomp } from "@stomp/stompjs";
import { Socket } from "net";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import notificationSlice from "../../redux/reducers/notificationSlice";
import SockJS from "sockjs-client";
import { client } from "stompjs";

export default function useNotificationWebSocket() {
    const userInfo = useSelector((state) => state.login.user);
    const dispatch = useDispatch();

    const onDisconnected = () => {
        console.log("Disconnect Websocket");
    };

    useEffect(() => {
        const alias = userInfo.email.split("@")[0];
        let stompClient = null;
        if (userInfo) {
            const sockjs = new SockJS("http://localhost:8080/ws");
            stompClient = Stomp.over(sockjs);
            stompClient.connect({}, () => {
                stompClient.subscribe(
                    `/user/${alias}/notification`,
                    (message) => {
                        const data = JSON.parse(message.body);
                        console.log(data);
                        dispatch(notificationSlice.actions.add(data));
                    }
                );
            });
        }
        return () => {
            if (stompClient) {
                stompClient.disconnect(onDisconnected, {});
            }
        };
    }, [userInfo, dispatch]);
}
