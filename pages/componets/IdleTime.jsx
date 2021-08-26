import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getLatestAdminSettings } from "../../api/adminSettings";
import RemainingTimeModal from "./RemainingTimeModal";

const IdleTime = (props) => {
  const [timeOutDuration, setTimeOutDuration] = useState(0);
  const [myTimeout, setMyTimeout] = useState(null);
  const [myInterval, setMyInterval] = useState(null);
  const [counter, setCounter] = useState("");

  useEffect(() => {
    if (props?.userName || props?.isAdmin) {
      getLatestAdminSettings()
        .then((latestSettings) => {
          const timeOutDuration = latestSettings?.idle_time_logout || 0;
          setTimeOutDuration(timeOutDuration);
        })
        .catch(() => {
          toast.notify(
            "Error In Fetching Latest Admin Settings !!",
            ErrorToast
          );
        });
    }
  }, [props]);

  useEffect(() => {
    if (timeOutDuration > 0) {
      inactivityTime();
    }
    return () => {
      const removeEventHandler = () => {};
      clearLogOutTimeOut();
      document.removeEventListener("keypress", removeEventHandler);
      document.removeEventListener("mousemove", removeEventHandler);
      document.removeEventListener("load", removeEventHandler);
    };
  }, [timeOutDuration]);

  const router = useRouter();
  const logout = () => {
    router.push("/user/logout");
    console.log("Logout successed: ");
  };

  const inactivityTime = function () {
    let time;
    window.onload = resetTimer;
    // DOM Events
    // document.onmousemove = resetTimer;
    document.onclick = resetTimer;
    document.onkeypress = resetTimer;
    function resetTimer() {
      clearTimeout(time);
      clearLogOutTimeOut();
      clearInterval(myInterval);
      if ((props?.userName || props?.isAdmin) && timeOutDuration !== 0) {
        time = setTimeout(
          startInterval,
          timeOutDuration * 60 * 1000 - 15 * 1000
        );
        // time = setTimeout(logout, 5 * 1000);
        setMyTimeout(time);
      }
    }
    resetTimer();
  };

  const startInterval = () => {
    document.getElementById("remainingTimeModalLaunch")?.click();
    const countDownDate = new Date(new Date().getTime() + 15 * 1000).getTime();
    const countDown = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      console.log("countDownDate: ", seconds);

      // Display the result in the element with id="demo"
      setCounter(`You will be logged out in ${seconds} seconds`);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(countDown);
        setCounter("");
        logout();
      }
    }, 1000);
    setMyInterval(countDown);
    document.onclick = () => {
      clearInterval(countDown);
      inactivityTime();
    };
    document.onkeypress = () => {
      clearInterval(countDown);
      inactivityTime();
    };
  };

  const clearLogOutTimeOut = () => {
    clearTimeout(myTimeout);
  };

  return (
    <>
      <RemainingTimeModal time={counter} logout={logout} />
    </>
  );
};

export default IdleTime;
