import React from "react";

const Blockphone = () => (
  <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How to Block your Stolen/Lost Mobile Phone</h1>
    <p className="mt-4 text-slate-600">To block your stolen or lost mobile phone, follow these steps:</p>
    <ol className="mt-5 list-decimal space-y-3 pl-6 text-slate-700 marker:font-semibold marker:text-orange-600">
      <li>
        <strong>Online:</strong> Submit a complaint at&nbsp;
        <a className="font-semibold text-orange-600 hover:text-orange-700 hover:underline" href="https://www.cplc.org.pk" target="_blank" rel="noopener noreferrer">
          CPLC Website
        </a>
      </li>
      <li>
        <strong>Call:</strong>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-600">
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
    <p className="mt-5 leading-7 text-slate-600">
      You will need to provide some basic information along with the <b>IMEI number</b> of your lost mobile phone. Authorities will request all mobile operators to block this IMEI on their networks.
    </p>
    <h2 className="mt-8 text-2xl font-bold text-slate-900">What is IMEI?</h2>
    <p className="mt-3 leading-7 text-slate-600">
      IMEI is a unique number for every GSM mobile phone. It is usually found printed on or underneath the phone's battery and warranty card. You can also find it by dialing <b>*#06#</b> on your phone.
    </p>
    <p className="mt-4 leading-7 text-slate-600">
      The IMEI number is used by GSM networks to identify valid devices and can be used to stop a stolen phone from accessing the network. If your phone is stolen, you can instruct authorities to block it using its IMEI number, rendering the phone useless even if the SIM is changed.
    </p>
    </article>
  </main>
);

export default Blockphone;