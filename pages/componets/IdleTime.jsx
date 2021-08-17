import { useEffect } from "react";
import { useRouter } from "next/router";

const IdleTime = (props) => {
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
    document.onkeypress = resetTimer;
    function resetTimer() {
      clearTimeout(time);
      if (props?.userName) {
        time = setTimeout(logout, 1000 * 60);
      }
    }
  };

  useEffect(() => {
    inactivityTime();
  }, []);

  return <></>;
};

export default IdleTime;
