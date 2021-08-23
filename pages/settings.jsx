import { useEffect, useState } from "react";
import Layout from "./componets/Layout";
import { toast } from "react-nextjs-toast";

import FormInput from "./componets/FormInput";
import {
  getLatestAdminSettings,
  setLatestAdminSettings,
} from "../api/adminSettings";
import { ErrorToast, InfoToast, SucessToast } from "../helpers/toastTypes";

export async function getServerSideProps({ req }) {
  return {
    props: {
      isAdmin: req.locals?.isAdmin,
    },
  };
}

export default function Index({ isAdmin }) {
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
        toast.notify("Admin Settings Updated Successfully !!", SucessToast);
        toast.notify("Settings will take effect on next login !!", InfoToast);
      })
      .catch(() => {
        toast.notify("Error In Updating Admin Settings !!", ErrorToast);
      });
  };

  // Make a settings form
  return (
    <Layout isAdmin={isAdmin}>
      {/* Admin settings */}
      {isAdmin && (
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
      )}
    </Layout>
  );
}
