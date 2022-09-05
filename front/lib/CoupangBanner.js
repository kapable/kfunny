import React from 'react';

const CoupangBanner = () => {
    return (
        <>
            {/* <script src="https://ads-partners.coupang.com/g.js"></script>
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html:`
                    new PartnersCoupang.G({"id":593521,"template":"carousel","trackingCode":"AF4396324","width":"680","height":"140"});
                    `
            }}/> */}
            <iframe src="https://ads-partners.coupang.com/widgets.html?id=593521&template=carousel&trackingCode=AF4396324&subId=&width=360&height=140" width="100%" height="140" frameborder="0" scrolling="no" referrerpolicy="unsafe-url"></iframe>
        </>
    );
};



export default CoupangBanner;