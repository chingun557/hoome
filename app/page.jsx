"use client";
import { useState, useEffect, useRef } from "react";





const NAV_LINKS = ["Танилцуулга", "Үнэ цэнэ", "Бизнес", "Бидний тухай"];

const PARTNERS = [
  { name: "Шинэ Яармаг", bg: "#162b16", accent: "#4ade80", icon: "🏗️" },
  { name: "Hunnu 2222", bg: "#1c1c1c", accent: "#d1d5db", icon: "🏛️" },
  { name: "Sky Tower", bg: "#f8fafc", accent: "#3b82f6", icon: "✦" },
  { name: "Академи Хотхон", bg: "#1a1a1a", accent: "#f59e0b", icon: "🎓" },
  { name: "VIP Residence+", bg: "#f0fdf4", accent: "#16a34a", icon: "🌿" },
  { name: "Artsat", bg: "#0f172a", accent: "#e2e8f0", icon: "💎" },
];

const FEATURES = [
  {
    title: "Сошиал & Чат",
    desc: "Амьдарч буй хотхондоо нэгдэж, хөршүүдээ даган (follow) сошиал болон чатын системээр нэгдэж, халуун дулаан харилцаа итгэлцлийг бий болгох боломжийг үүсгэнэ.",
    color: "#7c3aed", color2: "#a78bfa", icon: "💬",
    shapes: ["purple", "teal", "teal"],
  },
  {
    title: "Мэдэгдэл & Мэдээлэл",
    desc: "Хотхоны чухал мэдэгдэл, засвар үйлчилгээ, нийтлэг мэдээллийг цаг тухайд нь хүлээн авч, хамт олны амьдралд идэвхтэй оролцох боломжтой.",
    color: "#0891b2", color2: "#38bdf8", icon: "🔔",
    shapes: ["cyan", "purple", "purple"], reverse: true,
  },
  {
    title: "Онлайн Төлбөр",
    desc: "Нийтийн үйлчилгээний төлбөр, СӨХ-ын хураамж, паркингийн зардлыг апп дотроос хялбархан төлж, гүйлгээний түүхээ хянах боломжтой.",
    color: "#059669", color2: "#34d399", icon: "💳",
    shapes: ["green", "teal", "teal"],
  },
  {
    title: "Мобайл Паркинг",
    desc: "Хотхоны зогсоолыг ухаалгаар удирдах, зочин машины зөвшөөрөл олгох, паркингийн дүрмийн зөрчлийг мэдээлэх боломжтой.",
    color: "#d97706", color2: "#fbbf24", icon: "🚗",
    shapes: ["amber", "teal", "teal"], reverse: true,
  },
];

const PLANS = [
  {
    name: "Үндсэн", price: "Үнэгүй", sub: "хязгааргүй хугацаагаар",
    features: ["Сошиал & Чат", "Мэдэгдэл хүлээн авах", "Хотхоны мэдээлэл", "Үйл явдлын календар"],
    cta: "Татаж авах", highlight: false,
  },
  {
    name: "Хотхон", price: "₮49,900", sub: "сард / нэг хотхон",
    features: ["Бүх үндсэн боломжууд", "Онлайн төлбөр", "Мобайл паркинг", "СӨХ удирдлага", "Тайлан & Статистик"],
    cta: "Хамтрах", highlight: true,
  },
  {
    name: "Бизнес", price: "Тохиролцооны", sub: "үнийн санал авах",
    features: ["Бүх хотхоны боломжууд", "API интеграц", "Тусгай брэнд", "Дэмжлэгийн баг", "Олон хотхон"],
    cta: "Холбоо барих", highlight: false,
  },
];

const PLANS2 = [
  {
    name: "ХОТХОН",
    desc: "Хотхоны менежмент, төлбөр, оршин суугчдын бүх төрлийн харилцааг удирдах тусгай систем болон түүнийг иргэдэд хүргэх Hoome сошиал аппын нэгдсэн шийдэл.",
    features: [
      "Hoome апп хязгааргүй таталт",
      "СӨХ-ийн төлбөр бодолт",
      "Хэрэглэгчийн төлбөр төлөлт",
      "Автомат иБаримт гаргах, илгээх",
      "Тайлан",
      "Хотхоны булгэм үүсгэх, сошиал пост, чат",
      "Оршин суугчдын жагсаалт, мэдээлэл, автомат бүртгэл",
      "Зогсоол, агуулах удирдлага",
    ],
  },
  {
    name: "КОНТОР",
    desc: "Конторын төлбөр бодолт, үйлчилгээний захиалга авах гэх мэт бүх үйл ажиллагааг удирдах, системтэй. Түүнчлэн Хотхон болон оршин суугчдын Hoome сошиал аппытай нэгдсэн шийдэл.",
    features: [
      "Hoome апп хязгааргүй таталт",
      "Бүх хэрэглэгчийн жагсаалт",
      "Конторын төлбөр бодолт",
      "Хэрэглэгчийн төлбөр төлөлт",
      "Тоолуурын заалт",
      "Тайлан",
      "Тариф удирдлага тохиргоо",
      "Автомат иБаримт гаргах, илгээх",
    ],
  },
];

const colMap = {
  purple: ["#7c3aed", "#8b5cf6"],
  teal:   ["#0d9488", "#14b8a6"],
  cyan:   ["#0891b2", "#38bdf8"],
  green:  ["#059669", "#34d399"],
  amber:  ["#d97706", "#fbbf24"],
};

function IsoIcon({ color, color2, icon, shapes }) {
  return (
    <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto" }}>
      <div style={{
        position: "absolute", inset: -20, borderRadius: "50%",
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        width: 150, height: 44, borderRadius: 10,
        background: `linear-gradient(135deg, ${color}33, ${color}55)`,
        border: `1px solid ${color}44`,
        boxShadow: `0 8px 32px ${color}33`,
      }} />
      {shapes.slice(1).map((s, i) => (
        <div key={i} style={{
          position: "absolute", width: 34, height: 34,
          bottom: 60, left: i === 0 ? 14 : undefined, right: i === 1 ? 14 : undefined,
          background: `linear-gradient(135deg, ${colMap[s][0]}, ${colMap[s][1]})`,
          borderRadius: 8,
          boxShadow: `0 6px 20px ${colMap[s][0]}66`,
        }} />
      ))}
      <div style={{
        position: "absolute", width: 58, height: 58,
        bottom: 56, left: "50%", transform: "translateX(-50%)",
        background: `linear-gradient(135deg, ${color}, ${color2})`,
        borderRadius: 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26,
        boxShadow: `0 10px 30px ${color}66`,
      }}>{icon}</div>
    </div>
  );
}

export default function HoomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visSet, setVisSet] = useState(new Set());
  const refs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisSet((p) => new Set([...p, e.target.dataset.sid]));
      }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const reg = (id) => (el) => { refs.current[id] = el; };
  const vis = (id) => visSet.has(id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        :root {
          --teal:#14b8a6; --teal-dk:#0d9488; --teal-dim:rgba(20,184,166,0.14);
          --bg:#0b0d0e; --bg2:#111416; --text:#f1f5f9;
          --muted:rgba(241,245,249,0.52); --border:rgba(255,255,255,0.07);
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;overflow-x:hidden;line-height:1.6}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--teal-dk);border-radius:3px}
        body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.022;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

        /* blobs */
        .blob{position:fixed;border-radius:50%;filter:blur(130px);pointer-events:none;z-index:0}
        .b1{width:620px;height:620px;top:-200px;left:-150px;background:radial-gradient(circle,rgba(20,184,166,.1) 0%,transparent 70%)}
        .b2{width:420px;height:420px;top:40%;right:-100px;background:radial-gradient(circle,rgba(124,58,237,.07) 0%,transparent 70%)}
        .b3{width:320px;height:320px;bottom:8%;left:32%;background:radial-gradient(circle,rgba(20,184,166,.06) 0%,transparent 70%)}

        /* nav */
        .nav{position:fixed;top:0;left:0;right:0;z-index:200;height:66px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;transition:all .35s}
        .nav.scrolled{background:rgba(11,13,14,.9);backdrop-filter:blur(20px) saturate(1.4);border-bottom:1px solid var(--border)}
        .logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--text)}
        .logo-mark{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--teal),var(--teal-dk));display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 20px rgba(20,184,166,.4)}
        .logo-name{font-family:'Montserrat',sans-serif;font-weight:800;font-size:22px;letter-spacing:-.5px}
        .logo-name b{color:var(--teal);font-weight:800}
        .nav-links{display:flex;gap:36px;list-style:none}
        .nav-links a{color:var(--muted);text-decoration:none;font-size:15px;font-weight:500;transition:color .2s;position:relative}
        .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1.5px;background:var(--teal);border-radius:1px;transform:scaleX(0);transition:transform .2s}
        .nav-links a:hover{color:var(--text)}
        .nav-links a:hover::after{transform:scaleX(1)}
        .nav-right{display:flex;align-items:center;gap:12px}
        .btn-ghost{padding:8px 18px;border-radius:8px;border:1.5px solid var(--teal);color:var(--teal);background:transparent;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;letter-spacing:.5px}
        .btn-ghost:hover{background:var(--teal-dim)}
        .btn-teal{padding:8px 20px;border-radius:8px;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-dk));color:#fff;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;box-shadow:0 0 20px rgba(20,184,166,.35)}
        .btn-teal:hover{transform:translateY(-1px);box-shadow:0 4px 24px rgba(20,184,166,.45)}
        .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}
        .hamburger span{display:block;width:22px;height:2px;background:var(--text);border-radius:2px;transition:all .3s}
        .mob-menu{position:fixed;top:66px;left:0;right:0;background:rgba(11,13,14,.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:24px 32px 32px;display:flex;flex-direction:column;gap:20px;z-index:199;transform:translateY(-110%);transition:transform .35s cubic-bezier(.4,0,.2,1)}
        .mob-menu.open{transform:translateY(0)}
        .mob-menu a{color:var(--muted);text-decoration:none;font-size:18px;font-weight:600;padding:8px 0;border-bottom:1px solid var(--border);transition:color .2s}
        .mob-menu a:hover{color:var(--teal)}

        /* hero */
        .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:64px;max-width:1240px;margin:0 auto;padding:120px 52px 80px;position:relative;z-index:1}
        .hero-left{display:flex;flex-direction:column;gap:30px}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:var(--teal-dim);border:1px solid rgba(20,184,166,.25);font-size:13px;font-weight:600;color:var(--teal);width:fit-content;animation:fadeUp .6s ease forwards;opacity:0}
        .eyebrow span{width:6px;height:6px;border-radius:50%;background:var(--teal);display:block;animation:pulse 2s infinite}
        .hero-h1{font-family:'Montserrat',sans-serif;font-size:clamp(44px,5.5vw,78px);font-weight:900;line-height:1.02;letter-spacing:-2.5px;color:#fff;animation:fadeUp .65s ease forwards .1s;opacity:0}
        .hero-p{font-size:16px;line-height:1.75;color:var(--muted);max-width:420px;animation:fadeUp .65s ease forwards .22s;opacity:0}
        .hero-btns{display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp .65s ease forwards .34s;opacity:0}
        .dl-btn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border-radius:12px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);color:var(--text);font-size:14px;font-weight:500;text-decoration:none;cursor:pointer;transition:all .25s;backdrop-filter:blur(8px);font-family:'DM Sans',sans-serif}
        .dl-btn:hover{background:rgba(255,255,255,.09);border-color:rgba(20,184,166,.35);transform:translateY(-2px)}
        .hero-right{animation:fadeUp .65s ease forwards .28s;opacity:0}
        .vid-card{border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.08);box-shadow:0 0 0 1px rgba(20,184,166,.12),0 40px 80px rgba(0,0,0,.65),0 0 60px rgba(20,184,166,.07);aspect-ratio:16/9;background:#111}
        .vid-card iframe{width:100%;height:100%;border:none;display:block}

        /* partners */
        .partners{max-width:1240px;margin:0 auto;padding:0 52px 80px;position:relative;z-index:1}
        .p-label{font-family:'Montserrat',sans-serif;font-weight:700;font-size:13px;color:var(--muted);margin-bottom:22px;text-transform:uppercase;letter-spacing:1.8px}
        .p-row{display:flex;gap:14px;flex-wrap:wrap}
        .p-tile{width:156px;height:94px;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;border:1px solid var(--border);cursor:pointer;position:relative;overflow:hidden;transition:all .28s cubic-bezier(.4,0,.2,1)}
        .p-tile:hover{transform:translateY(-5px) scale(1.02);border-color:rgba(20,184,166,.3);box-shadow:0 16px 40px rgba(0,0,0,.5),0 0 24px rgba(20,184,166,.12)}
        .p-icon{font-size:24px}
        .p-name{font-size:11px;font-weight:600;text-align:center;padding:0 8px}

        /* divider */
        .hr{height:1px;max-width:1240px;margin:0 auto;background:linear-gradient(90deg,transparent,rgba(20,184,166,.25),transparent);position:relative;z-index:1}

        /* value */
        .value{max-width:820px;margin:0 auto;padding:100px 52px 56px;text-align:center;position:relative;z-index:1}
        .badge{display:inline-block;padding:6px 18px;border-radius:999px;background:linear-gradient(135deg,var(--teal-dk),var(--teal));font-size:13px;font-weight:700;color:#fff;margin-bottom:28px;letter-spacing:.4px}
        .value-h2{font-family:'Montserrat',sans-serif;font-size:clamp(34px,4.5vw,62px);font-weight:900;line-height:1.06;letter-spacing:-2px;color:#fff;margin-bottom:28px}
        .value-p{font-size:17px;line-height:1.8;color:var(--muted)}
        .hl{color:var(--teal);font-weight:600}

        /* features */
        .feats{max-width:1240px;margin:0 auto;padding:40px 52px 80px;position:relative;z-index:1}
        .feat-row{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:80px;padding:72px 0;border-bottom:1px solid var(--border)}
        .feat-row:last-child{border-bottom:none}
        .feat-row.rev .f-vis{order:2}
        .feat-row.rev .f-body{order:1}
        .f-vis{display:flex;align-items:center;justify-content:center;min-height:220px}
        .f-body{display:flex;flex-direction:column;gap:18px}
        .f-h3{font-family:'Montserrat',sans-serif;font-size:clamp(26px,3vw,42px);font-weight:800;letter-spacing:-1px;color:#fff;line-height:1.1}
        .f-p{font-size:16px;line-height:1.75;color:var(--muted);max-width:440px}

        /* pricing */
        .pricing{max-width:1240px;margin:0 auto;padding:80px 52px 100px;position:relative;z-index:1}
        .sec-head{text-align:center;margin-bottom:60px}
        .sec-head h2{font-family:'Montserrat',sans-serif;font-size:clamp(32px,4vw,52px);font-weight:900;letter-spacing:-1.5px;color:#fff;margin-bottom:14px;margin-top:16px}
        .sec-head p{font-size:16px;color:var(--muted)}
        .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .plan{border-radius:20px;padding:36px 32px;background:var(--bg2);border:1px solid var(--border);display:flex;flex-direction:column;gap:24px;position:relative;overflow:hidden;transition:transform .28s,box-shadow .28s}
        .plan:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,.4)}
        .plan.pop{border-color:rgba(20,184,166,.4);background:linear-gradient(160deg,#0f1f1e,#111416);box-shadow:0 0 0 1px rgba(20,184,166,.2),0 20px 60px rgba(20,184,166,.08)}
        .pop-tag{position:absolute;top:20px;right:20px;padding:4px 12px;border-radius:999px;background:linear-gradient(135deg,var(--teal),var(--teal-dk));font-size:11px;font-weight:700;color:#fff;letter-spacing:.5px}
        .plan-nm{font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;color:var(--teal);text-transform:uppercase;letter-spacing:1.5px}
        .plan-pr{font-family:'Montserrat',sans-serif;font-size:36px;font-weight:900;color:#fff;letter-spacing:-1px;margin-top:12px}
        .plan-sb{font-size:13px;color:var(--muted);margin-top:2px}
        .plan-fts{display:flex;flex-direction:column;gap:12px;flex:1}
        .pf{display:flex;align-items:center;gap:10px;font-size:14px;color:rgba(241,245,249,.75)}
        .pf-dot{width:18px;height:18px;border-radius:50%;flex-shrink:0;background:var(--teal-dim);border:1px solid rgba(20,184,166,.3);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--teal)}
        .p-cta{padding:13px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;border:none;transition:all .22s;width:100%}
        .p-cta.def{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text)}
        .p-cta.def:hover{background:rgba(255,255,255,.1)}
        .p-cta.pri{background:linear-gradient(135deg,var(--teal),var(--teal-dk));color:#fff;box-shadow:0 0 24px rgba(20,184,166,.35)}
        .p-cta.pri:hover{box-shadow:0 6px 30px rgba(20,184,166,.5);transform:translateY(-1px)}

        /* pricing2 */
        .plans2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .plan2{border-radius:16px;padding:40px 36px;background:linear-gradient(160deg,#0d2420,#0a1e1b);border:1px solid rgba(20,184,166,.18);display:flex;flex-direction:column;gap:32px}
        .plan2-top{display:flex;flex-direction:column;gap:18px}
        .plan2-name{font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:#fff;letter-spacing:1.5px;text-transform:uppercase}
        .plan2-desc{font-size:14px;line-height:1.75;color:rgba(241,245,249,.6);max-width:420px}
        .plan2-cta{display:inline-flex;align-items:center;justify-content:center;padding:12px 28px;border-radius:10px;background:linear-gradient(135deg,var(--teal),var(--teal-dk));border:none;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;width:fit-content;transition:all .22s;box-shadow:0 0 20px rgba(20,184,166,.3)}
        .plan2-cta:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(20,184,166,.45)}
        .plan2-list{list-style:none;display:flex;flex-direction:column;gap:16px}
        .plan2-item{display:flex;align-items:center;gap:14px;font-size:15px;color:rgba(241,245,249,.82);line-height:1.4}
        .plan2-check{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--teal),var(--teal-dk));display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 10px rgba(20,184,166,.35)}
        @media(max-width:768px){.plans2{grid-template-columns:1fr}}
        /* about */
        .about{position:relative;z-index:1;padding:100px 52px}
        .about-inner{max-width:860px;margin:0 auto;text-align:center;display:flex;flex-direction:column;align-items:center;gap:28px}
        .about-h2{font-family:'Montserrat',sans-serif;font-size:clamp(40px,5.5vw,72px);font-weight:900;letter-spacing:-2.5px;color:#fff;line-height:1.02}
        .about-p{font-size:17px;line-height:1.8;color:var(--muted);max-width:680px}
        .stats-row{display:flex;align-items:center;justify-content:center;width:100%;max-width:700px;margin:16px 0 8px}
        .stat-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px 24px}
        .stat-num{font-family:'Montserrat',sans-serif;font-size:clamp(42px,5vw,64px);font-weight:900;color:var(--teal);letter-spacing:-1px;line-height:1}
        .stat-lbl{font-size:14px;color:var(--muted);text-align:center;line-height:1.4}
        .stat-divider{width:1px;height:80px;background:rgba(20,184,166,.25);flex-shrink:0}
        .about-cta{padding:16px 48px;border-radius:999px;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-dk));color:#fff;font-size:16px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .25s;box-shadow:0 0 28px rgba(20,184,166,.35);margin-top:8px}
        .about-cta:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(20,184,166,.5)}
        @media(max-width:768px){.about{padding:72px 24px}.stats-row{flex-direction:column}.stat-divider{width:80px;height:1px}.stat-item{padding:12px 0}}

        .app-cta{max-width:1240px;margin:0 auto;padding:0 52px 100px;position:relative;z-index:1}
        .app-inner{border-radius:28px;padding:72px 64px;background:linear-gradient(135deg,#0f1f1d,#0d1714);border:1px solid rgba(20,184,166,.2);box-shadow:0 0 80px rgba(20,184,166,.06);display:flex;align-items:center;justify-content:space-between;gap:48px;position:relative;overflow:hidden}
        .app-inner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 10% 50%,rgba(20,184,166,.08) 0%,transparent 60%);pointer-events:none}
        .app-left{max-width:520px}
        .app-left h2{font-family:'Montserrat',sans-serif;font-size:clamp(28px,3vw,44px);font-weight:900;letter-spacing:-1.5px;color:#fff;margin-bottom:16px}
        .app-left p{font-size:16px;color:var(--muted);line-height:1.7}
        .app-btns{display:flex;gap:14px;margin-top:32px;flex-wrap:wrap}
        .s-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 24px;border-radius:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:var(--text);font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:all .22s;font-family:'DM Sans',sans-serif}
        .s-btn:hover{background:rgba(255,255,255,.11);border-color:rgba(20,184,166,.35);transform:translateY(-2px)}
        .qr{display:flex;flex-direction:column;align-items:center;gap:12px;flex-shrink:0}
        .qr-box{width:112px;height:112px;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:68px;line-height:1;box-shadow:0 8px 32px rgba(0,0,0,.4)}
        .qr-lbl{font-size:12px;color:var(--muted);text-align:center}

       /* footer */
        footer{border-top:1px solid var(--border);max-width:1240px;margin:0 auto;padding:56px 52px 48px;display:flex;justify-content:space-between;align-items:flex-start;gap:48px;position:relative;z-index:1}
        .ft-left{display:flex;flex-direction:column;gap:20px}
        .ft-tagline{font-size:14px;color:var(--muted);margin-top:2px}
        .ft-contacts{display:flex;flex-direction:column;gap:14px}
        .ft-contact{display:flex;align-items:center;gap:12px;color:var(--muted);text-decoration:none;font-size:15px;transition:color .2s}
        .ft-contact:hover{color:var(--teal)}
        .ft-contact-icon{width:32px;height:32px;border-radius:8px;background:rgba(20,184,166,.12);border:1px solid rgba(20,184,166,.2);display:flex;align-items:center;justify-content:center;color:var(--teal);flex-shrink:0}
        .ft-nav{display:flex;gap:32px;flex-wrap:wrap;margin-top:4px}
        .ft-nav a{color:var(--muted);text-decoration:none;font-size:15px;font-weight:500;transition:color .2s}
        .ft-nav a:hover{color:var(--text)}
        .ft-right{display:flex;flex-direction:column;gap:16px;align-items:flex-start;flex-shrink:0}
        .ft-app-label{font-size:15px;font-weight:600;color:var(--text)}
        .ft-store-btns{display:flex;flex-direction:column;gap:10px}
        .ft-store{display:inline-flex;align-items:center;gap:10px;padding:12px 28px;border-radius:10px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:var(--text);font-size:14px;font-weight:600;text-decoration:none;transition:all .22s;font-family:'DM Sans',sans-serif;min-width:180px}
        .ft-store:hover{background:rgba(255,255,255,.11);border-color:rgba(20,184,166,.35);transform:translateY(-1px)}
        .ft-bot{max-width:1240px;margin:0 auto;padding:20px 52px 40px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border);position:relative;z-index:1}
        .ft-bot p{font-size:13px;color:var(--muted)}
        .socials{display:flex;gap:10px}
        .soc{width:36px;height:36px;border-radius:9px;background:rgba(255,255,255,.06);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none;transition:all .2s;color:var(--muted)}
        .soc:hover{background:var(--teal-dim);border-color:rgba(20,184,166,.3);color:var(--teal)}
        @media(max-width:768px){footer{flex-direction:column;padding:40px 24px 32px}.ft-bot{padding:20px 24px 32px;flex-direction:column;gap:14px}.ft-nav{gap:20px}}

        /* animations */
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .float{animation:float 4s ease-in-out infinite}
        .float2{animation:float 4.5s ease-in-out 1s infinite}
        .float3{animation:float 5s ease-in-out 2s infinite}
        .float4{animation:float 4.2s ease-in-out 0.5s infinite}
        .reveal{opacity:0;transform:translateY(32px);transition:opacity .65s ease,transform .65s ease}
        .reveal.vis{opacity:1;transform:translateY(0)}

        /* responsive */
        @media(max-width:1024px){
          .hero{grid-template-columns:1fr;padding:110px 32px 60px}
          .hero-right{max-width:560px}
          .plans{grid-template-columns:1fr;max-width:400px;margin:0 auto}
          footer{grid-template-columns:1fr 1fr}
          .app-inner{flex-direction:column;padding:48px 40px}
          .qr{flex-direction:row}
        }
        @media(max-width:768px){
          .nav{padding:0 24px}
          .nav-links,.nav-right{display:none}
          .hamburger{display:flex}
          .hero{padding:100px 24px 48px;gap:40px}
          .partners{padding:0 24px 60px}
          .value{padding:72px 24px 48px}
          .feats{padding:24px 24px 60px}
          .feat-row{grid-template-columns:1fr;gap:36px;padding:52px 0}
          .feat-row.rev .f-vis,.feat-row.rev .f-body{order:unset}
          .pricing{padding:60px 24px 80px}
          .app-cta{padding:0 24px 80px}
          .app-inner{padding:40px 28px}
          footer{grid-template-columns:1fr;padding:40px 24px 0}
          .ft-bot{padding:20px 24px 32px;flex-direction:column;gap:14px}
        }
      `}</style>

      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="logo">
          <div className="logo-mark">🏠</div>
          <span className="logo-name">h<b>o</b>me</span>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => <li key={l}><a href="#">{l}</a></li>)}
        </ul>
        <div className="nav-right">
          <button className="btn-ghost">GAME</button>
          <button className="btn-teal">Хамтрах</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen((o) => !o)}>
          <span style={menuOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
        </button>
      </nav>

      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map((l) => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
        <button className="btn-teal" style={{ marginTop: 8 }}>Хамтрах</button>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          
          <h1 className="hero-h1">Таны Дижитал<br />хөрш</h1>
          <p className="hero-p">
            Hoome нь хотхонд суурилсан Сошиал Платформ юм. Гэр болон түүнтэй
            холбоотой бүх харилцааг нэгтгэн бүтээсэн Монгол сошиал сүлжээнд
            тавтай морил.
          </p>
          <div className="hero-btns">
            <a href="#" className="dl-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              iOS утсанд татах
            </a>
            <a href="#" className="dl-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76C3.45 24 3.82 24.04 4.22 23.82L14.44 17.94L11.26 14.74L3.18 23.76ZM.23 1.21C.08 1.48 0 1.82 0 2.23V21.77C0 22.18.08 22.52.23 22.8L.3 22.87L11.07 12V11.77L.3 1.14.23 1.21ZM20.15 9.73L17.37 8.17L13.85 11.77L17.37 15.37L20.18 13.77C21.02 13.29 21.02 10.21 20.15 9.73ZM4.22.18C3.82-.04 3.45 0 3.18.24L11.26 9.26 14.44 6.06 4.22.18Z"/>
              </svg>
              Android утсанд татах
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="vid-card">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Hoome intro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <div className={`partners reveal${vis("p") ? " vis" : ""}`} ref={reg("p")} data-sid="p">
        <p className="p-label">Нэгдсэн Хотхонууд</p>
        <div className="p-row">
          {PARTNERS.map((p, i) => (
            <div key={i} className="p-tile" style={{ background: p.bg, transitionDelay: `${i * 0.07}s` }}>
              <span className="p-icon">{p.icon}</span>
              <span className="p-name" style={{ color: p.accent }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hr" />

      {/* VALUE */}
      <section className={`value reveal${vis("v") ? " vis" : ""}`} ref={reg("v")} data-sid="v">
        <span className="badge">Үнэ цэнэ</span>
        <h2 className="value-h2">Халуун дулаан, харилцан<br />итгэлцсэн, хялбар шийдэл</h2>
        <p className="value-p">
          <span className="hl">Халуун дулаан</span>аар айл бүрийг холбох сошиал платформ.{" "}
          <span className="hl">Харилцан итгэлцсэн</span> ил тод, хотхоны мэдээлэл, тайлан,
          шилэн СӨХ, <span className="hl">Хялбар</span> энгийн онлайн төлбөр, мобайл паркинг.
        </p>
      </section>

      {/* FEATURES */}
      <section className="feats">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className={`feat-row${f.reverse ? " rev" : ""} reveal${vis(`f${i}`) ? " vis" : ""}`}
            ref={reg(`f${i}`)} data-sid={`f${i}`}
          >
            <div className={`f-vis float${i + 1}`}>
              <IsoIcon {...f} />
            </div>
            <div className="f-body">
              <h3 className="f-h3">{f.title}</h3>
              <p className="f-p">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="hr" />

      {/* PRICING */}
      <section className={`pricing reveal${vis("pr") ? " vis" : ""}`} ref={reg("pr")} data-sid="pr">
        <div className="sec-head">
          <span className="badge">Үнэ цэнэ</span>
          <h2>Хотхоны болон Конторын үйлчилгээ эрхлэгч танд</h2>
          <p>Хотхоны оршин суугчидтайгаа холбогдох, үйл ажиллагаагаа эрхлэх, төлбөрийн нэхэмжлэх үүсгэх, бүртгэлжүүлэх - Hoome сошиал сүлжээ чаттай шийдлийг санал болгож байна.</p>
        </div>
        <div className="plans2">
          {PLANS2.map((pl, i) => (
            <div key={i} className="plan2">
              <div className="plan2-top">
                <h3 className="plan2-name">{pl.name}</h3>
                <p className="plan2-desc">{pl.desc}</p>
                <button className="plan2-cta">Бидэнтэй холбогдох</button>
              </div>
              <ul className="plan2-list">
                {pl.features.map((ft, j) => (
                  <li key={j} className="plan2-item">
                    <span className="plan2-check">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {ft}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      

      {/* ABOUT */}
      <section className={`about reveal${vis("ab") ? " vis" : ""}`} ref={reg("ab")} data-sid="ab">
        <div className="about-inner">
          <span className="badge">Бидний тухай</span>
          <h2 className="about-h2">Hoome-г хөгжүүлэгч</h2>
          <p className="about-p">
            Nomadic Software-чууд бид програм хангамж, платформ хөгжүүлэлт болон
            дата менежментийн олон төслүүдээрээ харилцагч, үйлчлүүлэгчдийнхээ үнэ
            цэнийг нэмэгдүүлж, дижитал соёлыг бүтээн байгуулахад нь тусалдаг.
          </p>

          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">60+</span>
              <span className="stat-lbl">Амжилттай төслүүд</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">100+</span>
              <span className="stat-lbl">Харилцагч байгуулагууд</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">4+</span>
              <span className="stat-lbl">Өөрсдийн бүтээгдэхүүн</span>
            </div>
          </div>

          <button className="about-cta">Бидэнтэй хамтрах</button>
        </div>
      </section>
      


      

      {/* FOOTER */}
    <footer>
        <div className="ft-left">
          <a href="#" className="logo">
            <div className="logo-mark">🏠</div>
            <span className="logo-name">h<b>o</b>me</span>
          </a>
          <p className="ft-tagline">Таны Дижитал хөрш</p>

          <div className="ft-contacts">
            <a href="mailto:info@nomadicss.mn" className="ft-contact">
              <span className="ft-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              info@nomadicss.mn
            </a>
            <a href="tel:80162424" className="ft-contact">
              <span className="ft-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              8016-2424
            </a>
            <a href="#" className="ft-contact">
              <span className="ft-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              УБ, Хан-Уул, Хаан цамхаг, 22 давхар
            </a>
          </div>

          <nav className="ft-nav">
            {["Танилцуулга", "Үнэ цэнэ", "Бизнес", "Бидний тухай"].map((l) => (
              <a key={l} href="#">{l}</a>
            ))}
          </nav>
        </div>

        <div className="ft-right">
          <p className="ft-app-label">Апп татах</p>
          <div className="ft-store-btns">
            <a href="#" className="ft-store">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              App Store
            </a>
            <a href="#" className="ft-store">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76C3.45 24 3.82 24.04 4.22 23.82L14.44 17.94L11.26 14.74L3.18 23.76ZM.23 1.21C.08 1.48 0 1.82 0 2.23V21.77C0 22.18.08 22.52.23 22.8L.3 22.87L11.07 12V11.77L.3 1.14.23 1.21ZM20.15 9.73L17.37 8.17L13.85 11.77L17.37 15.37L20.18 13.77C21.02 13.29 21.02 10.21 20.15 9.73ZM4.22.18C3.82-.04 3.45 0 3.18.24L11.26 9.26 14.44 6.06 4.22.18Z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </footer>

      
      <div className="ft-bot">
        <p>© 2024 Hoome Platform. Бүх эрх хуулиар хамгаалагдсан.</p>
        <div className="socials">
          {[["𝕏","#"],["f","#"],["in","#"],["▶","#"]].map(([s, h], i) => (
            <a key={i} href={h} className="soc">{s}</a>
          ))}
        </div>
      </div>
    </>
  );
}
