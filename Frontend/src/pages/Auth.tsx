import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, LogIn, UserPlus, Mail, Lock, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  // State để quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state (nhóm thành object)
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Hàm xử lý đăng nhập
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset lỗi trước khi gửi request
    try {
      await login(loginEmail, loginPassword);
      navigate("/"); // Chuyển hướng đến trang chủ
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Đăng nhập thất bại, vui lòng thử lại.");
      }
    }
  };

  // Hàm xử lý đăng ký
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset lỗi trước khi gửi request

    // Validation cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(registerData.email)) {
      setError("Email không hợp lệ");
      return;
    }
    if (!phoneRegex.test(registerData.phone)) {
      setError("Số điện thoại phải có 10 chữ số");
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      await register({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
      });
      setActiveTab("login"); // Chuyển về tab đăng nhập
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      }); // Reset form
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Đăng ký thất bại, vui lòng thử lại.");
      }
    }
  };

  // Hàm xử lý thay đổi dữ liệu form đăng ký
  const handleRegisterChange = (field: keyof typeof registerData, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-hospital-50 to-white flex flex-col items-center justify-center p-4">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-hospital-600 transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Trở về trang chủ
      </Link>

      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-hospital-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <h1 className="text-2xl font-display font-semibold">HealthCare</h1>
          </Link>
        </div>

        <Card className="w-full shadow-soft border-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Đăng Nhập</TabsTrigger>
              <TabsTrigger value="register">Đăng Ký</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Chào mừng trở lại</CardTitle>
                  <CardDescription>
                    Đăng nhập để đặt lịch khám và theo dõi hồ sơ sức khỏe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        className="pl-10"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        autoFocus // Thêm autofocus
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mật khẩu</Label>
                      <Link to="/forgot-password" className="text-sm text-hospital-600 hover:underline">
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-hospital-500 hover:bg-hospital-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang xử lý...
                      </div>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Đăng nhập
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-center text-gray-500">
                    Chưa có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("register")}
                      className="text-hospital-600 hover:underline"
                    >
                      Đăng ký ngay
                    </button>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Tạo tài khoản mới</CardTitle>
                  <CardDescription>
                    Đăng ký để trải nghiệm dịch vụ chăm sóc sức khỏe chất lượng cao
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Họ</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="firstName"
                          placeholder="Nguyễn"
                          className="pl-10"
                          required
                          value={registerData.firstName}
                          onChange={(e) => handleRegisterChange("firstName", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Tên</Label>
                      <Input
                        id="lastName"
                        placeholder="Văn A"
                        required
                        value={registerData.lastName}
                        onChange={(e) => handleRegisterChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="example@email.com"
                        className="pl-10"
                        required
                        value={registerData.email}
                        onChange={(e) => handleRegisterChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0901234567"
                        className="pl-10"
                        required
                        value={registerData.phone}
                        onChange={(e) => handleRegisterChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="registerPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                        value={registerData.password}
                        onChange={(e) => handleRegisterChange("password", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={registerData.confirmPassword}
                      onChange={(e) => handleRegisterChange("confirmPassword", e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-hospital-500 hover:bg-hospital-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang xử lý...
                      </div>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Đăng ký
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-center text-gray-500">
                    Đã có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("login")}
                      className="text-hospital-600 hover:underline"
                    >
                      Đăng nhập
                    </button>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;