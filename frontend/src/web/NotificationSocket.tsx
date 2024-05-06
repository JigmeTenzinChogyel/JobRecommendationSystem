// import { useEffect, useState } from "react";
// import useWebSocket from "react-use-websocket";

// const NotificationSocket = () => {
//   const { sendMessage, lastMessage } = useWebSocket(`ws://${window.location.host}/ws/notifications/$`);
//   console.log(lastMessage); // Log the lastMessage object

//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     if (lastMessage !== null) {
//       try {
//         const data = JSON.parse(lastMessage.data);
//         console.log(data); // Log the parsed data object
//         setNotifications(prevNotifications => [...prevNotifications, data.message]);
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error);
//       }
//     }
//   }, [lastMessage]);

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <ul>
//         {notifications.length === 0 ? (
//           <li>No notifications received yet.</li>
//         ) : (
//           notifications.map((notification, index) => (
//             <li key={index}>{notification}</li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default NotificationSocket;