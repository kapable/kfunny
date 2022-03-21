import React from 'react';

const Mobon = () => {
    return (
        <>
            {/* <script src='//img.mobon.net/js/common/HawkEyesMaker.js'></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    new HawkEyes({
                        "type":"banner",
                        "platform":"M",
                        "scriptCode":"635104",
                        "frameCode":"43",
                        "width":"320","height":"100",
                        "settings":{"cntsr":"4","mChk":"100"}});
                    `,
                }}/> */}
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