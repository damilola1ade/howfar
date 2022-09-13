import React, { useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chat = () => {

    const { user } = useAuth ();
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg'})
    }

    useEffect(() => {
      if(!user) {
        history.push('/');

        return;
      }
      
       axios.get('https://api.chatengine.io/users/me', {
        headers: {
            'project-id': '5374f438-85e4-4ffc-ac0f-08dd164c521a',
            'user-name': user.email,
            'user-secret': user.uid,
        }
       })
       .then(() =>{
        setLoading=(false);
       })
       .catch(() =>{
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name )

                axios.post('https://api.chatengine.io/users', 
                    formdata,
                    { headers: { 'private-key': '7f013a71-c063-4d97-b42a-a8706670f0e0'}} )
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error))
       })
    }, [user, history]);

    if(!user || loading) return 'Loading...';
    
  return (
    <div className='chats-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
                Howfar
            </div>
            <div onClick={handleLogout} className='logout-tab'>
                Logout
            </div>
        </div>

        <ChatEngine 
            height ='calc(100vh - 66px)' 
            projectID='5374f438-85e4-4ffc-ac0f-08dd164c521a'
            userName={user.email}
            userSecret={user.uid}
            />
    </div>
  );
}

export default Chat