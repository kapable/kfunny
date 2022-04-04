import React from 'react';

const Mobon = () => {
    return (
        <>
            <script src='//img.mobon.net/js/common/HawkEyesMaker.js'></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    new HawkEyes({
                        "type":"mcover",
                        "platform":"M",
                        "scriptCode":"635105",
                        "settings":{"types":"ico_m","bCover":"true"}});
                    `,
                }}/>
        </>
    );
};

export default Mobon;