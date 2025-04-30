import React, { useState } from "react";
import { InboxOutlined, SearchOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Button,
  Card,
  Image,
  message,
  Upload,
  Typography,
  Row,
  Col,
} from "antd";
import { UploadChangeParam } from "antd/es/upload";
import axios from "axios";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

interface ImageDataResponse {
  image_base64: string;
  image_name: string;
  similarity_score: number;
}

const ImageRetrieval: React.FC = () => {
  const { t } = useTranslation();
  const [imagebase64, setImagebase64] = useState("");
  const [matchedImage, setMatchedImage] = useState({} as ImageDataResponse);
  const [isLoading, setIsLoading] = useState(false);
  const { Dragger } = Upload;

  const handleImageChange = (info: UploadChangeParam) => {
    const file = info.file;
    if (file instanceof File) {
      if (!file.type || !file.type.startsWith("image/")) {
        message.error(t("Please select an image first"));
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagebase64(reader.result as string);
        // Clear matched image when a new image is uploaded
        setMatchedImage({} as ImageDataResponse);
      };
      reader.onerror = () => {
        message.error(t("Failed to upload image"));
      };
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    beforeUpload: () => false,
    onChange(info: UploadChangeParam) {
      handleImageChange(info);
    },
  };

  function extractBase64(imageData: string) {
    const regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    return imageData.replace(regex, "");
  }

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://abao77-image-retrieval-full.hf.space/search-image/",
        // "http://localhost:8000/search-image/",
        {
          base64_image: extractBase64(imagebase64),
        }
      );

      if (response.data) {
        setMatchedImage({
          image_base64: `data:image/jpeg;base64,${response.data.image_base64}`,
          image_name: response.data.image_name,
          similarity_score: response.data.similarity_score,
        });
        message.success(t("Image uploaded successfully"));
      }
    } catch (error) {
      console.error(error);
      message.error(t("Failed to upload image"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="image-retrieval-container"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      <Row justify="center" style={{ marginBottom: "30px" }}>
        <Col span={20}>
          <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
            {t("Visual Discovery")}
          </Title>
          <Paragraph style={{ textAlign: "center", fontSize: "16px" }}>
            {t("Upload an image to find similar destinations in Vietnam")}
          </Paragraph>
        </Col>
      </Row>

      <Dragger
        {...props}
        style={{
          marginBottom: "30px",
          background: "linear-gradient(to right, #f0f9ff, #e6f7ff)",
          borderRadius: "12px",
          padding: "20px",
        }}
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon" style={{ color: "#1890ff" }}>
          <InboxOutlined style={{ fontSize: "48px" }} />
        </p>
        <p
          className="ant-upload-text"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {t("Select Image")}
        </p>
        <p className="ant-upload-hint" style={{ fontSize: "14px" }}>
          {t("Upload an image to find similar destinations in Vietnam")}
        </p>
      </Dragger>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginBottom: "30px",
        }}
      >
        {imagebase64 && (
          <Card
            hoverable
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ height: "400px", overflow: "hidden" }}>
              <Image
                src={imagebase64}
                alt="Uploaded"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Title level={4} style={{ color: "#333" }}>
                {t("Your Photo")}
              </Title>
            </div>
          </Card>
        )}

        {matchedImage?.image_base64 && (
          <Card
            hoverable
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ height: "400px", overflow: "hidden" }}>
              <Image
                src={matchedImage.image_base64}
                alt="Similar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Title level={4} style={{ color: "#1890ff" }}>
                {matchedImage.image_name}
              </Title>
              <p
                style={{
                  color: "#52c41a",
                  marginTop: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#f6ffed",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  display: "inline-block",
                }}
              >
                {t("Match Score")}:{" "}
                {Math.round(matchedImage.similarity_score * 100)}%
              </p>
            </div>
          </Card>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          type="primary"
          onClick={handleSearch}
          loading={isLoading}
          disabled={!imagebase64}
          size="large"
          icon={<SearchOutlined />}
          style={{
            height: "50px",
            fontSize: "16px",
            borderRadius: "25px",
            padding: "0 30px",
            background: "linear-gradient(to right, #1890ff, #096dd9)",
            border: "none",
          }}
        >
          {t("Search")}
        </Button>
      </div>
    </div>
  );
};

export default ImageRetrieval;
