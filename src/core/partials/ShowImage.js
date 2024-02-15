import React from "react";
import { API_URL } from "../../config";

const ShowImage = React.forwardRef(({ item, url, className, width }, ref) => {
  return (
    <img
      style={{ maxWidth: "100%", maxHeight: "220px" }}
      className={className}
      src={`${API_URL}${url}/${item._id}`}
      alt={`${item.name}`}
      width={width}
      ref={ref}
    />
  );
});
export default ShowImage;
