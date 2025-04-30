import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Divider } from "antd";
import { GoogleLogin } from "@react-oauth/google";

type Props = {
  isSignup?: boolean;
  onSubmit: (values: any) => void;
  onSuccessGoogleLogin: (values: any) => void;
};

const FormComp: React.FC<Props> = ({
  isSignup = false,
  onSubmit,
  onSuccessGoogleLogin,
}) => {
  const onFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      name={isSignup ? "signup" : "signin"}
      initialValues={{ remember: true }}
      style={{ width: 360, height: 300 }}
      onFinish={onFinish}
    >
      {isSignup && (
        <Form.Item
          name="fullname"
          rules={[{ required: true, message: "Please input your Full name!" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Full Name"
          />
        </Form.Item>
      )}
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          size="large"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {!isSignup && (
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>
      )}

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
      </Form.Item>

      <Divider plain>or</Divider>

      <GoogleLogin
        onSuccess={onSuccessGoogleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
        // text="signin"
        theme="filled_blue"
        size="medium"
      />
    </Form>
  );
};

export default FormComp;
