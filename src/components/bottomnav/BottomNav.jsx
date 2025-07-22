import React, { useState } from 'react';
import './BottomNav.css';

function BottomNav() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="layout-footer">
                <div className="footer-nav-outer ivu-row-flex ivu-row-flex-middle">
                    <div className="footer-nav-item ivu-col ivu-col-span-sm-24 ivu-col-span-md-24 ivu-col-span-lg-8 ivu-col-span-xl-8">
                        <a href='/stakes' className="title-grey999-PFR-14">Stake</a>
                    </div>
                    <div className="footer-nav-item ivu-col ivu-col-span-sm-24 ivu-col-span-md-24 ivu-col-span-lg-8 ivu-col-span-xl-8">
                        <a href="/earn" className="title-grey999-PFR-14">Earn</a>
                    </div>
                    <div className="footer-nav-item ivu-col ivu-col-span-sm-24 ivu-col-span-md-24 ivu-col-span-lg-8 ivu-col-span-xl-8">
                        <a href='/reservation' className="title-grey999-PFR-14">Reserve</a>
                    </div>
                    <div className="footer-nav-item ivu-col ivu-col-span-sm-24 ivu-col-span-md-24 ivu-col-span-lg-8 ivu-col-span-xl-8">
                        <a href='/userDetails/1' className="title-grey999-PFR-14">Account</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BottomNav;
