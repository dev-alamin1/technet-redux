import { useEffect } from 'react';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from './lib/firebase.config';
import { useAppSelector,useAppDispatch } from './redux/hooks';
import { setUser } from './redux/features/user/userSlice';

const auth = getAuth(app)

function App() {

  const dispatch = useAppDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        dispatch(setUser(user?.email));
        console.log("from auth state change",user?.email)
    })
  },[dispatch])

  const {user} = useAppSelector(state=>state.user);

  console.log("User from redux store "+user.email)

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
