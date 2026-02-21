import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  message,
  Card,
  Row,
  Col,
  Typography,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;
const { Title } = Typography;

interface FormValues {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  dateTime: dayjs.Dayjs;
}

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Auto select current date & time
  useEffect(() => {
    form.setFieldsValue({
      dateTime: dayjs(),
    });
  }, [form]);

  const onFinish = async (values: FormValues) => {
  
    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/submit`, {
        ...values,
        dateTime: values.dateTime.toISOString(),
      });

      message.success("Form submitted successfully ✅");

      form.resetFields();
      form.setFieldsValue({ dateTime: dayjs() });
    } catch {
      message.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "#f5f5f5",
      }}
    >
      <Col xs={24} sm={22} md={18} lg={12} xl={10}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
            Event Registration
          </Title>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              {/* Name */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input placeholder="Enter your name" size="large" />
                </Form.Item>
              </Col>

              {/* Email */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input placeholder="Enter your email" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* Phone */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Phone must be 10 digits",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter phone number"
                    maxLength={10}
                    size="large"
                  />
                </Form.Item>
              </Col>

              {/* Event Type */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Event Type"
                  name="eventType"
                  rules={[
                    { required: true, message: "Please select event type" },
                  ]}
                >
                  <Select placeholder="Select event" size="large">
                    <Option value="wedding">Wedding</Option>
                    <Option value="birthday">Birthday</Option>
                    <Option value="conference">Conference</Option>
                    <Option value="meeting">Meeting</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Date & Time */}
            <Form.Item
              label="Date & Time"
              name="dateTime"
              rules={[
                { required: true, message: "Please select date & time" },
              ]}
            >
              <DatePicker
                showTime
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>

            {/* Submit */}
            <Form.Item style={{ marginTop: 20 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                style={{
                  height: 48,
                  borderRadius: 8,
                  fontWeight: 500,
                }}
              >
                Submit Event
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default App;
