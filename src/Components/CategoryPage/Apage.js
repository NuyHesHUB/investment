import React from 'react';

const APage = () => {

    const basecodeUrl = "http://211.198.44.123:3385/v1/basecode/?basecodeId=7&depth1=&depth2=&depth3=&query=&pageRows=&page=";

fetch(basecodeUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.status === true) {
      const basecodeList = data.query;
      console.log("Basecode List:", basecodeList);
      console.log("Total Rows:", data.totalRows);
    } else {
      console.error("Error in basecode API response");
    }
  })
  .catch((error) => {
    console.error("Error fetching basecode data:", error);
  });
    return (
        <div>
            APage
        </div>
    );
};

export default APage;