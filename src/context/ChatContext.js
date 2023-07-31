import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { createContext, useState } from 'react'
import { auth, db, storage } from '../config/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'



// creating chat context
export const chatContext = createContext({})
const ChatContext = ({ children }) => {
    // creating user with password and email 

    const [uploadingStatus, setUploadingStatus] = useState(-1)
    const registerUser = async (email, password, username, profileImg) => {
        await createUserWithEmailAndPassword(auth, email, password).then((user) => {
            // uploading image
            const profileRef = ref(storage, `userProfiles/${username}`)
            const uploadTask = uploadBytesResumable(profileRef, profileImg)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'running': setUploadingStatus(progress); break;
                    case 'paused': console.log('paused'); break;
                    default: "uploading"; break;
                }

            },
                (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (profileURL) => {
                        await updateProfile(user.user, {
                            displayName: username,
                            photoURL: profileURL
                        })
                        await setDoc(doc(db, "chatUsers", user.user.uid), {
                            email: user.user.email,
                            username: user.user.displayName,
                            profileURL: user.user.photoURL,
                            userId: user.user.uid
                        })
                    })
                })
            toast.success('created an account')

        }).catch((error) => {
            console.log(error)
            toast.error("error while registering this email")
        })
    }
    // login user

    const [activeUser, setActiveUser] = useState([])
    const handleLogin = async (email, password) => {
        await fetchSignInMethodsForEmail(auth, email).then(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setActiveUser(user)
                    toast.success("login successfully")

                })
                .catch((error) => {
                    console.log(error)
                });
        }).catch(() => {
            toast.error('user does not exist')
        })
    }
    // storing active users chats inside subcollection known as messages
    const [message, setMessage] = useState('')
    const handleMessages = () => {
        if (message.length < 1) {
            toast.error("cannot send empty message")
        } else {
            const messageSubCollectionRef = collection(db, "chatUsers", activeUser.uid, "messages")
            const createdAt = serverTimestamp()
            addDoc(messageSubCollectionRef, {
                message,
                owner: activeUser.displayName,
                sentAt: createdAt
            }).then(() => {
                toast.success("sent")
                setTimeout(() => {
                    setMessage('')
                }, 1500);
            }).catch(() => {
                toast.error('failed to send your message')
            })
        }

    }




    return (
        <chatContext.Provider value={{
            registerUser, uploadingStatus, activeUser, handleLogin, handleMessages,
            message, setMessage
        }}>
            {children}
        </chatContext.Provider>
    )
}

export default ChatContext