import React, { useState } from "react";
import {
  Button,
  notification,
  Spin,
  Input,
  Empty,
  Card,
  Typography,
  List,
  Avatar,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  DestinationItem,
  DestinationSearchResult,
  destinationSuggestions,
} from "../../apis/dest";
import useAppState from "../Context/state";

const { Title, Text } = Typography;

interface TextRetrievalProps {
  includeDestinations: DestinationItem[];
  setIncludeDestinations: (value: DestinationItem[]) => void;
}

const TextRetrieval: React.FC<TextRetrievalProps> = ({
  includeDestinations,
  setIncludeDestinations,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DestinationSearchResult[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useAppState((state) => state.userInfo);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if search query is empty
    if (searchQuery.trim() === "") {
      notification.warning({
        message: t("Oops!"),
        description: t("Please enter a destination to start your journey."),
        placement: "top",
      });
      return;
    }

    setIsLoading(true);
    if (isLoading) return;
    try {
      const response = await destinationSuggestions(
        searchQuery,
        userInfo?.id || null,
        5
      );
      setSearchResults(response);

      if (response.length === 0) {
        notification.info({
          message: t("No destinations found"),
          description: t("Try another search term or explore our categories."),
          placement: "top",
        });
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        notification.warning({
          message: t("Invalid Search"),
          description: t("Please provide a travel-related search query."),
          placement: "top",
        });
      } else {
        notification.error({
          message: t("Something went wrong"),
          description: t("We couldn't complete your search. Please try again."),
          placement: "top",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear results if query is empty
    if (query.trim() === "") {
      setSearchResults([]);
    }
  };

  const handleResultClick = () => {
    setSearchQuery("");
  };

  const handleAddDestination = (destination: string) => {
    const isAlreadyAdded = includeDestinations.some(
      (dest) => dest.name === destination
    );
    if (isAlreadyAdded) {
      notification.warning({
        message: t("Destination Already Added"),
        description: `${destination} ${t("is already in your list.")}`,
        placement: "top",
      });
    } else {
      setIncludeDestinations([
        ...includeDestinations,
        { id: "", name: destination, description: "", image: "" },
      ]);
      notification.success({
        message: t("Destination Added"),
        description: `${destination} ${t("has been added to your list.")}`,
        placement: "top",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg"
    >
      <Card
        className="shadow-md hover:shadow-lg transition-shadow duration-300"
        bordered={false}
        style={{ borderRadius: "12px" }}
      >
        <Title level={4} className="text-center mb-4">
          {t("Find Your Dream Destinations")}
        </Title>

        <form onSubmit={handleSearch} className="mb-4">
          <Input.Search
            placeholder={t("Search for places...")}
            value={searchQuery}
            onChange={handleInputChange}
            onSearch={() =>
              handleSearch({ preventDefault: () => {} } as React.FormEvent)
            }
            enterButton={
              <Button
                type="primary"
                icon={<SearchOutlined />}
                loading={isLoading}
              >
                {t("Search")}
              </Button>
            }
            size="large"
            className="rounded-lg"
          />
        </form>

        {isLoading && (
          <div className="flex justify-center my-8">
            <Spin size="large" tip={t("Searching for amazing places...")} />
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Title level={5} className="mb-3">
              {t("Search Results")}:
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={searchResults}
              renderItem={(result, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <List.Item
                    className="hover:bg-blue-50 rounded-lg p-2 transition-colors duration-200"
                    onClick={handleResultClick}
                    actions={[
                      <Button
                        type="primary"
                        shape="round"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddDestination(result.name)}
                        size="middle"
                      >
                        {t("Add")}
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={result.image || "https://via.placeholder.com/40"}
                        />
                      }
                      title={<Text strong>{result.name}</Text>}
                      description={
                        result.description ||
                        t("Discover this amazing destination")
                      }
                    />
                  </List.Item>
                </motion.div>
              )}
            />
          </motion.div>
        )}

        {!isLoading && searchQuery && searchResults.length === 0 && (
          <Empty
            description={t(
              "No destinations found. Try a different search term."
            )}
            className="my-8"
          />
        )}
      </Card>
    </motion.div>
  );
};

export default TextRetrieval;
