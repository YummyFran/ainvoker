
export interface CredentialsType {
    name?: string;
    email: string;
    password: string;
}

export interface FirebaseAuthErrorCode {
    name: string | null;
    email: FirebaseEmailError | FirebaseGeneralAuthError | string | null;
    password: FirebasePasswordError | string | null;
}
  
export type FirebaseAuthError =
    | FirebaseEmailError
    | FirebasePasswordError
    | FirebaseGeneralAuthError;
  
export type FirebaseEmailError =
    | "auth/email-already-in-use"
    | "auth/invalid-email"
    | "auth/user-not-found"
    | "auth/account-exists-with-different-credential";
  
export type FirebasePasswordError =
    | "auth/wrong-password"
    | "auth/weak-password";
  
export type FirebaseGeneralAuthError =
    | "auth/too-many-requests"
    | "auth/user-disabled"
    | "auth/invalid-credential"
    | "auth/operation-not-allowed"
    | "auth/network-request-failed"
    | "auth/timeout"
    | "auth/app-not-authorized"
    | "auth/unauthorized-domain";
  
export const FirebaseErrors = {
    email: [
      "auth/email-already-in-use",
      "auth/invalid-email",
      "auth/user-not-found",
      "auth/account-exists-with-different-credential",
    ] as const,
  
    password: [
      "auth/wrong-password",
      "auth/weak-password",
    ] as const,
  
    general: [
      "auth/too-many-requests",
      "auth/user-disabled",
      "auth/invalid-credential",
      "auth/operation-not-allowed",
      "auth/network-request-failed",
      "auth/timeout",
      "auth/app-not-authorized",
      "auth/unauthorized-domain",
    ] as const,
}

export const FirebaseErrorLookup = {
    email: {...Object.fromEntries(
      [...FirebaseErrors.email].map(error => [error, true])
    )},
    password: {...Object.fromEntries(
      [...FirebaseErrors.password].map(error => [error, true])
    )},
    general: {...Object.fromEntries(
      [...FirebaseErrors.general].map(error => [error, true])
    )}
} as Record<string, {}>
  