import React from "react";
import "./Blockphone.css";

const Blockphone = () => (
  <div className="blockphone-container">
    <h1>How to Block your Stolen/Lost Mobile Phone</h1>
    <p>To block your stolen or lost mobile phone, follow these steps:</p>
    <ol>
      <li>
        <strong>Online:</strong> Submit a complaint at&nbsp;
        <a href="http://www.cplc.org.pk" target="_blank" rel="noopener noreferrer">
          CPLC Website
        </a>
      </li>
      <li>
        <strong>Call:</strong>
        <ul>
          <li>
            CPLC (Citizen Police Liaison Committee): <b>021-35662222</b>
          </li>
          <li>
            Police (Rescue 15): <b>15</b>
          </li>
          <li>
            PTA (Pakistan Telecom Authority): <b>0800-25625</b>
          </li>
        </ul>
      </li>
      <li>
        <strong>Fax:</strong> Send your complaint to CPLC at <b>021-35683336</b>
      </li>
      <li>
        <strong>Email:</strong> Send an email to PTA at <b>imei@pta.gov.pk</b>
      </li>
    </ol>
    <p>
      You will need to provide some basic information along with the <b>IMEI number</b> of your lost mobile phone. Authorities will request all mobile operators to block this IMEI on their networks.
    </p>
    <h2>What is IMEI?</h2>
    <p>
      IMEI is a unique number for every GSM mobile phone. It is usually found printed on or underneath the phone's battery and warranty card. You can also find it by dialing <b>*#06#</b> on your phone.
    </p>
    <p>
      The IMEI number is used by GSM networks to identify valid devices and can be used to stop a stolen phone from accessing the network. If your phone is stolen, you can instruct authorities to block it using its IMEI number, rendering the phone useless even if the SIM is changed.
    </p>
  </div>
);

export default Blockphone;