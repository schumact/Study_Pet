import React, {useState} from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal} from '@ionic/react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {

    return (
        <div style={{margin: "5%"}}>
            <h2 className="monospace">Privacy Policy</h2>
            <p className="info">We built the Purrsistent Pet app as a free app. This app is free and intended for
                use as is. </p>

            <p className="info">Accepting the terms and agreements means that you agree to the collection and use of information in
                relation to this policy. At this current point in time, Purssistent Pet does not require any
                personal identifiable information of the user. All information from the user that is stored
                is related to a users goals that he or she sets. This information will not be shared with third
                party entities. </p>

            <h2 className="monospace">Information Collection and Use</h2>

            <h6 className="monospace2">Security</h6>

            <p className="info">Purrsistent Pet value your trust in providing us your information for personal goals, and we are attempting our best
                to keep this confidential goal information secure. While no method of electronic storage is 100%
                secure and reliable, we can guarantee that all the best and latest security measures to keep your
                data safe are in place. </p>

            <h2 className="monospace">Changes to This Privacy Policy</h2>

            <p className="info">This Privacy Policy may change from time to time. In such a circumstance, users will receive an
                email informing them that the privacy policy has been updated and that they should review it at
                their own discretion.
            </p>

            <h2 className="monospace">Contact Us</h2>

            <p className="info">Questions and concerns about Purrsistent Pet Privacy Policy can be directed towards support@purrsistentpet.com</p>
        </div>
    );
};

export default PrivacyPolicy;
