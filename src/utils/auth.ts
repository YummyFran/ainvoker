import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, updateProfile, User } from 'firebase/auth'
import { auth, google } from "./firebase.js";
import { FirebaseError } from 'firebase/app';

type UserCredential = Promise<[User | null, FirebaseError | null]>

export const signUp = async (email: string, password:string, displayName: string): UserCredential => {
    let user: User | null = null
    let err: FirebaseError | null = null
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        user = userCredential.user

        await updateProfile(user, { displayName })
        await user.reload()

        user = auth.currentUser
    } catch (error) {
        err = error as FirebaseError
    }
  
    return [user, err]
}

export const signIn = async (email:string, password:string): UserCredential => {
    let user: User | null = null
    let err: FirebaseError | null = null
  
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        user = userCredential.user
    } catch (error) {
        err = error as FirebaseError
    }
  
    return [user, err]
}

export const signInWithGoogle = async (): UserCredential => {
    let user: User | null = null
    let err: FirebaseError | null = null

    try {
        const res = await signInWithPopup(auth, google)
        
        user = res.user
    } catch (error) {
        err = error as FirebaseError
    }

    return [user, err]
}
  
export const logOut = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        throw error
    }
}