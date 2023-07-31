import React, { useContext } from 'react'
import styles from "../styles/general.module.scss"
import { chatContext } from '../context/ChatContext'
import { Toaster } from 'react-hot-toast'

const Chat = () => {
    const { handleMessages, message, setMessage } = useContext(chatContext)
    return (
        <div className={`${styles.chat} w-full flex justify-center`}>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='w-full sm:w-[80%] md:w-[60%] lg:w-[50%]'>
                <div className='h-full flex flex-col'>
                    <div className={`${styles.chats} flex flex-col`}>
                        list of chats
                    </div>
                    <div className='flex flex-row justify-between items-center h-[60px]'>
                        <input type='text' placeholder='type your message...' value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={`${styles.message} w-[70%]`}
                        />
                        <button onClick={handleMessages}
                            className='text-center py-2 w-[25%] bg-cyan-600 rounded-md font-sembold capitalize text-sm hover:bg-cyan-300'
                        >send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat