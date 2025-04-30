import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 py-16 shadow-xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 px-8 text-white">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
            TriVenture
          </h1>
          <p className="text-base leading-7 opacity-90 hover:opacity-100 transition-opacity duration-300">
            Trải nghiệm tốt nhất cho mỗi chuyến đi. Tìm kiếm và khám phá những
            địa điểm thú vị theo sở thích của bạn.
          </p>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold mb-6 border-b-2 border-blue-300 pb-2 inline-block">
            {t("Company")}
          </span>
          <ul className="list-none p-0 space-y-3">
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("About Us")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Features")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Blog")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("FAQ")}
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold mb-6 border-b-2 border-blue-300 pb-2 inline-block">
            {t("Resources")}
          </span>
          <ul className="list-none p-0 space-y-3">
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Account")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Support Center")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Feedback")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Contact")}
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold mb-6 border-b-2 border-blue-300 pb-2 inline-block">
            {t("Support")}
          </span>
          <ul className="list-none p-0 space-y-3">
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Events")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Promotions")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Request Demo")}
            </li>
            <li className="text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:translate-x-1 cursor-pointer">
              {t("Careers")}
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold mb-6 border-b-2 border-blue-300 pb-2 inline-block">
            {t("Contact")}
          </span>
          <small className="text-sm mt-4 block bg-blue-800 bg-opacity-40 p-3 rounded-lg hover:bg-opacity-60 transition-all duration-300">
            triventure@triventure.vercel.app
          </small>
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <AiFillInstagram className="bg-white text-blue-600 p-2 w-10 h-10 rounded-full shadow-lg hover:bg-blue-100" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61575825501958"
              className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <BsFacebook className="bg-white text-blue-600 p-2 w-10 h-10 rounded-full shadow-lg hover:bg-blue-100" />
            </a>
            <a
              href="#"
              className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <BsLinkedin className="bg-white text-blue-600 p-2 w-10 h-10 rounded-full shadow-lg hover:bg-blue-100" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-6 border-t border-blue-400 text-center text-white text-sm opacity-75">
        <p>
          © {new Date().getFullYear()} TriVenture. {t("All rights reserved")}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
