import React from "react";
import "./Blockphone.css"; // Uses your site's default styles

const WarrantyCheck = () => {
  return (
    <div className="blockphone-container">
      <h1>E-Warranty Activation</h1>

      <h2>What is E-Warranty?</h2>
      <p>
        E-Warranty is a new warranty service introduced by most mobile phone brands including Samsung, Xiaomi, Oppo, Vivo, Nokia, Realme, Tecno, Infinix, and Huawei. It acts as a digital backup of the traditional paper warranty card and provides official verification of your phone's warranty status.
      </p>

      <h2>How Does It Work?</h2>
      <p>
        Once you insert a SIM card and connect your new phone to the internet, the warranty is automatically activated by the manufacturer — no extra steps are required.
      </p>

      <h2>How to Check Your Phone’s Warranty</h2>
      <p>Use the official brand channels below to check your phone's warranty status using its IMEI or serial number:</p>

      <ul>
        <li>
          <b>Samsung:</b> <a href="https://www.samsung.com/pk/support/your-service/warranty-eula" target="_blank" rel="noreferrer">Samsung Warranty Checker</a>
        </li>
        <li>
          <b>Apple:</b> <a href="https://checkcoverage.apple.com/" target="_blank" rel="noreferrer">Apple Coverage Checker</a>
        </li>
        <li>
          <b>Oppo:</b> <a href="https://support.oppo.com/pk/warranty-check/" target="_blank" rel="noreferrer">Oppo Warranty Checker</a>
        </li>
        <li>
          <b>Xiaomi:</b> Contact the official distributor mentioned on your phone's box.
        </li>
        <li>
          <b>Nokia:</b> Contact the official distributor mentioned on your phone's box.
        </li>
        <li>
          <b>Vivo:</b> <a href="https://www.vivo.com/pk/support/IMEI" target="_blank" rel="noreferrer">Vivo IMEI Checker</a>
        </li>
        <li>
          <b>Infinix / Itel / Tecno:</b> Use Carlcare services at <a href="https://www.carlcare.com/pk/warranty-check/" target="_blank" rel="noreferrer">Carlcare Warranty Check</a>
        </li>
        <li>
          <b>Tecno:</b> <a href="https://www.tecno-mobile.com/warranty/" target="_blank" rel="noreferrer">Tecno Warranty Checker</a>
        </li>
        <li>
          <b>Realme:</b> <a href="https://www.realme.com/pk/support/phonecheck" target="_blank" rel="noreferrer">Realme Phone Check</a>
        </li>
        <li>
          <b>Digit:</b> Call <b>0304 1114123</b> or visit a local service center.
        </li>
        <li>
          <b>Sparx:</b> <a href="https://deploy.com.pk/warranty-check/index.html" target="_blank" rel="noreferrer">Sparx Warranty Check</a>
        </li>
        <li>
          <b>VGO TEL:</b> Visit the nearest authorized service center. <a href="http://www.vgotel.com/contact/" target="_blank" rel="noreferrer">VGO Tel Contact</a>
        </li>
      </ul>

      <h2>Important Note</h2>
      <p>
        These are official brand-authorized methods for checking mobile phone warranties. Avoid using third-party websites not listed here, as they may provide inaccurate or misleading information.
      </p>
    </div>
  );
};

export default WarrantyCheck;
