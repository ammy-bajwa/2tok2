import { useState } from "react";
import FormInput from "./componets/FormInput";

export async function getServerSideProps({ req }) {
  return {
    props: {},
  };
}

export default function Index({}) {
  const [timeOutDuration, setTimeOutDuration] = useState(0);

  const onTimeOutChangeHandler = (event) => {
    setTimeOutDuration(event?.target?.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Make a settings form
  return (
    <div>
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
    </div>
  );
}
