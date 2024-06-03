/* eslint-disable react/prop-types */
import { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { MdOutlinePending } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { ModalNotification, ModalAccount, ModalPendings } from '../modals/Modals'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Header.css'


const Header = ({ user, toggleMenu }) => {
    const [showBellPopup, setShowBellPopup] = useState(false);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [showPendingPopup, setShowPendingPopup] = useState(false);

    const toggleBellPopup = () => {
        setShowBellPopup(!showBellPopup);
        setShowImagePopup(false);
        setShowPendingPopup(false);
    };

    const toggleImagePopup = () => {
        setShowImagePopup(!showImagePopup);
        setShowBellPopup(false);
        setShowPendingPopup(false);
    };

    const togglePendingPopup = () => {
        setShowPendingPopup(!showPendingPopup);
        setShowBellPopup(false);
        setShowImagePopup(false);
    };

    return (
        <header>
            <div className="header-left">
                <LazyLoadImage
                    src='https://olsoftware.com/wp-content/uploads/2021/04/cropped-Logo-Oficial-OL-Software-230x64.png'
                    alt="Logo"
                    className="logo"
                    effect="blur"
                />
                <RxHamburgerMenu className="hamburger" onClick={toggleMenu} />
            </div>
            <div className="header-right">
                <CiBellOn onClick={toggleBellPopup} className='icon' />
                {showBellPopup && (
                    <ModalNotification onClose={toggleBellPopup} />
                )}
                <LazyLoadImage
                    src={user.photo}
                    alt="Profile"
                    className="profile-pic"
                    onClick={toggleImagePopup}
                    effect="blur"
                />
                {showImagePopup && (
                    <ModalAccount onClose={toggleImagePopup} />
                )}
                <MdOutlinePending className='icon' onClick={togglePendingPopup} />
                {showPendingPopup && (
                    <ModalPendings onClose={togglePendingPopup} />
                )}
            </div>
        </header>
    );
}

export default Header;
