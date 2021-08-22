import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getLatestAdminSettings } from "../../api/adminSettings";

const IdleTime = (props) => {
  const [timeOutDuration, setTimeOutDuration] = useState(0);
  const [myTimeout, setMyTimeout] = useState(null);

  useEffect(() => {
    if (props?.userName) {
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
  }, [props?.userName]);

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
      console.log("timeOutDuration applied: ", timeOutDuration);
      if (props?.userName && timeOutDuration !== 0) {
        time = setTimeout(logout, timeOutDuration * 1000 * 60);
        setMyTimeout(time);
      }
    }
  };

  const clearLogOutTimeOut = () => {
    clearTimeout(myTimeout);
  };

  return <></>;
};

export default IdleTime;
