// import React, { useState } from "react";
// import SnackbarAlert from "../components/Snackbar/SnackbarAlert.jsx";
//
// const ShowAlerts = ({ title, content, severity, show }) => {
//     const [successSB, setSuccessSB] = useState(show);
//     const closeSuccessSB = () => setSuccessSB(false);
//     return (
//         <SnackbarAlert
//             color="success"
//             icon="check"
//             title={title || severity === "success" ? "Task completed successfully"
//                 : severity === "error" ? "Task failed to complete" : "Notification Update!"}
//             content={content}
//             dateTime="11 mins ago"
//             open={successSB}
//             onClose={closeSuccessSB}
//             close={closeSuccessSB}
//             bgWhite
//         />
//     );
// };
// export default ShowAlerts;
