import "./index.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, message, Modal } from "antd";
import { RegisterErrorCode, login, register, sendCheckCode } from "../../net";
import { closeDialog } from "../../view/dialogs/dialog";

export function Login(visible: boolean) {
  const closePanel = useCallback(() => {
    closeDialog("login");
  }, []);

  return (
    <Modal
      open={visible}
      maskClosable={true}
      onCancel={closePanel}
      footer={null}
      width={400}
      className="loginDialog"
      zIndex={1000}
    >
      <LoginPanel
        onSuccess={() => {
          closePanel();
          window.location.reload();
        }}
      ></LoginPanel>
    </Modal>
  );
}

const RegisterErrorMsgMap: Record<RegisterErrorCode, string> = {
  [RegisterErrorCode.Success]: "注册成功",
  [RegisterErrorCode.AccountExist]: "账号已存在",
  [RegisterErrorCode.CheckCodeError]: "验证码错误",
  [RegisterErrorCode.InvitationCodeInvalid]: "邀请码无效",
  [RegisterErrorCode.InvitationCodeUsed]: "邀请码已经被使用",
  [RegisterErrorCode.Other]: "系统正忙",
};

interface LoginPanelParams {
  onSuccess: () => void;
}

function LoginPanel(params: LoginPanelParams) {
  const [model, setModel] = useState<"login" | "register">("login");
  const { onSuccess } = params;

  const loginAccount = useRef<InputRef | null>(null);
  const loginPwd = useRef<InputRef | null>(null);

  useEffect(() => {
    if (loginAccount.current) {
      loginAccount.current.focus();
    }
  }, [loginAccount.current]); // todo 改为 mount

  async function execLogin() {
    let account = loginAccount?.current?.input?.value;
    let pwd = loginPwd?.current?.input?.value;

    if (!account || !pwd) {
      message.error("请输入完整");
      return;
    }

    let res = await login(account, pwd);
    if (res) {
      message.success("登录成功");
      onSuccess();
    } else {
      message.error("登录失败");
    }
  }

  const [sendCheckCodeDisable, setDisable] = useState<boolean>(false);
  const registerAccount = useRef<InputRef | null>(null);
  const registerPwd = useRef<InputRef | null>(null);
  const registerPwd2 = useRef<InputRef | null>(null);
  const registerCheckCode = useRef<InputRef | null>(null);
  const registerInvitationCode = useRef<InputRef | null>(null);

  async function execSendCheckCode() {
    setDisable(true);
    let account = registerAccount?.current?.input?.value;
    if (!account) {
      message.error("请先输入邮箱");
      return;
    }
    let res = await sendCheckCode(account);
    if (res) {
      message.success("发送成功");
    } else {
      message.error(`服务器正忙`);
    }
    setTimeout(() => {
      setDisable(false);
    }, 60000);
  }

  async function execRegister() {
    let account = registerAccount?.current?.input?.value;
    let pwd = registerPwd?.current?.input?.value;
    let pwd2 = registerPwd2?.current?.input?.value;
    let checkCode = registerCheckCode?.current?.input?.value;
    let invitationCode = registerInvitationCode?.current?.input?.value;

    if (!account || !pwd || !pwd2 || !checkCode || !invitationCode) {
      message.error("请输入完整");
      return;
    }

    if (pwd !== pwd2) {
      message.error("两次输入的密码不一致");
      return;
    }

    let res = await register(account, pwd, checkCode, invitationCode);

    if (res.flag) {
      message.success("注册成功");
      setModel("login");
    } else {
      message.error(`注册失败，${RegisterErrorMsgMap[res.code]}`);
    }
  }

  return (
    <div className="loginPanel">
      {model === "login" && (
        <div className="login">
          <div className="title">登录</div>
          <div className="account">
            <div className="left">邮箱</div>
            <div className="right">
              <Input ref={loginAccount}></Input>
            </div>
          </div>
          <div className="pwd">
            <div className="left">密码</div>
            <div className="right">
              <Input.Password
                ref={loginPwd}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    execLogin();
                  }
                }}
              ></Input.Password>
            </div>
          </div>
          <div className="submit">
            <Button type="primary" style={{ height: "40px" }} onClick={execLogin}>
              登录
            </Button>
          </div>
          <div className="footer">
            <div className="right">
              <Button
                type="text"
                onClick={() => {
                  setModel("register");
                }}
              >
                新用户注册
              </Button>
            </div>
          </div>
        </div>
      )}
      {model === "register" && (
        <div className="register">
          <div className="title">注册</div>
          <div className="account">
            <div className="left">邮箱</div>
            <div className="right">
              <Input ref={registerAccount}></Input>
            </div>
          </div>
          <div className="pwd">
            <div className="left">密码</div>
            <div className="right">
              <Input.Password ref={registerPwd}></Input.Password>
            </div>
          </div>
          <div className="pwd2">
            <div className="left">确认密码</div>
            <div className="right">
              <Input.Password ref={registerPwd2}></Input.Password>
            </div>
          </div>
          <div className="checkCode">
            <div className="left">验证码</div>
            <div className="right">
              <Input ref={registerCheckCode}></Input>
              <Button className="sendCheckCode" onClick={execSendCheckCode} disabled={sendCheckCodeDisable}>
                发送验证码
              </Button>
            </div>
          </div>
          <div className="invitationCode">
            <div className="left">邀请码</div>
            <div className="right">
              <Input ref={registerInvitationCode}></Input>
            </div>
          </div>
          <div className="submit">
            <Button type="primary" style={{ height: "40px" }} onClick={execRegister}>
              注册
            </Button>
          </div>
          <div className="footer">
            <div className="right">
              <Button
                type="text"
                onClick={() => {
                  setModel("login");
                }}
              >
                已有账号，去登录
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
