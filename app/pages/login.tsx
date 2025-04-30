import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import FormComp from "~/components/form";
import { Flex, type TabsProps, Tabs, Alert, notification, Button } from "antd";

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
  padding: "1rem",
};

export default function Login() {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    pauseOnHover: boolean,
    message: string,
    description?: string
  ) => {
    api.open({
      message,
      description,
      showProgress: true,
      pauseOnHover,
    });
  };

  const onSuccessGoogleLogin = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(decoded));
    navigate("/");
  };

  const handleSignin = (values: any) => {
    if (
      values.email === "admin@jongkong.com" &&
      values.password === "password"
    ) {
      openNotification(true, "Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      openNotification(true, "Invalid Crendetials");
    }
  };

  const handleSignup = (values: any) => {
    if (
      values.email === "admin@jongkong.com" &&
      values.password === "password"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      openNotification(true, "Invalid Crendetials");
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Sign in",
      children: (
        <FormComp
          onSubmit={handleSignin}
          onSuccessGoogleLogin={onSuccessGoogleLogin}
        />
      ),
    },
    {
      key: "2",
      label: "Sign up",
      children: (
        <FormComp
          onSubmit={handleSignup}
          isSignup
          onSuccessGoogleLogin={onSuccessGoogleLogin}
        />
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Flex style={boxStyle} vertical justify={"center"} align={"center"}>
        <h1>Jongkong</h1>

        <Tabs defaultActiveKey="1" centered items={items} />
      </Flex>
    </>
  );
}
