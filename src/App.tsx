import { useState, useEffect } from "react";

const formatDate = (d) => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}（${days[d.getDay()]}）`;
};

const formatTime = (d) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

export default function WorkLog() {
  const [screen, setScreen] = useState("home"); // home | form | preview
  const [now, setNow] = useState(new Date());
  const FIXED_TO = "Yasuhiro_Hirose@amat.com";
  const [form, setForm] = useState({ work: "", notes: "" });
  const [loggedAt, setLoggedAt] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleStart = () => {
    setLoggedAt(new Date());
    setScreen("form");
    setSent(false);
  };

  const handleSend = () => {
    const subject = encodeURIComponent(
      `【作業ログ】${formatDate(loggedAt)} ${formatTime(loggedAt)}`
    );
    const body = encodeURIComponent(
      `━━━━━━━━━━━━━━━━━━━━━\n作業ログ\n━━━━━━━━━━━━━━━━━━━━━\n\n📅 日時：${formatDate(loggedAt)} ${formatTime(loggedAt)}\n\n📋 作業内容：\n${form.work}\n\n📝 ノート：\n${form.notes || "（なし）"}\n\n━━━━━━━━━━━━━━━━━━━━━\n`
    );
    window.location.href = `mailto:${FIXED_TO}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setScreen("home"), 1500);
  };

  const styles = {
    root: {
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
      padding: "24px 16px",
    },
    phone: {
      width: "100%",
      maxWidth: 375,
      background: "#111118",
      borderRadius: 44,
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
      overflow: "hidden",
      minHeight: 700,
      display: "flex",
      flexDirection: "column",
    },
    statusBar: {
      padding: "14px 28px 8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "rgba(255,255,255,0.9)",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 0.2,
    },
    notch: {
      width: 120,
      height: 18,
      background: "#0a0a0f",
      borderRadius: 9,
    },
    content: {
      flex: 1,
      padding: "0 24px 40px",
      display: "flex",
      flexDirection: "column",
    },

    // HOME
    homeWrap: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    clockDate: {
      color: "rgba(255,255,255,0.35)",
      fontSize: 14,
      letterSpacing: 2,
      fontWeight: 400,
      textTransform: "uppercase",
      marginBottom: 4,
    },
    clockTime: {
      color: "#ffffff",
      fontSize: 72,
      fontWeight: 200,
      letterSpacing: -3,
      lineHeight: 1,
      marginBottom: 48,
      fontVariantNumeric: "tabular-nums",
    },
    iconBtn: {
      width: 88,
      height: 88,
      borderRadius: 24,
      background: "linear-gradient(145deg, #1a6bff 0%, #0040cc 100%)",
      border: "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      boxShadow: "0 8px 32px rgba(26,107,255,0.45), 0 0 0 1px rgba(255,255,255,0.1) inset",
      transition: "transform 0.12s ease, box-shadow 0.12s ease",
    },
    iconLabel: {
      color: "rgba(255,255,255,0.6)",
      fontSize: 12,
      letterSpacing: 0.5,
      marginTop: 12,
    },

    // FORM
    formHeader: {
      paddingTop: 20,
      paddingBottom: 24,
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    backBtn: {
      background: "none",
      border: "none",
      color: "rgba(255,255,255,0.5)",
      fontSize: 14,
      cursor: "pointer",
      padding: "4px 0",
      letterSpacing: 0.3,
    },
    formTitle: {
      color: "#ffffff",
      fontSize: 17,
      fontWeight: 600,
      flex: 1,
      textAlign: "center",
      marginRight: 32,
    },
    timestampBadge: {
      background: "rgba(26,107,255,0.15)",
      border: "1px solid rgba(26,107,255,0.3)",
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 20,
    },
    timestampLabel: {
      color: "#1a6bff",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      marginBottom: 4,
    },
    timestampVal: {
      color: "#ffffff",
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: 0.3,
    },
    fieldGroup: {
      marginBottom: 16,
    },
    fieldLabel: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      marginBottom: 8,
    },
    input: {
      width: "100%",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      color: "#ffffff",
      fontSize: 15,
      padding: "12px 14px",
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "inherit",
      resize: "none",
      lineHeight: 1.5,
      transition: "border-color 0.2s",
    },
    sendBtn: {
      marginTop: "auto",
      paddingTop: 24,
      width: "100%",
      height: 54,
      borderRadius: 14,
      background: sent
        ? "linear-gradient(135deg, #00c853, #00961f)"
        : "linear-gradient(135deg, #1a6bff, #0040cc)",
      border: "none",
      color: "#ffffff",
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: 0.5,
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
  };

  return (
    <div style={styles.root}>
      <div style={styles.phone}>
        {/* Status Bar */}
        <div style={styles.statusBar}>
          <span>{formatTime(now)}</span>
          <div style={styles.notch} />
          <span>●●●</span>
        </div>

        <div style={styles.content}>
          {/* ── HOME ── */}
          {screen === "home" && (
            <div style={styles.homeWrap}>
              <div style={styles.clockDate}>{formatDate(now)}</div>
              <div style={styles.clockTime}>{formatTime(now)}</div>

              <button
                style={styles.iconBtn}
                onClick={handleStart}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.93)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.93)")}
                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="6" y="5" width="24" height="26" rx="3" stroke="white" strokeWidth="2" fill="none"/>
                  <line x1="11" y1="12" x2="25" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="11" y1="17" x2="25" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="11" y1="22" x2="19" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="27" cy="27" r="5" fill="#1a6bff" stroke="#111118" strokeWidth="1.5"/>
                  <line x1="27" y1="25" x2="27" y2="27.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="27" cy="29" r="0.8" fill="white"/>
                </svg>
              </button>
              <div style={styles.iconLabel}>作業報告</div>
            </div>
          )}

          {/* ── FORM ── */}
          {screen === "form" && (
            <>
              <div style={styles.formHeader}>
                <button style={styles.backBtn} onClick={() => setScreen("home")}>
                  ← 戻る
                </button>
                <div style={styles.formTitle}>作業報告</div>
              </div>

              {/* Timestamp */}
              <div style={styles.timestampBadge}>
                <div style={styles.timestampLabel}>📅 記録時刻</div>
                <div style={styles.timestampVal}>
                  {loggedAt && `${formatDate(loggedAt)}　${formatTime(loggedAt)}`}
                </div>
              </div>

              {/* 送信先 */}
              <div style={styles.timestampBadge}>
                <div style={styles.timestampLabel}>✉ 送信先</div>
                <div style={styles.timestampVal}>Yasuhiro_Hiorse@amat.com</div>
              </div>

              {/* 作業内容 */}
              <div style={styles.fieldGroup}>
                <div style={styles.fieldLabel}>📋 作業内容</div>
                <textarea
                  rows={4}
                  placeholder="今日の作業内容を入力..."
                  value={form.work}
                  onChange={(e) => setForm({ ...form, work: e.target.value })}
                  style={styles.input}
                />
              </div>

              {/* ノート */}
              <div style={styles.fieldGroup}>
                <div style={styles.fieldLabel}>📝 ノート</div>
                <textarea
                  rows={3}
                  placeholder="メモや補足があれば..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  style={styles.input}
                />
              </div>

              {/* Send */}
              <button
                style={styles.sendBtn}
                disabled={!form.work.trim()}
                onClick={handleSend}
              >
                {sent ? "✓ メールアプリを起動中..." : "📤 メールで送信"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
