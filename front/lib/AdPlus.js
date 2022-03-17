import React from 'react';

const AdPlus = () => {
    return (
        <>
        <div id="protag-in_article_video"></div>
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html:`
                    window.googletag = window.googletag || { cmd: [] };
                    window.protag = window.protag || { cmd: [] };
                    window.protag.cmd.push(function () {
                        window.protag.display("protag-in_article_video");
                    });
                    `
            }}/>
        </>
    );
};

export default AdPlus;