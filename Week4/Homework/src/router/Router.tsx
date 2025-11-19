import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { MyPage } from "../pages/mypage/MyPage";
import { InfoPage } from "../pages/mypage/InfoPage";
import { MemberSearchPage } from "../pages/mypage/MemberSearchPage";

function getLoginMemberId(): number | null {
  const raw = localStorage.getItem("userId");
  if (!raw) return null;
  const num = Number(raw);
  if (Number.isNaN(num)) return null;
  return num;
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const memberId = getLoginMemberId();
  if (!memberId) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/mypage"
        element={
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        }
      >
        <Route index element={<InfoPage />} />
        <Route path="members" element={<MemberSearchPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
