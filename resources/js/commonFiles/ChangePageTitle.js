import React, { useEffect } from "react";

const ChangePageTitle = ({ pageTitle }) => {
    useEffect(() => {
        const prevTitle = document.title;
        if (pageTitle != undefined)
            document.title = pageTitle;
        return () => {
            document.title = prevTitle;
        };
    });

    return <></>;
};

export default ChangePageTitle;