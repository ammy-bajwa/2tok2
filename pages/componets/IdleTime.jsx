import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getLatestAdminSettings } from "../../api/adminSettings";

const IdleTime = (props) => {
  const [timeOutDuration, setTimeOutDuration] = useState(0);
  const [myTimeout, setMyTimeout] = useState(null);

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
    document.onmousemove = resetTimer;
    document.onclick = resetTimer;
    document.onkeypress = resetTimer;
    function resetTimer() {
      clearTimeout(time);
      clearLogOutTimeOut();
      if ((props?.userName || props?.isAdmin) && timeOutDuration !== 0) {
        time = setTimeout(logout, timeOutDuration * 60 * 1000);
        // time = setTimeout(logout, 5 * 1000);
        setMyTimeout(time);
      }
    }
    resetTimer();
  };

  const clearLogOutTimeOut = () => {
    clearTimeout(myTimeout);
  };

  return <></>;
};

export default IdleTime;
