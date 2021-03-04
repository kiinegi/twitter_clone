import React, { useEffect } from 'react';
import styles from './App.module.css';
import { useSelector, useDispatch} from 'react-redux';
import { selectUser, login ,logout} from "./features/userSlice";
import { auth } from "./firebase";
import Feed from './compornents/Feed';
import Auth from './compornents/Auth';

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispacth = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispacth(
          login({
            uid : authUser.uid,
            photoUrl : authUser.photoURL,
            displayName : authUser.displayName,
          })
        );
      } else {
        dispacth(logout());
      };
    });
    return () => {
      unSub();
    };
  }, [dispacth]);

  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )};
    </>
  );
};

export default App;
