import { auth, db } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// List of allowed university email domains
const ALLOWED_DOMAINS = [
    '.edu',
    '.ac.uk',
    // Add more university domains here
];

// Generate random nickname (e.g., "CozyPanda42")
function generateNickname(): string {
    const adjectives = ['Happy', 'Cozy', 'Brave', 'Sunny', 'Swift', 'Calm', 'Bright', 'Kind'];
    const animals = ['Panda', 'Fox', 'Owl', 'Rabbit', 'Dolphin', 'Koala', 'Penguin', 'Otter'];
    const number = Math.floor(Math.random() * 100);
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adj}${animal}${number}`;
}

// Check if email is from allowed university domain
export function isUniversityEmail(email: string): boolean {
    return ALLOWED_DOMAINS.some(domain => email.toLowerCase().endsWith(domain));
}

// Sign up with university email
export async function signUp(email: string, password: string) {
    // Validate university email
    if (!isUniversityEmail(email)) {
        throw new Error('Please use a valid university email address');
    }

    // Create account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Send verification email
    await sendEmailVerification(userCredential.user);

    // Create user profile in Firestore with auto-generated nickname
    const nickname = generateNickname();
    await setDoc(doc(db, 'users', userCredential.user.uid), {
        nickname: nickname,
        email: email,
        nicknameRegenCount: 0, // Can regenerate up to 3 times
        createdAt: serverTimestamp()
    });

    return { user: userCredential.user, nickname };
}

// Sign in
export async function signIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

// Sign out
export async function logOut() {
    await signOut(auth);
}

// Check if current user's email is verified
export function isEmailVerified(): boolean {
    return auth.currentUser?.emailVerified ?? false;
}

// Resend verification email
export async function resendVerificationEmail() {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
        await sendEmailVerification(user);
    }
}

// Get current user
export function getCurrentUser(): User | null {
    return auth.currentUser;
}

// Listen for auth state changes
export function onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}

// Check if user can use app (logged in + verified)
export function canUseApp(): boolean {
    const user = auth.currentUser;
    return user !== null && user.emailVerified;
}
