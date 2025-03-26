'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if (userRecord.exists) {
            return {
                sucess: false,
                message: "User already exists . Please sign in instead"
            }
        }
        await db.collection('users').doc(uid).set({
            name, email
        })
        return {
            sucess: true,
            message: "Account Created Successfully.Please Sign IN"
        }
    } catch (error: any) {
        console.error('Error creating a user', error)
        if (error.code === 'auth/email-already-exists') {
            return {
                sucess: false,
                message: "this email is already in use"
            }
        }
        return {
            sucess: false,
            message: "error creating new user"
        }
    }
}
export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                sucess: false,
                message: "User not found"
            }
        }
        await setSessionCookie(idToken);
    } catch (error: any) {
        console.log(error.message)
        return {
            sucess: false,
            message: "failed to log into your account"
        }
    }
}
export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 * 7 * 1000,
    })
    cookieStore.set('session', sessionCookie, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}
export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) return null;
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
        if (!userRecord.exists) {
            return null;
        }
        return {
            ...userRecord.data(),
            id: userRecord.id,

        } as User;

    } catch (error) {
        console.error('Error getting current user', error)
        return null;
    }
}
export async function isAuthenicated() {
    const user = await getCurrentUser();
    return !!user;
}
export async function getLatestInterviews(
    params: GetLatestInterviewsParams
  ): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;
  
    const interviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .limit(limit)
      .get();
  
    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  }
  
  export async function getInterviewsByUserId(
    userId: string
  ): Promise<Interview[] | null> {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
  
    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  }