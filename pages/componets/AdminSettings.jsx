import { useEffect, useState } from "react";
import { toast } from "react-nextjs-toast";
import { ErrorToast, InfoToast, SucessToast } from "../../helpers/toastTypes";

import {
  getLatestAdminSettings,
  setLatestAdminSettings,
} from "../../api/adminSettings";

import FormInput from "./FormInput";

export default function Index() {
  const [timeOutDuration, setTimeOutDuration] = useState(0);

  useEffect(() => {
    getLatestAdminSettings()
      .then((latestSettings) => {
        const timeOutDuration = latestSettings?.idle_time_logout || 0;
        setTimeOutDuration(timeOutDuration);
      })
      .catch(() => {
        toast.notify("Error In Fetching Latest Admin Settings !!", ErrorToast);
      });
  }, []);

  const onTimeOutChangeHandler = (event) => {
    setTimeOutDuration(event?.target?.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLatestAdminSettings(timeOutDuration)
      .then(() => {
        toast.notify(
          "Admin Settings Updated Successfully It Will Take Effect on Next Login!!",
          SucessToast
        );
      })
      .catch(() => {
        toast.notify("Error In Updating Admin Settings !!", ErrorToast);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <FormInput
        label="Enter idle time out duration in minutes"
        placeHolder={2}
        type="number"
        isRequired
        value={timeOutDuration}
        onChange={onTimeOutChangeHandler}
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
