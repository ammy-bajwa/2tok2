import { refLink } from "../../constants/link";

const handleRefCellRenderer = ({ data }) => {
  const refLinkElem = document.createElement("a");
  refLinkElem.classList.add("text-light");
  refLinkElem.target = "_blank";
  refLinkElem.href = `${refLink}${data?.ref}`;
  refLinkElem.innerHTML = data?.ref;

  return data?.ref ? refLinkElem : "";
};

export default handleRefCellRenderer;
