import { useEffect } from 'react';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from './lib/firebase.config';
import { useAppDispatch } from './redux/hooks';
import { setLoading, setUser, } from './redux/features/user/userSlice';

const auth = getAuth(app)

function App() {

  const dispatch = useAppDispatch();

 useEffect(() => {
   dispatch(setLoading(true));

   onAuthStateChanged(auth, (user) => {
     if (user) {
       dispatch(setUser(user.email!));
       dispatch(setLoading(false));
     } else {
       dispatch(setLoading(false));
     }
   });
 }, [dispatch]);


  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
