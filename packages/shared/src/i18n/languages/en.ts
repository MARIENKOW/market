// import { MessageStructure } from "./ru";
// import {
//     CHANGE_PASSWORD_OTP_LENGTH,
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
//         currentPassword: {
//             min: `minimum ${PASSWORD_MIN_LENGTH} characters`,
//             max: `maximum ${PASSWORD_MAX_LENGTH} characters`,
//             invalid: `Invalid password`,
//             label: `Current Password`,
//         },
//         newPassword: {
//             min: `minimum ${PASSWORD_MIN_LENGTH} characters`,
//             max: `maximum ${PASSWORD_MAX_LENGTH} characters`,
//             sameAsCurrent: "New password must be different from current",
//             label: `New Password`,
//         },
//         code: {
//             length: `Code must be ${CHANGE_PASSWORD_OTP_LENGTH} digits`,
//             digits: "Digits only",
//             label: "Verification code",
//         },
//         email: {
//             max: `maximum ${EMAIL_MAX_LENGTH} characters`,
//             invalid: `Invalid email format`,
//             notFound: `Email not found`,
//             unique: `Email must be unique`,
//             label: `Email`,
//         },
//         rePassword: {
//             label: `Repeat Password`,
//             same: "Passwords do not match",
//             min: `minimum ${PASSWORD_MIN_LENGTH} characters`,
//             max: `maximum ${PASSWORD_MAX_LENGTH} characters`,
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
//                         "Registration successful! Activation link has been sent to your email. Valid for: {time}",
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
//                     expire: "Account is not activated. Activation link expired. Send a new email",
//                     alreadySend:
//                         "Account is not activated. Activation email already sent. Valid for: {time}",
//                 },
//             },
//             register: "Don't have an account?",
//         },
//         admin: {
//             name: "Home",
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
//                     subtitle: "Email confirmation required",
//                 },
//                 sessions: {
//                     name: "Sessions",
//                 },
//             },
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
//                     name: "Change Password",
//                     feedback: {
//                         success: {
//                             changeSuccess: "Password changed successfully!",
//                         },
//                         errors: {
//                             timeout:
//                                 "Reset link expired! Please request a new one",
//                             notFound: "Invalid link! Please request a new one",
//                         },
//                     },
//                 },
//                 name: "Forgot password?",
//                 login: "Back to login",
//                 feedback: {
//                     errors: {
//                         alreadySent:
//                             "Reset email already sent. Valid for: {time}",
//                     },
//                     success: "Reset email sent. Valid for: {time}",
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
//                     expired: "Link has expired",
//                 },
//             },
//         },

//         forgotPassword: {
//             changePassword: {
//                 name: "Change Password",
//                 feedback: {
//                     success: {
//                         changeSuccess: "Password changed successfully!",
//                     },
//                     errors: {
//                         timeout: "Reset link expired! Please request a new one",
//                         notFound: "Invalid link! Please request a new one",
//                     },
//                 },
//             },
//             name: "Forgot password?",
//             login: "Back to login",
//             feedback: {
//                 errors: {
//                     alreadySent: "Reset email already sent. Valid for: {time}",
//                 },
//                 success: "Reset email sent. Valid for: {time}",
//             },
//         },

//         profile: {
//             name: "My Account",
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
//                     subtitle: "Email confirmation required",
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
//         NOT_FOUND: "Error 404",
//         ABORT_ERROR: "Request aborted",
//         auth: "Authentication error. Reload page or log in again",
//     },

//     feedback: {
//         empty: {
//             title: "Nothing here yet",
//         },
//         error: {
//             network: {
//                 title: "Oops!",
//                 subtitle: "No network connection.",
//                 reload: "Reload",
//             },
//             fallback: {
//                 title: "Oops!",
//                 subtitle: "Something went wrong",
//                 reload: "Reload",
//             },
//             resetToken: {
//                 title: "Oops!",
//                 subtitle: "Something went wrong",
//             },
//             activate: {
//                 title: "Oops!",
//                 subtitle: "Something went wrong",
//                 reload: "Resend email",
//             },
//             forbidden: {
//                 title: "Oops!",
//                 subtitle: "Access denied",
//                 reload: "Reload",
//             },
//             auth: {
//                 title: "Oops!",
//                 subtitle: "Authentication failed",
//                 reload: "Retry request",
//             },
//             unauthorized: {
//                 title: "Oops!",
//                 subtitle: "You are not authorized",
//                 reload: "Retry request",
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
//             name: "Log out",
//             error: "Failed to log out. Try again later",
//             success: "Successfully logged out",
//         },
//         logoutErr: {
//             name: "Reset session",
//             error: "Failed to reset session. Try again later",
//             success: "Session reset successfully",
//         },
//         activate: {
//             name: "Send email",
//             error: {
//                 alreadySend: "Activation email already sent. Valid for: {time}",
//                 alreadyActive: "User is already activated",
//             },
//             success: {
//                 sendSuccess: "Activation email sent. Valid for: {time}",
//             },
//         },
//         changePassword: {
//             success: "Password changed successfully! Please log in again",
//             blocked: "Password change blocked. Try again in: {time}",
//             step1: "Enter passwords",
//             step2: "Confirm via email",
//             hint: "Code sent to {email}. Valid for: {time}",
//             cancel: "Cancel",
//             changeCooldown: "Next password change request available in: {time}",
//             resend: {
//                 name: "Resend",
//                 cooldown: "Resend in: {time}",
//                 limit: "Resend attempts exceeded",
//             },
//             code: {
//                 invalid: "Invalid code. Attempts left: {count}",
//                 blocked:
//                     "Invalid code. Password change blocked. Try again in: {time}",
//             },
//         },
//     },

//     mail: {
//         resetPassword: {
//             title: "Password Reset",
//             text: "Password Reset",
//             button: "Reset Password",
//             exsited: "Link valid for: {time}",
//         },
//         activate: {
//             title: "Account Activation",
//             text: "Account Activation",
//             button: "Activate Account",
//             exsited: "Link valid for: {time}",
//         },
//         changePassword: {
//             subject: "Password Change",
//             title: "Confirm Password Change",
//             description: "Enter this code to confirm password change:",
//             expires: "Code valid for: {time}",
//             ignore: "If you did not request a password change, ignore this email.",
//         },
//     },

//     components: {
//         sessionList: {
//             currentSession: "Current session",
//             otherSessions: "Other sessions · {count}",
//             thisDevice: "This device",
//             revokeSession: "Revoke session",
//             revokeSuccess: "Session revoked success",
//             empty: "No active sessions found",
//         },
//         confirmDialog: {
//             title: "Confirm action",
//         },
//     },
//     common: {
//         cancel: "Сancel",
//         сonfirm: "сonfirm",
//     },
// };
