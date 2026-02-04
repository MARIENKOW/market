// import { MessageStructure } from "./uk";
// import {
//     EMAIL_MAX_LENGTH,
//     PASSWORD_MAX_LENGTH,
//     PASSWORD_MIN_LENGTH,
//     USERNAME_MAX_LENGTH,
//     USERNAME_MIN_LENGTH,
// } from "../../form/constants";

// export const en: MessageStructure = {
//     form: {
//         password: {
//             min: `minimum ${PASSWORD_MIN_LENGTH} characters`,
//             max: `maximum ${PASSWORD_MAX_LENGTH} characters`,
//             invalid: `Invalid password`,
//             label: `Password`,
//         },
//         email: {
//             max: `maximum ${EMAIL_MAX_LENGTH} characters`,
//             invalid: `Invalid email format`,
//             notFound: `Email not found`,
//             unique: `Email must be unique`,
//             label: `Email`,
//         },
//         rePassword: {
//             label: `Repeat password`,
//             same: `Passwords do not match`,
//         },
//         username: {
//             min: `minimum ${USERNAME_MIN_LENGTH} characters`,
//             max: `maximum ${USERNAME_MAX_LENGTH} characters`,
//             label: `Username`,
//         },
//         required: `Required field`,
//         submit: `Submit`,
//     },
//     pages: {
//         main: {
//             name: "Home",
//         },
//         register: {
//             name: "Register",
//             feedback: {
//                 success: {
//                     registerSuccess: "Registration successful!",
//                     mailSend:
//                         "Account not activated. Verification link sent to email. Link expires in: {time}",
//                 },
//             },
//         },
//         login: {
//             name: "Login",
//             feedback: {
//                 success: {
//                     loginSuccess: "Login successful!",
//                 },
//                 errors: {
//                     mailSend:
//                         "Account not activated. Verification link sent to email. Link expires in: {time}",
//                     mailSendAgain:
//                         "Account not activated. New verification link sent to email. Link expires in: {time}",
//                 },
//             },
//         },
//         forgotPassword: {
//             changePassword: {
//                 name: "Change password",
//                 feedback: {
//                     errors: {
//                         timeout: "Reset link expired! Request a new one",
//                         notFound: "Invalid reset link! Request a new one",
//                     },
//                 },
//             },
//             name: "Forgot password?",
//             feedback: {
//                 errors: {
//                     alreadySent:
//                         "Reset link already sent. Link expires in: {time}",
//                 },
//                 success: "Reset link sent. Link expires in: {time}",
//             },
//         },
//         notFound: {
//             name: "404",
//         },
//     },
//     api: {
//         ERR_NETWORK: "No network connection. Try again later.",
//         FALLBACK_ERR: "Oops! Something went wrong, try again later",
//         FORBIDDEN: "Insufficient permissions",
//         UNAUTHORIZED: "You are not authorized! Please log in",
//         NOT_FOUND: "Content not found",
//         auth: "Authentication error, reload page or log in again",
//     },
//     feedback: {
//         empty: {
//             title: "Nothing here yet",
//         },
//         error: {
//             network: {
//                 title: "Oops!",
//                 subtitle: "No network connection.",
//                 reload: "reload",
//             },
//             fallback: {
//                 title: "Oops!",
//                 subtitle: "Something went wrong",
//                 reload: "reload",
//             },
//             forbidden: {
//                 title: "Oops!",
//                 subtitle: "Insufficient permissions",
//                 reload: "reload",
//             },
//             auth: {
//                 title: "Oops!",
//                 subtitle: "Authentication failed",
//                 reload: "Request data again",
//             },
//         },
//     },
//     features: {
//         logout: {
//             name: "Logout",
//             error: "Failed to logout! Try again later",
//             success: "Successfully logged out",
//         },
//         logoutErr: {
//             name: "Reset session",
//             error: "Failed to reset session! Try again later",
//             success: "Session successfully reset",
//         },
//     },
//     mail: {
//         resetPassword: {
//             title: "Password reset",
//             text: "Password reset",
//             button: "Reset password",
//             exsited: "Link expires in: {time}",
//         },
//     },
// };
