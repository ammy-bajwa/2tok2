import { refLink } from "../../constants/link";
import Link from "next/link";

const handleRefCellRenderer = ({ data }) => {
  return data?.ref ? (
    <Link classList="text-light" href={`${refLink}${data?.ref}`}>
      data?.ref
    </Link>
  ) : (
    ""
  );
};

export default handleRefCellRenderer;
