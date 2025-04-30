import React from "react";
import { Typography, Card, Row, Col, Divider, Avatar, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./styles.scss";

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const projectInfo = {
    name: t(
      "TriVenture: An AI-Powered Travel Destination Recommendation System with Contextual Awareness and Personalized Planning"
    ),
    code: "SP25SEAI13",
    group: "TriVenture",
    type: t("Web portal"),
  };

  const teamMembers = [
    {
      name: "Phan Thị Lệ Thuyền",
      role: "Lecturer",
      avatar:
        "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/463962150_3027291900746572_6490505706949398660_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeF4iPwL8UjtvlsVgvjUjADZ6fJl0nDyE5Dp8mXScPITkNy62myYWRYGMgDHy-igXd0THuQBwjpvBSeR33NgVpEE&_nc_ohc=V3Gtm_856SgQ7kNvwEufuX_&_nc_oc=AdkFaxaJttO4ZroUW9Gd_1NgCMebu5-L4yqa5h0GOcA4Fd7-IYPtpCEtSWojB4QlKAA&_nc_zt=24&_nc_ht=scontent.fdad1-3.fna&_nc_gid=ymlfH-gKPTthPitbfVn3dQ&oh=00_AfHrRj9zH0qmFo-zO1rXnd-C45BbZocjrpTXdM5VhqvyAg&oe=680F7A53",
      email: "thuyenptl@fe.edu.vn",
      phone: "0975663030",
      social: {
        facebook: "https://www.facebook.com/phanlethuyen",
      },
    },
    {
      name: "Nguyễn Trọng Tài",
      role: "Lecturer",
      avatar:
        "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/492722437_704245828710590_4275141520432823040_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=iA4pKl7xHO8Q7kNvwGbOmFB&_nc_oc=AdmkX3ChPg3KsofM2wrfHyK7f3nx74OtenTKoSLs36XXARCsYNaoFE23AIfS_Ur-pn4&_nc_zt=23&_nc_ht=scontent.fdad1-3.fna&_nc_gid=IjKq-MEQ6NsvhEuc5xCddA&oh=00_AfGDitUbmbuJ2OM2aB5LxuzbIygq0MYVNAopqGTzbQa8Ng&oe=680F8E0F",
      email: "taint5@fe.edu.vn",
      phone: "0903346184",
      social: {
        facebook: "https://www.facebook.com/",
      },
    },
    {
      name: "Nguyễn Thành Đạt",
      role: "Leader",
      avatar:
        "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/448084016_1175886416745360_4490561524490607107_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGIKRd8HfpJtiU1EvZxeAsAwhsyKmAZIKTCGzIqYBkgpCO0mqDGmV3qa-L9nhU0TcMLgUBMyVejh0Q7z0yFVF2G&_nc_ohc=l6c2v0fgFzsQ7kNvwHT-jh2&_nc_oc=AdmFLcnVgBRtQELa9mmccX0jIAdgrTQ6vuffNag_bE4E-aO7DL0PaK-ThulYOSR27rU&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=uSA1_taiBwk6CUu2bw4r8Q&oh=00_AfHIipxpeiJ7jZPlqexT0Jnb7pf2WIMpa0DWIYzPnfD7bQ&oe=680F7EAB",
      email: "datntqe170110@fpt.edu.vn",
      phone: "0961551763",
      social: {
        facebook: "https://www.facebook.com/nguyen.at.105243",
      },
    },
    {
      name: "Ngô Đình Ẩn",
      role: "Member",
      avatar:
        "https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-1/429819513_3677815679167591_1179906572836336215_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEKP6ypmw-rUYSIcdNBB_f7JAsIXGI_SwYkCwhcYj9LBvKKGaD7JTzKhhBg2s9XN8IkU5sKIZ5G5HbC59DFsHaB&_nc_ohc=OAPFXCdqQ9gQ7kNvwGSZjKP&_nc_oc=AdklCHFsnnhZs_m-LYrx8TbTa1i_hEqQJSEf1fDTUyzxG3_gEz8OWd0OrvZobnESdGM&_nc_zt=24&_nc_ht=scontent.fdad2-1.fna&_nc_gid=vmFBADygkZFhaQMxZokr1Q&oh=00_AfF_iF_ZMpADpjAbIhYlrWA5YufxbYCXZ2WHAVMdErFwNA&oe=680F97D6",
      email: "anndqe170066@fpt.edu.vn",
      phone: "0349381142",
      social: {
        facebook: "https://www.facebook.com/dinhan023",
      },
    },
    {
      name: "Hồ Tôn Bảo",
      role: "Member",
      avatar:
        "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/454424247_3908580459428814_5831551353326970301_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGbf3bcsTrsc1IeyEnaLVmPS5HTJ148IWxLkdMnXjwhbJLdXMWKyDaS91Tr--sBYj1b_sJ_pPPaDxM-d94zFAqi&_nc_ohc=wa9g8eMgsxYQ7kNvwEbZAaf&_nc_oc=AdkmJsl3L3q41W7ZwqddWW5pBEfAnOpkXkVIjj99hubeQd4CPAV6MeWtLVcxStDaCBo&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=sP_YQ5trdCWqPGsqb9Wk-w&oh=00_AfFRTbBtHOlOtzsxb0mSZjNO1ekGUzFR_7TcUVmbjp8eGg&oe=680F7AA4",
      email: "baohtqe170017@fpt.edu.vn",
      phone: "0949800149",
      social: {
        facebook: "https://www.facebook.com/hotonbao",
      },
    },
    {
      name: "Lê Bùi Minh Hiếu",
      role: "Member",
      avatar:
        "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/488265543_4128590474042172_7946853842300843061_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGv6bRt4xpRVPXVW4dvUuGGS2NQ2W-13QJLY1DZb7XdAqEJowkCduMEwHaB3viXQGTaxSQzgiMeAEUvrGau7TkE&_nc_ohc=w2EROTElMfAQ7kNvwEW8MvF&_nc_oc=AdnR26QBlQ7QHLNHGLx4tUSlksyMz2IDKYtf9Qv_xY5CtAMJQVytZOJXFMzn19x7Ltw&_nc_zt=24&_nc_ht=scontent.fdad1-3.fna&_nc_gid=1-HlqtHWkOEqvxdzi2-PNA&oh=00_AfFUJju2QTxa-VEunuOhFKthDbyusU2CA77jtKPqmPhdjQ&oe=680F9ABF",
      email: "hieulbmqe170129@fpt.edu.vn",
      phone: "0388827368",
      social: {
        facebook: "https://www.facebook.com/hieu.le.minh.452102/",
      },
    },
  ];

  return (
    <div className="about-page-container">
      <div
        className="about-hero"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <motion.h1
            className="text-white text-3xl md:text-5xl font-bold font-sans"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("About TriVenture")}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Paragraph className="hero-subtitle">{projectInfo.name}</Paragraph>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={22} lg={18}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="mission-card">
                <Title
                  level={2}
                  className="text-2xl md:text-3xl text-center md:text-left"
                >
                  {t("Project Information")}
                </Title>
                <div className="project-info">
                  <div className="project-info-item">
                    <strong>{t("Project Name")}:</strong>
                    <span>{projectInfo.name}</span>
                  </div>
                  <div className="project-info-item">
                    <strong>{t("Project Code")}:</strong>
                    <span>{projectInfo.code}</span>
                  </div>
                  <div className="project-info-item">
                    <strong>{t("Group Name")}:</strong>
                    <span>{projectInfo.group}</span>
                  </div>
                  <div className="project-info-item">
                    <strong>{t("Software Type")}:</strong>
                    <span>{projectInfo.type}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Divider className="my-8 md:my-12" />

        <Title
          level={2}
          className="text-center text-2xl md:text-4xl my-6 md:my-8"
        >
          {t("Our Vision")}
        </Title>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={22} lg={18}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="vision-card">
                <Paragraph className="vision-text font-sans">
                  {t(
                    "TriVenture envisions a future where travel planning is intuitive, personalized, and truly inspiring. We are building an AI-powered travel companion that goes beyond simple recommendations. TriVenture seamlessly integrates real-time data – from dynamic weather patterns and localized events to nuanced cultural trends – with a deep understanding of each traveler's unique preferences."
                  )}
                </Paragraph>

                <Paragraph className="vision-text mt-4 font-sans">
                  {t(
                    "Our mission is to transform the travel experience by empowering users with:"
                  )}
                </Paragraph>

                <ul className="mission-list font-sans">
                  <li>
                    <strong>{t("Effortless Planning")}:</strong>{" "}
                    {t(
                      "Say goodbye to fragmented, time-consuming research across multiple platforms. TriVenture simplifies the entire process, offering a streamlined and intuitive experience."
                    )}
                  </li>
                  <li>
                    <strong>{t("Deeply Personalized Journeys")}:</strong>{" "}
                    {t(
                      "Move beyond generic suggestions. TriVenture crafts itineraries that resonate with individual passions, learned preferences, and evolving travel styles."
                    )}
                  </li>
                  <li>
                    <strong>{t("Confident Exploration")}:</strong>{" "}
                    {t(
                      "Travel with assurance, knowing your itinerary is dynamically optimized for real-time conditions and tailored to your specific needs and desires."
                    )}
                  </li>
                </ul>

                <Paragraph className="vision-text mt-4 font-sans">
                  {t(
                    "TriVenture will be more than just an application; it will be a trusted companion that learns and adapts with you, continuously refining its understanding of your travel aspirations and the ever-changing world around us. By harnessing the power of AI and prioritizing a user-centric design, TriVenture aims to unlock the pure joy of travel, making every journey uniquely yours and effortlessly unforgettable."
                  )}
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Divider className="my-8 md:my-12" />

        <Title
          level={2}
          className="text-center text-2xl md:text-4xl my-6 md:my-8"
        >
          {t("Product Background")}
        </Title>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={22} lg={18}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="background-card">
                <Paragraph className="font-sans">
                  {t(
                    "In today's digital era, travel preferences have significantly evolved. While traditional package tours once dominated the industry, travelers are now increasingly embracing independent travel, seeking autonomy in planning, exploring, and curating their own experiences. The rise of online services and information technology has empowered individuals to research destinations, build itineraries, and manage bookings with unprecedented ease."
                  )}
                </Paragraph>

                <Paragraph className="mt-4 font-sans">
                  {t(
                    "Despite the proliferation of global travel platforms, many existing solutions still fall short of adequately addressing the distinct needs of personalized travel in local markets, particularly in Vietnam. Our team recognizes that current travel planning methods are often fragmented and disjointed. Travelers in pursuit of genuinely personalized experiences are frequently forced to navigate a complex and inefficient process, juggling multiple websites and applications."
                  )}
                </Paragraph>

                <Paragraph className="mt-4 font-sans            ">
                  {t(
                    "Recognizing this significant service gap, our team proposes the TriVenture concept. TriVenture harnesses the power of Artificial Intelligence (AI) and Machine Learning to generate tailored travel recommendations and optimize travel planning through an intuitive and interactive web system. This system is designed to become the leading platform for personalized travel experiences, bridging the critical gap between generic global platforms and the specific needs of travelers in this vibrant and dynamic market."
                  )}
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Divider className="my-8 md:my-12" />

        <Title
          level={2}
          className="text-center text-2xl md:text-4xl my-6 md:my-8"
        >
          {t("Our Advantage")}
        </Title>

        <Row gutter={[24, 24]} justify="center" className="features-row">
          <Col xs={24} sm={24} md={8} className="feature-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="feature-card h-full">
                <Title level={3} className="text-xl md:text-2xl">
                  {t("Deep AI-Driven Personalization")}
                </Title>
                <Paragraph className="font-sans">
                  {t(
                    "TriVenture employs advanced AI and Machine Learning algorithms to build comprehensive user profiles that go beyond basic inputs, analyzing explicitly stated preferences, implicit preferences learned from behavior, and travel history to understand evolving and nuanced preferences."
                  )}
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={24} md={8} className="feature-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="feature-card h-full">
                <Title level={3} className="text-xl md:text-2xl">
                  {t("Dynamic Contextual Awareness")}
                </Title>
                <Paragraph className="font-sans">
                  {t(
                    "Our platform integrates real-time data streams to dynamically adapt recommendations based on current context, including real-time weather data and cultural nuances, ensuring recommendations are locally relevant and sensitive."
                  )}
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={24} md={8} className="feature-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="feature-card h-full">
                <Title level={3} className="text-xl md:text-2xl">
                  {t("Seamlessly Integrated Features")}
                </Title>
                <Paragraph className="font-sans">
                  {t(
                    "We combine AI-powered recommendations, interactive chatbot planning, user reviews and ratings, and robust plan management to offer a comprehensive, personalized travel planning experience that truly understands each traveler's unique needs."
                  )}
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Divider className="my-8 md:my-12" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title
            level={2}
            className="text-center text-2xl md:text-4xl my-6 md:my-8"
          >
            {t("Our Team")}
          </Title>
          <Paragraph className="text-center mb-8">
            {t("Meet the talented individuals behind TriVenture")}
          </Paragraph>
        </motion.div>

        <Row gutter={[24, 24]} justify="center" className="team-row">
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} md={8} key={index} className="team-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="team-member-card h-full">
                  <div className="text-center">
                    <Avatar
                      size={100}
                      src={member.avatar}
                      className="member-avatar"
                    />
                    <Title level={4} className="mt-4 mb-0 text-lg md:text-xl">
                      {member.name}
                    </Title>
                    <div className="member-role">{member.role}</div>
                    <div className="member-contact">
                      <p>
                        <MailOutlined /> {member.email}
                      </p>
                      <p>
                        <PhoneOutlined /> {member.phone}
                      </p>
                    </div>
                    <Space size="middle" className="social-links">
                      {member.social.facebook && (
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FacebookOutlined />
                        </a>
                      )}
                    </Space>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <Divider className="my-8 md:my-12" />

        <Row gutter={[24, 24]} justify="center" className="mt-8">
          <Col xs={24} md={20} lg={16}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="contact-card">
                <Title level={2} className="text-2xl md:text-3xl">
                  {t("Get in Touch")}
                </Title>
                <Paragraph>
                  {t(
                    "We're always looking to improve our platform. If you have any questions, suggestions, or feedback, please don't hesitate to contact us."
                  )}
                </Paragraph>
                <Paragraph className="mb-0">
                  Email:{" "}
                  <a href="mailto:contact@triventure.com">
                    triventure@triventure.vercel.app
                  </a>
                </Paragraph>
                <Paragraph className="mb-0">
                  Facebook:{" "}
                  <a href="https://www.facebook.com/profile.php?id=61575825501958">
                    TriVenture
                  </a>
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutPage;
