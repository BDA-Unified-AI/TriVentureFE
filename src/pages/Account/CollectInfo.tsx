import React, { useState } from "react";
import { Modal, Tabs, Form, Input, Select, Radio, Button, message } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;

const UserInfoModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((_) => {
        message.success("Information submitted successfully!");
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.error("Validation failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Information Modal
      </Button>
      <Modal
        title="Thu thập thông tin cá nhân để cá nhân hóa trải nghiệm của bạn"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          name="user_info_modal_form"
          initialValues={{
            occupation: "IT",
            income: "0-3tr",
          }}
        >
          <Tabs defaultActiveKey="1">
            {/* Occupation Tab */}
            <TabPane tab="Nghề nghiệp" key="1">
              <Form.Item
                name="occupation"
                label="Nghề nghiệp"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn nghề nghiệp của bạn",
                  },
                ]}
              >
                <Select placeholder="Chọn nghề nghiệp">
                  <Option value="business">Kinh doanh (Business)</Option>
                  <Option value="it">IT</Option>
                  <Option value="teacher">Giáo viên (Teacher)</Option>
                  <Option value="doctor">Bác sĩ (Doctor)</Option>
                  <Option value="other">Khác (Other)</Option>
                </Select>
              </Form.Item>
            </TabPane>

            {/* Income Tab */}
            <TabPane tab="Thu Nnhaapj" key="2">
              <Form.Item
                name="income"
                label="Mức thu nhập"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn mức thu nhập của bạn!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="0-3tr">0-3 triệu</Radio>
                  <Radio value="3-10tr">3-10 triệu</Radio>
                  <Radio value="10-30tr">10-30 triệu</Radio>
                  <Radio value=">30tr">Trên 30 triệu</Radio>
                </Radio.Group>
              </Form.Item>
            </TabPane>

            {/* Updated Hobbies Tab with Select */}
            <TabPane tab="Sở thích du lịch" key="3">
              <Form.Item
                name="hobbies"
                label="Sở thích"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one hobby!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Chọn sở thích du lịch của bạn"
                >
                  <Option value="mountain">Mountain</Option>
                  <Option value="beach">Beach</Option>
                  <Option value="healing">Healing</Option>
                  <Option value="chilling">Chilling</Option>
                  <Option value="natural">Natural</Option>
                  <Option value="traditional">Traditional</Option>
                  <Option value="quiet">Quiet</Option>
                  <Option value="bustle">Bustle</Option>
                  <Option value="peaceful">Peaceful</Option>
                  <Option value="cozy">Cozy</Option>
                  <Option value="camping">Camping</Option>
                  <Option value="family">Family</Option>
                </Select>
              </Form.Item>
            </TabPane>

            {/* Additional Tab - you can add more */}
            <TabPane tab="Các thông tin khác" key="4">
              <Form.Item
                name="otherInfo"
                label="Thông tin khác:"
                rules={[{ required: false }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập các thông tin về sở thích, xu hướng du lịch của bạn để chúng tôi tối ưu trải nghiệm cá nhân của bạn."
                />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </>
  );
};

export default UserInfoModal;
