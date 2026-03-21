// import { MessageStructure } from "./ru";
// import {
//     EMAIL_MAX_LENGTH,
//     PASSWORD_MAX_LENGTH,
//     PASSWORD_MIN_LENGTH,
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
//             label: `Confirm password`,
//             same: "Passwords do not match",
//         },
//         required: "Required field",
//         submit: "Submit",
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
//                         "Registration successful! An activation link has been sent to your email. Valid for: {time}",
//                 },
//             },
//             login: "Already have an account?",
//         },
//         login: {
//             name: "Login",
//             feedback: {
//                 success: {
//                     loginSuccess: "Login successful!",
//                 },
//                 errors: {
//                     notActive: "Account is not activated.",
//                     passwordNotFound: `Password not set! Click: "{btn}"`,
//                     sendMail: "Account is not activated. Send activation email",
//                     expire: "Account is not activated. Activation link has expired. Send a new email",
//                     alreadySend:
//                         "Account is not activated. Activation email has already been sent. Valid for: {time}",
//                 },
//             },
//             register: "Don't have an account?",
//         },
//         admin: {
//             name: "main",
//             settings: { name: "Settings" },
//             login: {
//                 name: "Login",
//                 feedback: {
//                     success: {
//                         loginSuccess: "Login successful!",
//                     },
//                 },
//             },
//             forgotPassword: {
//                 changePassword: {
//                     name: "Change password",
//                     feedback: {
//                         success: {
//                             changeSuccess: "Password changed successfully!",
//                         },
//                         errors: {
//                             timeout:
//                                 "The password reset link has expired! Please request a new one",
//                             notFound: "Invalid link! Please request a new one",
//                         },
//                     },
//                 },
//                 name: "Forgot password?",
//                 login: "Back to login",
//                 feedback: {
//                     errors: {
//                         alreadySent:
//                             "A password reset email has already been sent. Valid for: {time}",
//                     },
//                     success:
//                         "A password reset email has been sent. Valid for: {time}",
//                 },
//             },
//         },

//         activate: {
//             feedback: {
//                 success: {
//                     accountActivate: "Account successfully activated.",
//                 },
//                 errors: {
//                     notValid: "Invalid link!",
//                     expired: "Activation link has expired",
//                 },
//             },
//         },
//         forgotPassword: {
//             changePassword: {
//                 name: "Change password",
//                 feedback: {
//                     success: {
//                         changeSuccess: "Password changed successfully!",
//                     },
//                     errors: {
//                         timeout:
//                             "The password reset link has expired! Please request a new one",
//                         notFound: "Invalid link! Please request a new one",
//                     },
//                 },
//             },
//             name: "Forgot password?",
//             login: "Back to login",
//             feedback: {
//                 errors: {
//                     alreadySent:
//                         "A password reset email has already been sent. Valid for: {time}",
//                 },
//                 success:
//                     "A password reset email has been sent. Valid for: {time}",
//             },
//         },
//         profile: {
//             name: "My account",
//             settings: {
//                 name: "Settings",
//                 groups: {
//                     account: "Account",
//                     other: "Other",
//                 },
//                 profile: {
//                     name: "Profile",
//                 },
//                 password: {
//                     name: "Password",
//                 },
//                 sessions: {
//                     name: "Sessions",
//                 },
//             },
//         },
//         notFound: {
//             name: "404",
//         },
//     },
//     api: {
//         ERR_NETWORK: "No network connection. Try again later.",
//         FALLBACK_ERR: "Oops! Something went wrong, try again later",
//         FORBIDDEN: "Access denied",
//         UNAUTHORIZED: "You are not authorized! Please log in",
//         NOT_FOUND: "404 error",
//         ABORT_ERROR: "Request was cancelled",
//         auth: "Authentication error, reload the page or log in again",
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
//             resetToken: {
//                 title: "Oops!",
//                 subtitle: "Something went wrong",
//             },
//             activate: {
//                 title: "Oops!",
//                 subtitle: "Something went wrong",
//                 reload: "send email",
//             },
//             forbidden: {
//                 title: "Oops!",
//                 subtitle: "Access denied",
//                 reload: "reload",
//             },
//             auth: {
//                 title: "Oops!",
//                 subtitle: "Authentication failed",
//                 reload: "Request data again",
//             },
//             unauthorized: {
//                 title: "Oops!",
//                 subtitle: "You are not authorized",
//                 reload: "Request data again",
//             },
//         },
//     },
//     features: {
//         theme: {
//             name: "Theme",
//         },
//         language: {
//             name: "Language",
//         },
//         logout: {
//             name: "Logout",
//             error: "Failed to log out! Try again later",
//             success: "You have successfully logged out",
//         },
//         logoutErr: {
//             name: "Reset session",
//             error: "Failed to reset session! Try again later",
//             success: "Session reset successfully",
//         },
//         activate: {
//             name: "Send email",
//             error: {
//                 alreadySend:
//                     "Activation email has already been sent. Valid for: {time}",
//                 alreadyActive: "User is already activated",
//             },
//             success: {
//                 sendSuccess:
//                     "Activation email has been sent. Valid for: {time}",
//             },
//         },
//     },
//     mail: {
//         resetPassword: {
//             title: "Password reset",
//             text: "Password reset",
//             button: "Reset password",
//             exsited: "Link valid for: {time}",
//         },
//         activate: {
//             title: "Account activation",
//             text: "Account activation",
//             button: "Activate account",
//             exsited: "Link valid for: {time}",
//         },
//     },
// };
