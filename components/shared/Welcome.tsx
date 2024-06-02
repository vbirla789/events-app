import * as React from "react";
import { QRCodeSVG } from "qrcode.react";

interface YelpRecentLoginEmailProps {
  userFirstName?: string;
  loginDate?: Date;
  loginDevice?: string;
  loginLocation?: string;
  loginIp?: string;
  qrUrl?: string;
}

const YelpRecentLoginEmail: React.FC<YelpRecentLoginEmailProps> = ({
  userFirstName,
  loginDate,
  loginDevice,
  loginLocation,
  loginIp,
  qrUrl,
}) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(loginDate);

  return (
    <html>
      <head />
      <body className="bg-white font-sans">
        <div className="container mx-auto">
          <div className="py-10">
            <div className="text-center">
              <img
                src="https://uploads-ssl.webflow.com/64dc619021257128d0687cce/6512c9f5bcb88ff4f70e0862_ico-Insta.svg"
                alt="Yelp Logo"
                className="mx-auto"
              />
            </div>
            <div className="mt-10">
              <div className="text-center">
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/565102129/display_1500/stock-photo--bangkok-thailand-january-a-woman-s-hand-is-used-app-on-smart-phon-instagram-is-a-565102129.jpg"
                  alt="Yelp Header"
                  className="mx-auto"
                  style={{ maxWidth: "620px" }}
                />
              </div>
              <div className="py-4 text-center">
                <h1 className="text-3xl font-bold mb-2">Hi {userFirstName},</h1>
                <h2 className="text-2xl font-bold mb-4">
                  We noticed a recent login to your Yelp account.
                </h2>
                {qrUrl && (
                  <div className="mx-auto mb-4">
                    <QRCodeSVG value={qrUrl} />
                  </div>
                )}
                <p className="text-lg mb-2">
                  <b>Time:</b> {formattedDate}
                </p>
                <p className="text-lg mb-2">
                  <b>Device:</b> {loginDevice}
                </p>
                <p className="text-lg mb-2">
                  <b>Location:</b> {loginLocation}
                </p>
                <p className="text-sm text-gray-500">
                  *Approximate geographic location based on IP address:{" "}
                  {loginIp}
                </p>
                <p className="text-lg mb-2">
                  If this was you, there's nothing else you need to do.
                </p>
                <p className="text-lg mb-2">
                  If this wasn't you or if you have additional questions, please
                  see our support page.
                </p>
              </div>
              <div className="text-center">
                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer">
                  Learn More
                </button>
              </div>
              <div className="mt-10">
                {/* <img
                  src={`${baseUrl}/static/yelp-footer.png`}
                  alt="Yelp Footer"
                  className="mx-auto"
                  style={{ maxWidth: "620px" }}
                /> */}
              </div>
              <p className="text-center text-sm text-gray-700 mt-10">
                © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
                U.S.A. | www.yelp.com
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default YelpRecentLoginEmail;
